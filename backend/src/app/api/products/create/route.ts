import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import Products from "@/models/Products";
import { generateSlug } from "@/lib/utils"; 
import { revalidatePath } from "next/cache";
import { utapi } from "@/utils/uploadthing";
import Categories from "@/models/Categories";


const errorResponse = (
  message: string,
  status: number = 500,
  request: NextRequest 
) => {
  console.error(message);
  revalidatePath(request.url);
  return NextResponse.json({ success: false, error: message }, { status });
};

const generateSequentialSku = async (): Promise<string> => {
  let attempts = 0;
  const maxAttempts = 10;

  await connectToMongoDB(); 

  let productCount = await Products.countDocuments();
  let baseSkuNumber = (productCount + 1).toString().padStart(8, "0");

  while (attempts < maxAttempts) {
    const existingProduct = await Products.findOne({ sku: baseSkuNumber });
    if (!existingProduct) {
      return baseSkuNumber; 
    }

    baseSkuNumber = (parseInt(baseSkuNumber, 10) + 1)
      .toString()
      .padStart(8, "0");
    attempts++;
  }

  throw new Error("Failed to generate unique SKU after multiple attempts.");
};

const calculateSalePrice = (price: number, discount: number): number => {
  if (typeof discount !== 'number' || discount <= 0 || discount > 100) return price;
  return parseFloat((price - (price * discount) / 100).toFixed(2));
};

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    // console.log("formData", formData);
    
    const title = formData.get('title')?.toString() || '';
    const description = formData.get('description')?.toString() || '';
    const category = formData.get('category')?.toString() || '';
    const brand = formData.get('brand')?.toString() || '';

    const price = parseFloat(formData.get('price')?.toString() || '0');
    const discount = parseInt(formData.get('discount')?.toString() || '0', 10);

    // const isNew = formData.get('isNew') === 'true';

    const tags = formData.get('tags')?.toString().split(',').map(s => s.trim()).filter(s => s !== '') || [];
    const colors = formData.get('colors')?.toString().split(',').map(s => s.trim()).filter(s => s !== '') || [];
    const sizes = formData.get('sizes')?.toString().split(',').map(s => s.trim()).filter(s => s !== '') || [];

    // const bestBefore = formData.get('bestBefore')?.toString() || '';

    const imageFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === 'images' && value instanceof Blob) {
        const filename = (value as File).name || `uploaded_image_${Date.now()}.${value.type.split('/')[1] || 'png'}`;
        imageFiles.push(new File([value], filename, { type: value.type }));
      }
    }

    if (
      !title ||
      !description ||
      !category ||
      !brand ||
      isNaN(price) || price <= 0 || 
      // !bestBefore || 
      tags.length === 0 
    ) {
      return errorResponse("Missing or invalid required fields (title, description, category, brand, price, bestBefore, tags)", 400, request);
    }

    if (imageFiles.length === 0) {
      return errorResponse("No images provided. Images are required.", 400, request);
    }

    await connectToMongoDB(); 
    const cat = await Categories.find({title: category});
    if (!cat) {
      return errorResponse("Invalid category ID provided.", 400, request);
    }

    let uploadedImageUrls: string[] = [];
    try {
      const uploadResult = await utapi.uploadFiles(imageFiles); 
      uploadedImageUrls = uploadResult
        .map(file => file.data?.url)
        .filter((url): url is string => !!url); 

      if (uploadedImageUrls.length === 0) {
        return errorResponse("Failed to upload images to Uploadthing.", 500, request);
      }
    } catch (uploadError: any) {
      console.error("Error during Uploadthing upload:", uploadError);
      return errorResponse(`Image upload failed: ${uploadError.message || "Unknown upload error."}`, 500, request);
    }

    const sku = await generateSequentialSku();
    const slug = generateSlug(title); 
    const calculatedSalePrice = calculateSalePrice(price, discount);

    const newProduct = new Products({
      sku,
      slug,
      title,
      description,
      tags,
      colors,
      sizes,
      images: uploadedImageUrls,
      category: category,
      brand,
      price,
      salePrice: calculatedSalePrice,
      discount,
      // bestBefore: new Date(bestBefore),
      // new: isNew, 
    });

    const savedProduct = await newProduct.save();

    revalidatePath(request.url); 

    return NextResponse.json(
      {
        success: true,
        message: `${savedProduct.title} product created successfully!`,
        product: savedProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product in API route:", error);

    if (error.name === "ValidationError") {
      return errorResponse(`Validation error: ${error.message}`, 400, request);
    }

    if (error.code === 11000) {
      return errorResponse(
        "A product with this SKU or slug already exists (duplicate key error).",
        409,
        request
      );
    }

   
    if (error.message === "Failed to generate unique SKU after multiple attempts.") {
        return errorResponse(error.message, 500, request);
    }

    return errorResponse("An unexpected error occurred during product creation.", 500, request);
  }
};