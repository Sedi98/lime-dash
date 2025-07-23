import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const allowedColumns = [
  "order_stock_count",
  "order_stock_sprice",
  "order_stock_total_price",
  "order_total_profit",
];

// Helper functions for date manipulation
function getPreviousDate(currentDate: string): string | null {
  const [day, month, year] = currentDate.split('.').map(Number);
  
  // Create a Date object (months are 0-indexed in JavaScript)
  const dateObj = new Date(year, month - 1, day);
  
  // Subtract one day
  dateObj.setDate(dateObj.getDate() - 1);
  
  // Format back to dd.mm.yyyy
  const prevDay = dateObj.getDate().toString().padStart(2, '0');
  const prevMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const prevYear = dateObj.getFullYear();
  
  return `${prevDay}.${prevMonth}.${prevYear}`;
}

function getPreviousMonth(currentMonth: string): string | null {
  const [monthStr, yearStr] = currentMonth.split('.');
  let month = parseInt(monthStr);
  let year = parseInt(yearStr);
  
  // Handle January case (roll back to December of previous year)
  if (month === 1) {
    return `12.${year - 1}`;
  }
  
  // For other months, just subtract 1
  return `${(month - 1).toString().padStart(2, '0')}.${year}`;
}

async function getAggregateData(
  supabase: any,
  date: string | null,
  month: string | null
) {
  // Build base query
  let query = supabase
    .from("stock_order_report")
    .select(allowedColumns.join(","))
    .neq("order_stock_count", "0");

  // Apply filters
  if (date) {
    query = query.eq("order_date", date);
  } else if (month) {
    query = query.eq("order_my_date", month);
  }

  // Execute query
  const { data: stats, error } = await query;
  if (error) throw error;
  
  // Calculate aggregates
  return stats.reduce(
    (acc: any, item: any) => ({
      order_total_count: acc.order_total_count + (item.order_stock_count || 0),
      order_total_sprice: acc.order_total_sprice + (item.order_stock_sprice || 0),
      order_stats_total_price: acc.order_stats_total_price + (item.order_stock_total_price || 0),
      order_stats_total_profit: acc.order_stats_total_profit + (item.order_total_profit || 0),
    }),
    { order_total_count: 0, order_total_sprice: 0, order_stats_total_price: 0, order_stats_total_profit: 0 }
  );
}

function formatAggregates(aggregates: any) {
  return {
    order_total_count: aggregates.order_total_count,
    order_total_sprice: parseFloat(aggregates.order_total_sprice.toFixed(2)),
    order_stats_total_price: parseFloat(aggregates.order_stats_total_price.toFixed(2)),
    order_stats_total_profit: parseFloat(aggregates.order_stats_total_profit.toFixed(2)),
  };
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = url.searchParams;

  const date = searchParams.get("date");
  const month = searchParams.get("month");
  const supabase = await createClient();

  try {
    // Get current period data
    const currentAggregates = await getAggregateData(supabase, date, month);
    const response: any = {
      current: formatAggregates(currentAggregates)
    };

    // Get previous period data if applicable
    if (date) {
      const prevDate = getPreviousDate(date);
      if (prevDate) {
        const prevAggregates = await getAggregateData(supabase, prevDate, null);
        response.previous = formatAggregates(prevAggregates);
      }
    } 
    else if (month) {
      const prevMonth = getPreviousMonth(month);
      if (prevMonth) {
        const prevAggregates = await getAggregateData(supabase, null, prevMonth);
        response.previous = formatAggregates(prevAggregates);
      }
    }

    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Database error" },
      { status: 400 }
    );
  }
}