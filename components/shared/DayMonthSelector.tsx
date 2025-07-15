import React from "react";
import { useDateFilter } from "@/contexts/DateFilterContext";
import Select from "./Select";

const DayMonthSelector = () => {
  const {
    dateType,
    selectedDate,
    selectedMonthDate,
    availableDates,
    availableMonthDates,
    setSelectedDate,
    setSelectedMonthDate,
  } = useDateFilter();
  return (
    <div>
      {(dateType === "d" && (
        <Select
          options={
            availableDates?.map((date: string) => ({
              value: date,
              label: date,
            })) || []
          }
          placeholder="Tarix seç"
          value={selectedDate ? selectedDate : ""}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      )) ||
        (dateType === "m" && (
          <Select
            options={
              availableMonthDates?.map((date: string) => ({
                value: date,
                label: date,
              })) || []
            }
            value={selectedMonthDate ? selectedMonthDate : ""}
            onChange={(e) => setSelectedMonthDate(e.target.value)}
            placeholder="Tarix seç"
          />
        ))}
    </div>
  );
};

export default DayMonthSelector;
