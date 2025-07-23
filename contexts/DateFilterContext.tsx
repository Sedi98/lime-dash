"use client";

import React, { useContext, createContext, useState, useEffect } from "react";
import { getMonthDate, getFullDate } from "@/utils/helpers/DateFunctions";

type DateFilterContextType = {
  dateType: string;
  setDateType: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedMonthDate: string;
  setSelectedMonthDate: React.Dispatch<React.SetStateAction<string>>;
  availableDates: string[];
  setAvailableDates: React.Dispatch<React.SetStateAction<string[]>>;
  availableMonthDates: string[];
  setAvailableMonthDates: React.Dispatch<React.SetStateAction<string[]>>;
};

const DateFilterContext = createContext<DateFilterContextType>({
  dateType: "",
  setDateType: () => {},
  selectedDate: "",
  setSelectedDate: () => {},
  selectedMonthDate: "",
  setSelectedMonthDate: () => {},
  availableDates: [],
  setAvailableDates: () => {},
  availableMonthDates: [],
  setAvailableMonthDates: () => {},
});

export const DateFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dateType, setDateType] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMonthDate, setSelectedMonthDate] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableMonthDates, setAvailableMonthDates] = useState<string[]>([]);

  

  

  useEffect(() => {
    handleDateChange(dateType);
  }, [dateType]);


  const handleDateChange = async (dateType: string) => {
    if (dateType === "d") {
      setSelectedDate(await getFullDate());
    } else if (dateType === "m") {
      setSelectedMonthDate(await getMonthDate());
    }
    console.log(selectedDate, selectedMonthDate);
    
  };

  const values = {
    dateType,
    setDateType,
    selectedDate,
    setSelectedDate,
    selectedMonthDate,
    setSelectedMonthDate,
    availableDates,
    setAvailableDates,
    availableMonthDates,
    setAvailableMonthDates,
  };

  return (
    <DateFilterContext.Provider value={values}>
      {children}
    </DateFilterContext.Provider>
  );
};

export const useDateFilter = () => useContext(DateFilterContext);
