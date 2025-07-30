"use client";
import PageFooter from "@/components/shared/PageFooter";
import PageHeader from "@/components/shared/PageHeader";
import Table from "@/components/shared/Table";
import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import type { Expense } from "@/types/Expenses";
import { usePagination } from "@/contexts/PaginationContext";
import { useSearch } from "@/contexts/SearchContext";
import PageTop from "@/components/shared/PageTop";
import { useSpinner } from "@/contexts/SpinnerContext";
import { useDateFilter } from "@/contexts/DateFilterContext";

const Products = () => {
  const { setIsLoading } = useSpinner();
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
  const { query,setQuery } = useSearch();
  const { activePage, setTotalPage, skip, limit,setActivePage } = usePagination();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch("/api/dates/expenses");
      const { available_dates, available_months } = await response.json();
      setAvailableDates(available_dates.reverse());
      setAvailableMonthDates(available_months.reverse());
    } catch (error) {
      console.error("Failed to fetch available dates:", error);
    }
  };

  const fetchExpenses = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
        ...(query && { q: query }),
      });

      if (dateType === "d") {
        params.set("date", selectedDate);
      }
      if (dateType === "m") {
        params.set("month", selectedMonthDate);
      }

      const response = await fetch(`/api/expenses?${params.toString()}`);
      const { expenses, total } = await response.json();

      if (expenses) {
        setExpenses(expenses);
        // setAvailableDates(available_dates);
        // setAvailableMonthDates(available_months);
      }

      if (total !== undefined) {
        setTotalPage(Math.ceil(total / limit));
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setActivePage(1);
    setQuery("");
    return () => {
      setDateType("");
      setSelectedDate(""); // Reset selected date
      setSelectedMonthDate(""); // Reset selected month

      
    };
  }, []);

  useEffect(() => {
    document.body.scrollTop = 0;
    fetchAvailableDates();
    fetchExpenses();
  }, [activePage, limit, query, dateType, selectedDate, selectedMonthDate]);
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <PageHeader
        title="Xərclər"
        pathNames={{ dash: "Dash", expenses: "Xərclər" }}
        homeName={""}
      />

      <div className="cnt bg-base-100 rounded shadow max-w-7xl ">
        <PageTop type="expenses" />
        <Table
          headers={["ID", "Tarix", "Açıqlama", "Miqdar"]}
          showCheckbox={true}
          showActions={true}
          actionLabel={<LuPencil />}
          onActionClick={(user) => console.log("Viewing user:", user)}
          size="md"
        >
          {expenses.map((expense) => (
            <Table.Row key={expense?.rasxod_id} rowData={expense}>
              <Table.Cell className="!max-w-[100px]">
                <span className="text-sm">{expense?.rasxod_id}</span>
              </Table.Cell>
              <Table.Cell className="!max-w-[100px]">
                <span className="text-sm">{expense?.rasxod_day_date}</span>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    {/* <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={
                          "https://img.daisyui.com/images/profile/demo/3@94.webp"
                        }
                        alt={expense?.rasxod_day_date}
                      />
                    </div> */}
                  </div>
                  <div>
                    <div
                      className="font-medium text-sm truncate max-w-xs"
                      title={expense?.rasxod_description}
                    >
                      {expense?.rasxod_description}
                    </div>
                  </div>
                </div>
              </Table.Cell>

              <Table.Cell>
                <span
                  className="text-sm truncate max-w-[100px]"
                  title={
                    expense?.rasxod_money !== undefined
                      ? expense.rasxod_money.toString()
                      : undefined
                  }
                >
                  {(expense?.rasxod_money).toString()}
                </span>{" "}
                <span>&#8380;</span>
                {/* <br />
                <span className="badge badge-ghost badge-sm">{expense?.title}</span> */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
        <PageFooter />
      </div>
    </div>
  );
};

export default Products;
