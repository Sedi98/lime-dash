import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabaseClient = await createClient();
  const { data: categories, error: categoriesError } = await supabaseClient
    .from("stock_category")
    .select("*").eq("visible", 'visible');

  if (categoriesError) {
    return NextResponse.json(
      { error: categoriesError.message },
      { status: 400 }
    );
  }

  if (!categories) {
    return NextResponse.json({ categories: [], message: "Categories not found",total: 0 }, { status: 404 });
  }

  return NextResponse.json({ categories, message: "Success", total: categories.length }, { status: 200 });
}
