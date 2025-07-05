import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { ExpensesResponse, Expense } from "@/types/Expenses";



// Define allowed columns for validation
const allowedColumns = [
  'sp_id', 'rasxod_id', 'rasxod_day_date', 'rasxod_money',
  'rasxod_description', 'rasxod_year_date', 'rasxod_visible'
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
  const sortBy = searchParams.get("sortBy") || "rasxod_day_date";
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

    // Build base query for expenses
    let expensesQuery = supabase
      .from("rasxod")
      .select(selectColumns, { count: "exact" });

    // Apply search filter
    if (query) {
      expensesQuery = expensesQuery.ilike("rasxod_description", `%${query}%`);
    }

    // Apply date filter
    if (date) {
      expensesQuery = expensesQuery.eq("rasxod_day_date", date);
    }

    // Apply month filter
    if (month) {
      expensesQuery = expensesQuery.eq("rasxod_year_date", month);
    }

    // Apply sorting
    if (sortBy && allowedColumns.includes(sortBy)) {
      expensesQuery = expensesQuery.order(sortBy, { 
        ascending: order.toLowerCase() === "asc" 
      });
    }

    // Apply pagination (only if limit > 0)
    if (limit > 0) {
      expensesQuery = expensesQuery.range(skip, skip + limit - 1);
    }

    // Execute expenses query
    const { data: expenses, error: expensesError, count } = await expensesQuery;
    if (expensesError) throw expensesError;
    if (!expenses) throw new Error("No expenses data found");

    // Get unique dates and months for filters
    const datesPromise = supabase
      .from("rasxod")
      .select("rasxod_day_date")
      .neq("rasxod_day_date", null)
      .order("rasxod_day_date", { ascending: true });

    const monthsPromise = supabase
      .from("rasxod")
      .select("rasxod_year_date")
      .neq("rasxod_year_date", null)
      .order("rasxod_year_date", { ascending: true });

    // Execute both metadata queries in parallel
    const [datesResult, monthsResult] = await Promise.all([
      datesPromise,
      monthsPromise
    ]);

    if (datesResult.error) console.error("Dates error:", datesResult.error);
    if (monthsResult.error) console.error("Months error:", monthsResult.error);

    // Extract unique dates and months
    const uniqueDates = Array.from(
      new Set(
        (datesResult.data || [])
          .map(item => item.rasxod_day_date)
          .filter(Boolean)
      )
    );

    const uniqueMonths = Array.from(
      new Set(
        (monthsResult.data || [])
          .map(item => item.rasxod_year_date)
          .filter(Boolean)
      )
    );

    // Create and return typed response
    const response: ExpensesResponse = {
      expenses: expenses as unknown as Expense[],
      total: count || 0,
      skip,
      limit: limit > 0 ? limit : count || 0,
      available_dates: uniqueDates,
      available_months: uniqueMonths
    };

    return NextResponse.json(response, { status: 200 });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Database error" },
      { status: 400 }
    );
  }
}