import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

// Helper function to fetch all pages of data
async function fetchAllData(
  supabase: SupabaseClient,
  column: "order_date" | "order_my_date"
): Promise<string[]> {
  const PAGE_SIZE = 1000;
  let page = 0;
  let allData: string[] = [];
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from("stock_order_report")
      .select(column)
      .not(column, "is", null)
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (error) throw error;

    if (data && data.length > 0) {
      // Type-safe extraction of column values
      const values = data.flatMap(item => {
        const value = column === "order_date" 
        // @ts-ignore
          ? item.order_date 
        //   @ts-ignore
          : item.order_my_date;
        return value ? [value] : [];
      });
      
      allData = [...allData, ...values];
      page++;
    } else {
      hasMore = false;
    }
  }

  return allData;
}

// Helper function to parse and sort date strings
function sortDateStrings(dates: string[], format: 'date' | 'month'): string[] {
  const uniqueDates = Array.from(new Set(dates));
  
  return uniqueDates.sort((a, b) => {
    if (format === 'date') {
      const [dayA, monthA, yearA] = a.split('.');
      const [dayB, monthB, yearB] = b.split('.');
      const dateStrA = `${yearA.padStart(4, '0')}${monthA.padStart(2, '0')}${dayA.padStart(2, '0')}`;
      const dateStrB = `${yearB.padStart(4, '0')}${monthB.padStart(2, '0')}${dayB.padStart(2, '0')}`;
      return dateStrA.localeCompare(dateStrB);
    } else {
      const [monthA, yearA] = a.split('.');
      const [monthB, yearB] = b.split('.');
      const monthStrA = `${yearA.padStart(4, '0')}${monthA.padStart(2, '0')}`;
      const monthStrB = `${yearB.padStart(4, '0')}${monthB.padStart(2, '0')}`;
      return monthStrA.localeCompare(monthStrB);
    }
  });
}

export async function GET() {
  const supabase = await createClient();

  try {
    // Fetch all dates and months with pagination
    const [allDates, allMonths] = await Promise.all([
      fetchAllData(supabase, "order_date"),
      fetchAllData(supabase, "order_my_date")
    ]);

    // Process and sort data
    const uniqueDates = sortDateStrings(allDates, 'date');
    const uniqueMonths = sortDateStrings(allMonths, 'month');

    // Create response with caching headers
    const response = NextResponse.json({
      available_dates: uniqueDates,
      available_months: uniqueMonths
    }, { status: 200 });

    // Set cache control headers (revalidate every 60 minutes)
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=3600'
    );

    return response;

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Database error" },
      { status: 500 }
    );
  }
}