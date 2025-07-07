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

const Products = () => {
   const { setIsLoading } = useSpinner();
  const { query } = useSearch();
  const { activePage, setTotalPage, skip, limit } = usePagination();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/expenses?limit=${limit}&skip=${skip}${query ? `&q=${query}` : ""}`);
      const data = await response.json();

      if (data && data.expenses) {
        setExpenses(data.expenses);
      }

      if (data && data.total) {
        setTotalPage(Math.ceil(data.total / limit));
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    fetchExpenses();
  }, [activePage, limit, query]);
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <PageHeader
        title="Xərclər"
        pathNames={{ dash: "Dash", expenses: "Xərclər" }}
        homeName={""}
      />

      <div className="cnt bg-base-100 rounded shadow max-w-7xl ">
        <PageTop />
        <Table
          headers={["ID", "Tarix", "Açıqlama", "Amount"]}
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
                <div
                  className="text-sm truncate max-w-[100px]"
                  title={
                    expense?.rasxod_money !== undefined
                      ? expense.rasxod_money.toString()
                      : undefined
                  }
                >
                  {(expense?.rasxod_money).toString()}
                </div>

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
