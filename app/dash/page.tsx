"use client";
import DayMonthFilter from "@/components/shared/DayMonthFilter";
import DayMonthSelector from "@/components/shared/DayMonthSelector";
import dynamic from "next/dynamic";
import MainCardContainer from "@/components/Main/MainCardContainer";
import PageHeader from "@/components/shared/PageHeader";
import React, { useEffect, useState } from "react";
import { useSpinner } from "@/contexts/SpinnerContext";
import { useDateFilter } from "@/contexts/DateFilterContext";

const ChartsContainer = dynamic(
  () => import("@/components/Main/Charts/ChartsContainer"),
  { ssr: false }
);

const DashMain = () => {
  const {
    dateType,
    selectedDate,
    selectedMonthDate,
    setAvailableDates,
    setAvailableMonthDates,
    setDateType,
    setSelectedDate,
    setSelectedMonthDate,
  } = useDateFilter();

  const { setIsLoading } = useSpinner();
  const [saleData, setSaleData] = useState<any[]>([]);

  const fetchDates = async () => {
    try {
      setIsLoading(true);
      const url = new URL("/api/dates", window.location.origin);
      const response = await fetch(url);

      const { available_dates, available_months } = await response.json();

      setAvailableDates(available_dates.reverse());
      setAvailableMonthDates(available_months.reverse());
    } catch (error) {
      console.error("Failed to fetch dates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const url = new URL("/api/stats", window.location.origin);
      if (dateType === "d") {
        url.searchParams.set("date", selectedDate);
      }
      if (dateType === "m") {
        url.searchParams.set("month", selectedMonthDate);
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setSaleData(data);

      // setReports(reports);
      // setAvailableDates(available_dates);
      // setAvailableMonthDates(available_months);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setDateType("");
      setSelectedDate(""); // Reset selected date
      setSelectedMonthDate(""); // Reset selected month
      setAvailableDates([]); // Reset available dates
      setAvailableMonthDates([]); // Reset available month dates
    };
  }, []);

  useEffect(() => {
    document.body.scrollTop = 0;
    fetchDates();
    fetchStats();
  }, [dateType, selectedDate, selectedMonthDate]);
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Statistikalar"
        pathNames={{ dash: "Statistikalar" }}
        homeName={"Dashboard"}
      />
      <div className="my-4"></div>
      <div className="flex gap-2 items-center ">
        <DayMonthFilter
          data={[
            { name: "Gündəlik", value: "d" },
            { name: "Aylıq", value: "m" },
          ]}
        />
        <DayMonthSelector />{" "}
      </div>
      <MainCardContainer data={saleData} />
      <ChartsContainer />
    </div>
  );
};

export default DashMain;
