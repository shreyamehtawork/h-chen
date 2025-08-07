import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from 'next/cache';
import Categories from "@/models/Categories";

const generateUniqueSlug = async (slug: string) => {
    let uniqueSlug = slug;
    let slugExists = await Categories.findOne({slug: uniqueSlug});
  
    let counter = 1;
    while (slugExists) {
      uniqueSlug = `${slug}-${counter}`;
      slugExists = await Categories.findOne({slug: uniqueSlug});
      counter++;
    }
  
    return uniqueSlug;
  };
  
// POST: Create a new category
export const POST = async (request: NextRequest) => {
  try {
    const { title, image_link } = await request.json();
    // console.log("Received category:", { title,image_link });

    await connectToMongoDB();
    const slugTemp = generateSlug(title);
    
    const slug = await generateUniqueSlug(slugTemp);
    
    const newCategory = new Categories({
      title,
      image_link,
      slug
    });

    await newCategory.save();

    revalidatePath(request.url);
    return NextResponse.json(
      { message: "Category created successfully!", category: newCategory },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
};
