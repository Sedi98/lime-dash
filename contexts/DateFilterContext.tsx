"use client";

import React, { useContext, createContext, useState, useEffect } from "react";

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

  const getFullDate = () => {
    const date = new Date();
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    console.log(`${day}.${month}.${year}`);
    return `${day}.${month}.${year}`;
  };

  const getMonthDate = () => {
    const date = new Date();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    console.log(month, year);

    return `${month}.${year}`;
  };

  useEffect(() => {
    if (dateType === "d" && !selectedDate) {
      setSelectedDate(getFullDate());
    }
    if (dateType === "m" && !selectedMonthDate) {
      setSelectedMonthDate(getMonthDate());
    }
  }, [dateType]);

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
