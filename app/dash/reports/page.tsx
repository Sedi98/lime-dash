"use client";
import PageFooter from "@/components/shared/PageFooter";
import PageHeader from "@/components/shared/PageHeader";
import Table from "@/components/shared/Table";
import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import type { Report } from "@/types/Reports";
import { usePagination } from "@/contexts/PaginationContext";

const Reports = () => {
  const { activePage, setTotalPage, skip } = usePagination();
  const [reports, setProducts] = useState<Report[]>([]);
  const [limit] = useState(20);

  const fetchProducts = async () => {
    const response = await fetch(`/api/reports?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    setProducts(data.reports);
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
        title="Məhsullar"
        pathNames={{ dash: "Dash", reports: "Hesabatlar" }}
        homeName={""}
      />

      <div className="cnt bg-base-100 rounded shadow max-w-7xl ">
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
          className="mt-4"
        >
          {reports.map((report) => (
            <Table.Row key={report?.sp_id} rowData={report}>
              <Table.Cell>{report?.sp_id}</Table.Cell>
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
                  {report?.order_stock_sprice} &#8376;
                </span>{" "}
              </Table.Cell>

              <Table.Cell>
                {" "}
                <span className="text-sm">
                  {report?.order_stock_total_price} &#8380;
                </span>{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <span className="text-sm">
                  {(
                    report?.order_stock_total_price * report?.order_total_profit
                  ).toFixed(2)}{" "}
                </span>{" "}
              </Table.Cell>

              <Table.Cell>
                {" "}
                <span className="text-sm">
                  {(
                    report?.order_stock_total_price * report?.order_total_profit
                  ).toFixed(2)}{" "}
                </span>{" "}
              </Table.Cell>

              <Table.Cell>
                {" "}
                <span className="text-sm">{report?.payment_method} </span>{" "}
              </Table.Cell>

              <Table.Cell>
                {" "}
                <span className="text-sm">{report?.sales_man} </span>{" "}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
        <PageFooter />
      </div>
    </div>
  );
};

export default Reports;
