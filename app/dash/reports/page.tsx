"use client";
import PageFooter from "@/components/shared/PageFooter";
import PageHeader from "@/components/shared/PageHeader";
import Table from "@/components/shared/Table";
import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import type { Report } from "@/types/Reports";
import { usePagination } from "@/contexts/PaginationContext";
import { useSearch } from "@/contexts/SearchContext";
import PageTop from "@/components/shared/PageTop";
import { useSpinner } from "@/contexts/SpinnerContext";
import { useDateFilter } from "@/contexts/DateFilterContext";

const Reports = () => {
  const {
    dateType,
    selectedDate,
    selectedMonthDate,
    setAvailableDates,
    setAvailableMonthDates,
    setDateType,
    setSelectedDate,
    setSelectedMonthDate
  } = useDateFilter();
  const { setIsLoading } = useSpinner();
  const { query } = useSearch();
  const { activePage, setTotalPage, skip, setTotalItem, limit } =
    usePagination();
  const [reports, setReports] = useState<Report[]>([]);


  const fetchDates = async () => {
    try {
      setIsLoading(true);
      const url = new URL("/api/dates", window.location.origin);
      const response = await fetch(url);
     
      
      const { available_dates, available_months } = await response.json();
      console.log(available_dates, available_months);
      
      setAvailableDates(available_dates.reverse());
      setAvailableMonthDates(available_months.reverse());
    } catch (error) {
      console.error("Failed to fetch dates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const url = new URL("/api/reports", window.location.origin);
      url.searchParams.set("limit", limit.toString());
      url.searchParams.set("skip", skip.toString());
      if (query) {
        url.searchParams.set("q", query);
      }
      if (dateType === "d") {
        url.searchParams.set("date", selectedDate);
      }
      if (dateType === "m") {
        url.searchParams.set("month", selectedMonthDate);
      }

      const response = await fetch(url);
      const { reports, total } =
        await response.json();

      setReports(reports);
      // setAvailableDates(available_dates);
      // setAvailableMonthDates(available_months);
      setTotalPage(Math.ceil(total / limit));
      setTotalItem(total);
      console.log(reports);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setDateType("");
      setSelectedDate("");// Reset selected date
      setSelectedMonthDate("");// Reset selected month
      setAvailableDates([]);// Reset available dates
      setAvailableMonthDates([]);// Reset available month dates
      
    };
  }, []);

  useEffect(() => {
    document.body.scrollTop = 0;
    fetchDates();
    fetchReports();


    
  }, [activePage, limit, query, dateType, selectedDate, selectedMonthDate]);
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <PageHeader
        title="Hesabat"
        pathNames={{ dash: "Dash", reports: "Hesabatlar" }}
        homeName={""}
      />

      <div className="cnt bg-base-100 rounded shadow max-w-7xl ">
        <PageTop type="reports" />

        {(reports?.length > 0 && (
          <>
            <Table
              headers={[
                "ID",
                "Tarix",
                "Məhsul",
                "Açıqlama",
                "Kateqoriya",
                "Təchizatçı",
                "Say",
                "Alış qiyməti",
                "Satış qiyməti",
                "Ümumi",
                "Mənfəət",
                "Ödəniş üsulu",
                "Satıcı",
              ]}
              showCheckbox={false}
              showActions={true}
              actionLabel={<LuPencil className="text-base" />}
              onActionClick={(user) => console.log("Viewing user:", user)}
              size="md"
            >
              {reports?.map((report) => (
                <Table.Row key={report?.order_stock_id} rowData={report}>
                  <Table.Cell>{report?.order_stock_id}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    <span className="text-sm">{report?.order_date}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      {/* <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12"></div>
                  </div> */}
                      <div>
                        <div
                          className="font-medium text-sm truncate max-w-xs"
                          title={report?.order_stock_name}
                        >
                          {report?.order_stock_name}
                        </div>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div
                      className="text-sm truncate max-w-[100px]"
                      title={report?.order_stock_imei ?? undefined}
                    >
                      {report?.order_stock_imei}
                    </div>

                    {/* <br />
                <span className="badge badge-ghost badge-sm">{report?.title}</span> */}
                  </Table.Cell>

                  <Table.Cell>
                    {" "}
                    <span className="text-sm">{report?.order_my_date}</span>
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <span className="text-sm">
                      {report?.stock_order_visible}
                    </span>{" "}
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <span className="text-sm">
                      {report?.order_stock_count}
                    </span>{" "}
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <span className="text-sm">
                      {report?.stock_list.stock_first_price} &#8380;
                    </span>{" "}
                  </Table.Cell>

                  <Table.Cell>
                    {" "}
                    <span className="text-sm">
                      {report?.stock_list.stock_second_price} &#8380;
                    </span>{" "}
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <span className="text-sm">
                      {(
                        report?.order_stock_total_price *
                        report?.order_total_profit
                      ).toFixed(2)}{" "} &#8380;
                    </span>{" "}
                  </Table.Cell>

                  <Table.Cell>
                    {" "}
                    <span className="text-sm">
                      {(
                        report?.order_stock_total_price *
                        report?.order_total_profit
                      ).toFixed(2)}{" "} &#8380;
                    </span>{" "}
                  </Table.Cell>

                  <Table.Cell>
                    {" "}
                    <span className="text-sm">
                      {report?.payment_method_list.title}{" "}
                    </span>{" "}
                  </Table.Cell>

                  <Table.Cell>
                    {" "}
                    <span className="text-sm">
                      {report?.user_control.user_name}{" "}
                    </span>{" "}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table>
            <PageFooter />
          </>
        )) || <p className="text-center p-4">Hesabat tapılmadı</p>}
      </div>
    </div>
  );
};

export default Reports;
