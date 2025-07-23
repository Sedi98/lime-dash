import { SalesStatsResponse } from "@/types/Stats";
import React, { useState, useEffect } from "react";
import StackedChart from "./StackedChart";
import Badge from "@/components/shared/Badge";
import { LuArrowUp } from "react-icons/lu";

const ProfitStats: React.FC = () => {
  const [data, setData] = useState<SalesStatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch("/api/stats/sales");
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const responseData: SalesStatsResponse = await response.json();
      setData(responseData);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching sales data");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total and percentage change (example values)
  let percentageChange = 0;
  let total = 0;

  if (data && data.months.length > 0) {
    // Get the last month's total
    total = data.totals[data.totals.length - 1] || 0;
    
    // Calculate percentage change only if we have at least 2 months of data
    if (data.totals.length >= 2) {
      const currentMonthTotal = data.totals[data.totals.length - 1];
      const previousMonthTotal = data.totals[data.totals.length - 2];
      
      // Avoid division by zero
      if (previousMonthTotal !== 0) {
        percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
      }
    }
  }

  return (
    <div className="w-full p-4 bg-base-100 shadow rounded">
      <div>
        <div className="flex justify-between items-start bg-base-100">
          <div className="textContent">
            <p className="text-base-content text-md font-medium">Satış</p>
            <div className="mt-3 flex gap-2 items-center">
              <h3 className="text-base-content font-semibold text-2xl">
                {total.toFixed(2)} &#8380;
              </h3>
              <Badge size="sm" color="success" className="bg-success" variant="soft">
                <LuArrowUp />
                <span>{percentageChange.toFixed(0)}%</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-base-content text-lg font-medium py-8">
          Loading data...
        </div>
      ) : error ? (
        <div className="text-center text-error text-lg font-medium py-8">
          {error}
        </div>
      ) : data && data.months.length > 0 ? (
        <StackedChart data={data} />
      ) : (
        <div className="text-center text-base-content text-lg font-medium py-8">
          No sales data available
        </div>
      )}
    </div>
  );
};

export default ProfitStats;