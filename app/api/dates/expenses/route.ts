import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  try {
    // Function to fetch all distinct values for a column with pagination
    const fetchAllValues = async (column: "rasxod_day_date" | "rasxod_year_date") => {
      const PAGE_SIZE = 1000;
      let page = 0;
      let allValues: string[] = [];
      let hasMore = true;

      while (hasMore) {
        const { data, error } = await supabase
          .from("rasxod")
          .select(column)
          .not(column, "is", null)
          .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

        if (error) throw error;

        if (data && data.length > 0) {
          // Type-safe extraction of column values
          // @ts-ignore
          const values = data.map(item => item[column]).filter(Boolean) as string[];
          allValues = [...allValues, ...values];
          page++;
        } else {
          hasMore = false;
        }
      }

      return allValues;
    };

    // Fetch all dates and months with pagination
    const [allDates, allMonths] = await Promise.all([
      fetchAllValues("rasxod_day_date"),
      fetchAllValues("rasxod_year_date")
    ]);

    // Convert to unique arrays and sort properly for VARCHAR dates (DD.MM.YYYY format)
    const uniqueDates = Array.from(new Set(allDates)).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('.');
      const [dayB, monthB, yearB] = b.split('.');
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
      return dateA.getTime() - dateB.getTime();
    });

    const uniqueMonths = Array.from(new Set(allMonths)).sort((a, b) => {
      const [monthA, yearA] = a.split('.');
      const [monthB, yearB] = b.split('.');
      const dateA = new Date(`${yearA}-${monthA}-01`);
      const dateB = new Date(`${yearB}-${monthB}-01`);
      return dateA.getTime() - dateB.getTime();
    });

    return NextResponse.json({
      available_dates: uniqueDates,
      available_months: uniqueMonths
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600'
      }
    });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Database error" },
      { status: 500 }
    );
  }
}