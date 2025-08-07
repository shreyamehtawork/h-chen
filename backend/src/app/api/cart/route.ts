import { connectToMongoDB } from "@/lib/db";
import Cart from "@/models/Cart";
import { Types } from "mongoose";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToMongoDB();
    const userId = req.nextUrl.searchParams.get("user");

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const cart = await Cart.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          products: { $exists: true, $ne: [] }
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products", 
          localField: "products.product",
          foreignField: "_id",
          as: "products.product",
        },
      },
      {
        $unwind: "$products.product",
      },
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

    if (!cart) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 200 });
    }

    return NextResponse.json(cart[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart", details: String(error) },
      { status: 500 }
    );
  }
}
