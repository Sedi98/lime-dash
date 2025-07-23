import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  try {
    // Get all months with their real_time values
    const { data: monthsData, error: monthsError } = await supabase
      .from("stock_order_report")
      .select("order_my_date, order_real_time")
      .neq("order_stock_count", 0)
      .not("order_my_date", "is", null)
      .not("order_real_time", "is", null)
      .order("order_real_time", { ascending: true });

    if (monthsError) throw monthsError;
    if (!monthsData) throw new Error("No months data found");

    // Create a map to track months and their earliest real_time
    const monthMap = new Map<string, string>();
    
    monthsData.forEach(item => {
      if (!item.order_my_date || !item.order_real_time) return;
      
      // If we haven't seen this month or this is an earlier date
      if (!monthMap.has(item.order_my_date)) {
        monthMap.set(item.order_my_date, item.order_real_time);
      }
    })
    

    // Convert map to array and sort by real_time
    const sortedMonths = Array.from(monthMap.entries())
      .sort((a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime())
      .map(entry => entry[0]); // Extract just the month strings

    // Now get totals for each month
    const monthlyTotals: Record<string, number> = {};

    // Create promises for each month's total
    const totalPromises = sortedMonths.map((month) =>
      supabase
        .from("stock_order_report")
        .select("order_stock_total_price")
        .eq("order_my_date", month)
        .neq("order_stock_count", 0)
        .then(({ data, error }) => {
          if (error) throw error;

          const total =
            data?.reduce(
              (sum, item) => sum + (item.order_stock_total_price || 0),
              0
            ) || 0;

          monthlyTotals[month] = parseFloat(total.toFixed(2));
        })
    );

    // Wait for all totals to be calculated
    await Promise.all(totalPromises);

    // Create arrays in the correct order
    const months = sortedMonths;
    const totals = sortedMonths.map((month) => monthlyTotals[month]);

    return NextResponse.json(
      {
        months,
        totals,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch sales statistics" },
      { status: 400 }
    );
  }
}