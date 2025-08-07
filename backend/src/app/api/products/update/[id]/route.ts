import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import Products from "@/models/Products";
import { utapi } from "@/utils/uploadthing";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Categories from "@/models/Categories";

// Helper
const errorResponse = (message: string, status: number = 500, request: NextRequest) => {
  console.error(message);
  revalidatePath(request.url);
  return NextResponse.json({ success: false, error: message }, { status });
};

const calculateSalePrice = (price: number, discount: number): number => {
  if (typeof discount !== "number" || discount <= 0 || discount > 100) return price;
  return parseFloat((price - (price * discount) / 100).toFixed(2));
};

// PATCH method - Update a product
export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const productId = params.id;
    if (!productId) return errorResponse("Product ID is missing", 400, request);

    const formData = await request.formData();

    await connectToMongoDB();

    const existingProduct = await Products.findById(productId);
    if (!existingProduct) return errorResponse("Product not found", 404, request);

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const categoryId = formData.get("categoryId")?.toString();
    const brand = formData.get("brand")?.toString();

    const price = formData.has("price") ? parseFloat(formData.get("price")!.toString()) : undefined;
    const discount = formData.has("discount") ? parseInt(formData.get("discount")!.toString()) : undefined;
    const isNew = formData.get("isNew") === "true";

    const bestBefore = formData.get("bestBefore")?.toString();

    const tags = formData.get("tags")?.toString().split(",").map(s => s.trim()).filter(Boolean);
    const colors = formData.get("colors")?.toString().split(",").map(s => s.trim()).filter(Boolean);
    const sizes = formData.get("sizes")?.toString().split(",").map(s => s.trim()).filter(Boolean);

    // Handle new images if any
    const newImageFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === "images" && value instanceof Blob) {
        const filename = (value as File).name || `uploaded_image_${Date.now()}.${value.type.split("/")[1] || "png"}`;
        newImageFiles.push(new File([value], filename, { type: value.type }));
      }
    }

    // If categoryId is updated, validate it
    if (categoryId) {
      const categoryExists = await Categories.findById(categoryId);
      if (!categoryExists) return errorResponse("Invalid category ID", 400, request);
    }

    let uploadedImageUrls: string[] = [];
    if (newImageFiles.length > 0) {
      try {
        const uploadResult = await utapi.uploadFiles(newImageFiles);
        uploadedImageUrls = uploadResult
          .map(file => file.data?.url)
          .filter((url): url is string => !!url);

        if (uploadedImageUrls.length === 0) {
          return errorResponse("Failed to upload new images.", 500, request);
        }
      } catch (uploadError: any) {
        console.error("Uploadthing error:", uploadError);
        return errorResponse(`Image upload failed: ${uploadError.message}`, 500, request);
      }
    }

    // Build the update object
    const updatedFields: any = {};

    if (title) {
      updatedFields.title = title;
      updatedFields.slug = generateSlug(title);
    }
    if (description) updatedFields.description = description;
    if (brand) updatedFields.brand = brand;
    if (categoryId) updatedFields.category = categoryId;
    if (price !== undefined) updatedFields.price = price;
    if (discount !== undefined) updatedFields.discount = discount;
    if (bestBefore) updatedFields.bestBefore = new Date(bestBefore);
    if (tags) updatedFields.tags = tags;
    if (colors) updatedFields.colors = colors;
    if (sizes) updatedFields.sizes = sizes;
    if (formData.has("isNew")) updatedFields.new = isNew;
    if (uploadedImageUrls.length > 0) updatedFields.images = uploadedImageUrls;

    // Recalculate salePrice if price or discount changed
    if (price !== undefined || discount !== undefined) {
      const effectivePrice = price ?? existingProduct.price;
      const effectiveDiscount = discount ?? existingProduct.discount;
      updatedFields.salePrice = calculateSalePrice(effectivePrice, effectiveDiscount);
    }

    const updatedProduct = await Products.findByIdAndUpdate(productId, updatedFields, {
      new: true,
    });

    revalidatePath(request.url);

    return NextResponse.json({
      success: true,
      message: `${updatedProduct.title} updated successfully.`,
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);

    if (error.name === "ValidationError") {
      return errorResponse(`Validation error: ${error.message}`, 400, request);
    }

    return errorResponse("An unexpected error occurred during product update.", 500, request);
  }
};
