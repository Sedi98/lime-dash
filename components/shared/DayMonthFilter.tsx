import React from "react";
import { useDateFilter } from "@/contexts/DateFilterContext";

interface DayMonthFilterProps {
  data: { name: string; value: string }[];
}

const DayMonthFilter: React.FC<DayMonthFilterProps> = ({ data }) => {
  const { dateType, setDateType } = useDateFilter();

  return (
    <div className="join">
      <input
        className="join-item btn"
        type="radio"
        name="options"
        value={""}
        checked={dateType === ""}
        aria-label={"Hamısı"}
        onChange={() => setDateType("")}
      />
      {data.map((item: any, index) => (
        <input
          key={index}
          className="join-item btn"
          type="radio"
          name="options"
          value={item.value}
          checked={dateType === item.value}
          aria-label={item.name}
          onChange={() => setDateType(item.value)}
        />
      ))}
    </div>
  );
};

export default DayMonthFilter;
