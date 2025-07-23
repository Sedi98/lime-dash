import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { ReportsResponse } from "@/types/Reports";

// Define allowed columns for validation
const allowedColumns = [
  "sp_id", "order_stock_id", "stock_id", "order_stock_name", 
  "order_stock_imei", "order_stock_count", "order_stock_sprice", 
  "order_stock_total_price", "order_total_profit", "order_date", 
  "order_who_buy", "order_my_date", "stock_order_visible", 
  "order_seller_name", "payment_method", "sales_man", "transaction_id", 
  "has_editable", "max_refaund_quantity", "user_control(user_name)", "payment_method_list(title), stock_list(stock_first_price, stock_second_price)",
];

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = url.searchParams;

  // Parse query parameters with defaults
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = parseInt(searchParams.get("skip") || "0");
  const query = searchParams.get("q");
  const select = searchParams.get("select");
  const date = searchParams.get("date");
  const month = searchParams.get("month");
  const sortBy = searchParams.get("sortBy")|| "order_stock_id";
  const order = searchParams.get("order") || "desc";

  const supabase = await createClient();

  try {
    // Validate and sanitize select columns
    let selectColumns = allowedColumns.join(",");
    if (select) {
      const requestedColumns = select.split(",");
      const validColumns = requestedColumns.filter(col => 
        allowedColumns.includes(col.trim())
      );
      if (validColumns.length > 0) {
        selectColumns = validColumns.join(",");
      }
    }

    // Build base query for reports
    let reportsQuery = supabase
      .from("stock_order_report")
      .select(selectColumns, { count: "exact" });

    // Apply search filter
    if (query) {
      reportsQuery = reportsQuery.ilike("order_stock_name", `%${query}%`);
    }

    // Apply date filter
    if (date) {
      reportsQuery = reportsQuery.eq("order_date", date);
    }

    // Apply month filter
    if (month) {
      reportsQuery = reportsQuery.eq("order_my_date", month);
    }

    // Apply sorting
    if (sortBy && allowedColumns.includes(sortBy)) {
      reportsQuery = reportsQuery.order(sortBy, { 
        ascending: order.toLowerCase() === "asc" 
      });
    }

    // Apply pagination (only if limit > 0)
    if (limit > 0) {
      reportsQuery = reportsQuery.range(skip, skip + limit - 1);
    }

    // Execute reports query
    const { data: reports, error: reportsError, count } = await reportsQuery;
    if (reportsError) throw reportsError;
    if (!reports) throw new Error("No reports data found");

    

    return NextResponse.json({
      reports: reports as unknown as Report[],
      total: count || 0,
      skip,
      limit: limit > 0 ? limit : count || 0,
    }, { status: 200 });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Database error" },
      { status: 400 }
    );
  }
}