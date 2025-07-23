import React, { useState, useEffect } from "react";
import { useDateFilter } from "@/contexts/DateFilterContext";
import Select from "./Select";
import { getMonthDate,getFullDate } from "@/utils/helpers/DateFunctions";

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

  const [currentMonthDate, setCurrentMonthDate] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current month date on component mount
  useEffect(() => {
    const fetchMonthDate = async () => {
      setIsLoading(true);
      try {
        const date = await getMonthDate();
        setCurrentMonthDate(date);
      } catch (error) {
        console.error("Error fetching month date:", error);
        setCurrentMonthDate("");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDate = async () => {
      setIsLoading(true);
      try {
        const date = await getFullDate();
        setCurrentDate(date);
      } catch (error) {
        console.error("Error fetching month date:", error);
        setCurrentDate("");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthDate();
    fetchDate();
  }, []);

  // Prepare options for month selector
  const monthOptions = [
    ...(currentMonthDate
      ? [{ value: currentMonthDate, label: currentMonthDate }]
      : []),
    ...(availableMonthDates?.map((date: string) => ({
      value: date,
      label: date,
    })) || []),
  ];

  // Prepare options for day selector
  const dayOptions = [
    ...(currentDate ? [{ value: currentDate, label: currentDate }] : []),
    ...(availableDates?.map((date: string) => ({
      value: date,
      label: date,
    })) || []),
  ];

  if (isLoading) {
    return <div>Tarixlər yüklənilir</div>;
  }

  return (
    <div>
      {dateType === "d" ? (
        <Select
          options={dayOptions}
          placeholder="Tarix seç"
          value={selectedDate || ""}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      ) : dateType === "m" ? (
        <Select
          options={monthOptions}
          value={selectedMonthDate || ""}
          onChange={(e) => setSelectedMonthDate(e.target.value)}
          placeholder="Tarix seç"
        />
      ) : null}
    </div>
  );
};

export default DayMonthSelector;
