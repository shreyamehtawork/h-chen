import { connectToMongoDB } from "@/lib/db";
import Cart from "@/models/Cart";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: { userId: string; productId: string } }) => {
  const { userId, productId } = params;


  try {
    await connectToMongoDB();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing user or product information" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ user: new Types.ObjectId(userId) });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    cart.products = cart.products.filter(
      (p: any) => p.product.toString() !== productId
    );
    await cart.save();

    const updatedCart = await Cart.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          products: { $exists: true, $ne: [] },
        },
      },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "products.product",
        },
      },
      { $unwind: "$products.product" },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          products: {
            $push: {
              product: "$products.product",
              quantity: "$products.quantity",
            },
          },
        },
      },
    ]);

    return NextResponse.json(updatedCart[0] || {}, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
};
