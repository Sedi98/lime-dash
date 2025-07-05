import React from "react";
import Select from "./Select";
import Pagination from "./Pagination";
import { usePagination } from "@/contexts/PaginationContext";

const PageFooter = () => {
  const { limit, skip,totalItem, setLimit } = usePagination();
  return (
    <div className="flex items-center justify-between gap-2 w-full p-6">
      <div className="flex gap-2 items-center w-48">
        <p className="text-sm w-24">Element sayı</p>
        <Select
        className="w-24"
        defaultValue="30"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        size="sm"
          options={[
            {
              value: "10",
              label: "10",
            },
            {
              value: "20",
              label: "20",
            },
            {
              value: "30",
              label: "30",
            },
            {
              value: "50",
              label: "50",
            },
            {
              value: "100",
              label: "100",
            },
          ]}
          placeholder="Seçin"
        />
      </div>

      <p className="text-sm">{totalItem}-dən {skip}-{skip + limit} arası </p>

      <Pagination shape="circle" />
    </div>
  );
};

export default PageFooter;
