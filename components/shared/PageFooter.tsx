import React from "react";
import Select from "./Select";
import Pagination from "./Pagination";

const PageFooter = () => {
  return (
    <div className="flex items-center justify-between gap-2 w-full p-6">
      <div className="flex gap-2 items-center">
        <p>Sayı</p>
        <Select
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
          ]}
          placeholder="Seçin"
        />
      </div>

      <p className="text-sm">0-20 of 100</p>

      <Pagination shape="circle" />
    </div>
  );
};

export default PageFooter;
