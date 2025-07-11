"use client";
import PageFooter from "@/components/shared/PageFooter";
import PageHeader from "@/components/shared/PageHeader";
import Table from "@/components/shared/Table";
import React, { useState, useEffect } from "react";
import { LuPencil } from "react-icons/lu";
import type { Product } from "@/types/product";
import { usePagination } from "@/contexts/PaginationContext";
import { useSearch } from "@/contexts/SearchContext";
import PageTop from "@/components/shared/PageTop";
import { useSpinner } from "@/contexts/SpinnerContext";

const Products = () => {
    const { setIsLoading } = useSpinner();
  const { query } = useSearch();
  const { activePage, setTotalPage, skip, setTotalItem, limit } =
    usePagination();
  const [products, setProducts] = useState<Product[]>([]);
  

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/products?limit=${limit}&skip=${skip}${query ? `&q=${query}` : ""}`
      );
      const data = await response.json();
      setProducts(data.products);
      console.log(data);

      setTotalPage(Math.ceil(data.total / limit));
      setTotalItem(data.total);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    fetchProducts();

   
  }, [activePage, limit, query]);
  return (
    <div className="p-6 space-y-6 overflow-auto h-full w-full max-w-full">
      <PageHeader
        title="Məhsullar"
        pathNames={{ dash: "Dash", products: "Məhsullar" }}
        homeName={""}
      />

      <div className="cnt bg-base-100 rounded shadow max-w-7xl ">
        <PageTop type="Products" />
        <Table
          headers={[
            "ID",
            "Məhsul",
            "Açıqlama",
            "Kateqoriya",
            "Say",
            "Alış qiyməti",
            "Satış qiyməti",
            "Təchizatçı",
          ]}
          showCheckbox={true}
          showActions={true}
          actionLabel={<LuPencil />}
          onActionClick={(user) => console.log("Viewing user:", user)}
          size="md"
        >
          {products.map((product) => (
            <Table.Row key={product?.sp_id} rowData={product}>
              <Table.Cell>{product?.sp_id}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={
                          "https://img.daisyui.com/images/profile/demo/3@94.webp"
                        }
                        alt={product?.stock_name}
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      className="font-medium text-sm truncate max-w-xs"
                      title={product?.stock_name}
                    >
                      {product?.stock_name}
                    </div>
                  </div>
                </div>
              </Table.Cell>

              <Table.Cell>
                <div
                  className="text-sm truncate max-w-[100px]"
                  title={product?.stock_phone_imei ?? undefined}
                >
                  {product?.stock_phone_imei}
                </div>

                {/* <br />
                <span className="badge badge-ghost badge-sm">{product?.title}</span> */}
              </Table.Cell>

              <Table.Cell>
                {" "}
                <span className="text-sm">{product?.product_category}</span>
              </Table.Cell>
              <Table.Cell>
                {" "}
                <span className="text-sm">{product?.stock_count}</span>{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <span className="text-sm">
                  {product?.stock_first_price}
                </span>{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <span className="text-sm">
                  {product?.stock_second_price}
                </span>{" "}
              </Table.Cell>
              <Table.Cell>
                {" "}
                <span className="text-sm">
                  {product?.product_provider}
                </span>{" "}
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
