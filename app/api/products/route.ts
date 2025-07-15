import { createClient } from "@/utils/supabase/server";
import type { Product } from "@/types/product";
import { NextResponse, NextRequest } from "next/server";

// Define allowed columns for validation
const allowedColumns = [
  "sp_id",
  "stock_id",
  "stock_name",
  "stock_phone_imei",
  "stock_first_price",
  "stock_second_price",
  "stock_count",
  "stock_visible",
  "stock_get_fdate",
  "stock_get_year",
  "stock_return_status",
  "stock_type",
  "barcode_article",
  "product_added",
  "product_provider",
  "product_category",
  "min_quantity_stock",
  "last_edited_date",
  "sync_status",
  "sync_updated_at",
  "category_data:products_category_list!inner(stock_category(category_name))",
];

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = url.searchParams;

  // Parse query parameters with defaults
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = parseInt(searchParams.get("skip") || "0");
  const query = searchParams.get("q");
  const select = searchParams.get("select");
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order") || "asc";

  const supabase = await createClient();

  try {
    // Validate and sanitize select columns
    let selectColumns = allowedColumns.join(",");
    if (select) {
      const requestedColumns = select.split(",");
      const validColumns = requestedColumns.filter((col) =>
        allowedColumns.includes(col.trim())
      );
      if (validColumns.length > 0) {
        selectColumns = validColumns.join(",");
      }
    }

    // Build base query
    let supabaseQuery = supabase
      .from("stock_list")
      .select(selectColumns, { count: "exact" });

    // Apply search filter
    if (query) {
      supabaseQuery = supabaseQuery.ilike("stock_name", `%${query}%`);
    }

    // Apply sorting
    if (sortBy && allowedColumns.includes(sortBy)) {
      supabaseQuery = supabaseQuery.order(sortBy, {
        ascending: order.toLowerCase() === "asc",
      });
    }

    // Apply pagination (only if limit > 0)
    if (limit > 0) {
      supabaseQuery = supabaseQuery.range(skip, skip + limit - 1);
    }

    // show only visible elements not deleted one
    supabaseQuery.eq("stock_visible", 0);

    // Execute query
    const { data: products, error, count } = await supabaseQuery;

    if (error) throw error;
    if (!products) throw new Error("No data found");

    return NextResponse.json(
      {
        products: products as unknown as Product[],
        total: count || 0,
        skip,
        limit: limit > 0 ? limit : count || 0,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Database error" },
      { status: 400 }
    );
  }
}
