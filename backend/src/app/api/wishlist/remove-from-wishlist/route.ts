import User from "@/models/User";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userId, productId } = body;

    if (!userId || !productId) {
      return NextResponse.json("Invalid request", { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    user.wishlist_products = user.wishlist_products.filter(
      (id: string) => id.toString() !== productId.toString()
    );
    await user.save();

    const userWithWishlist = await User.aggregate([
      {
        $match: { _id: new Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "products", // collection name in lowercase
          localField: "wishlist_products",
          foreignField: "_id",
          as: "wishlist_product_details",
        },
      },
    ]);
    return NextResponse.json({ user: userWithWishlist[0] }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error in adding to wishlist" },
      { status: 500 }
    );
  }
};
