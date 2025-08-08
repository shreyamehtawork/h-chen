import { connectToMongoDB } from "@/lib/db";
import Cart from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    const body = await req.json();
    const { user, product } = body;

    if (!user || !product?.id) {
      return NextResponse.json(
        { error: "Missing user or product information" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ user })

    if (!cart) {
      cart = new Cart({ user, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (p: any) => p.product == product.id
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += product.quantity || 1;
    } else {
      cart.products.push({
        product: product.id,
        quantity: product.quantity || 1,
        color: product.color,
        size: product.size
      });
    }

    await cart.save();
    // const populatedCart = await cart

    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to add to cart",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
