import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "@/lib/db";
import Products from "@/models/Products";

export const GET = async (request: NextRequest, { params }:{
    params: {
        id: string;
    }
}) => {
  try {
    await connectToMongoDB();

    const { id } = params;

    const product = await Products.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    revalidatePath(request.url);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
};