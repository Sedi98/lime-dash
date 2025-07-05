"use client";
import PageFooter from "@/components/shared/PageFooter";
import PageHeader from "@/components/shared/PageHeader";
import Table from "@/components/shared/Table";
import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import type { Expense } from "@/types/Expenses";
import { usePagination } from "@/contexts/PaginationContext";

const Products = () => {
  const { totalPage, activePage, setActive, setTotalPage, skip, } = usePagination();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [limit, setLimit] = useState(20);
  

  const fetchProducts = async () => {
    const response = await fetch(`/api/expenses?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    setExpenses(data.expenses);
    console.log(data);
    
    setTotalPage(Math.ceil(data.total / limit));
  };



  useEffect(() => {
    document.body.scrollTop = 0;
    fetchProducts();
  }, [activePage]);
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <PageHeader
        title="Xərclər"
        pathNames={{ dash: "Dash", reports: "Xərclər" }}
        homeName={""}
      />

      <div className="cnt bg-base-100 rounded shadow max-w-7xl ">
        <Table
          headers={[
            "ID",
           "Tarix",
            "Açıqlama",
            "Amount",
           
          ]}
          showCheckbox={true}
          showActions={true}
          actionLabel={<LuPencil />}
          onActionClick={(user) => console.log("Viewing user:", user)}
          size="md"
          className="mt-4"
        >
          {expenses.map((expense) => (
            <Table.Row key={expense?.rasxod_id} rowData={expense}>
              <Table.Cell className="!max-w-[100px]">{expense?.rasxod_id}</Table.Cell>
              <Table.Cell className="!max-w-[100px]">{expense?.rasxod_day_date}</Table.Cell>
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
                    <div className="font-medium text-sm truncate max-w-xs" title={expense?.rasxod_description}>
                      {expense?.rasxod_description}
                    </div>
                  </div>
                </div>
              </Table.Cell>

              <Table.Cell>
                <div className="text-sm truncate max-w-[100px]" title={expense?.rasxod_money !== undefined ? expense.rasxod_money.toString() : undefined}>{(expense?.rasxod_money).toString()}</div>

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
