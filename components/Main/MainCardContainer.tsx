"use client";
import React, { useMemo } from "react";
import MainCardElement from "./MainCardElement";
import { LuCircleDollarSign } from "react-icons/lu";

// Define type for the card data
interface CardData {
  title: string;
  currentValue: number;
  previousValue: number;
  isCount?: boolean;
}

const MainCardContainer = ({ data }: { data: any }) => {
  // Safe calculation function
  const calculatePercentage = (current: number, previous: number): number => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Format money values consistently
  const formatMoney = (value: number): string => 
    value ? value.toFixed(2) : "0.00";
    
  // Format count values
  const formatCount = (value: number): string => 
    value ? Math.round(value).toString() : "0";

  // Memoize card data to prevent unnecessary recalculations
  const cardData = useMemo<CardData[]>(() => [
    {
      title: "Satis  ₼",
      currentValue: data?.current?.order_stats_total_price || 0,
      previousValue: data?.previous?.order_stats_total_price || 0,
    },
    {
      title: "Mənfəət  ₼",
      currentValue: data?.current?.order_stats_total_profit || 0,
      previousValue: data?.previous?.order_stats_total_profit || 0,
    },
    {
      title: "Satılan məhsul ədədi",
      currentValue: data?.current?.order_total_count || 0,
      previousValue: data?.previous?.order_total_count || 0,
      isCount: true,
    }
  ], [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((card, index) => {
        const percentage = calculatePercentage(
          card.currentValue,
          card.previousValue
        );
        
        return (
          <MainCardElement
            key={index}
            title={card.title}
            money={card.isCount 
              ? formatCount(card.currentValue) 
              : formatMoney(card.currentValue)}
            percentage={Math.round(percentage)}
            lastPeriodMoney={card.isCount
              ? formatCount(card.previousValue)
              : formatMoney(card.previousValue)}
            lastPeriodText="Keçən period"
            icon={<LuCircleDollarSign className="text-xl" />}
          />
        );
      })}
      
      {/* Static card - kept separate since it doesn't use API data */}
      <MainCardElement
        title="Xalis Mənfəət  ₼"
        money="350.25"
        percentage={20}
        lastPeriodMoney="280.25"
        lastPeriodText="Keçən period"
        icon={<LuCircleDollarSign className="text-xl" />}
      />
    </div>
  );
};

export default MainCardContainer;