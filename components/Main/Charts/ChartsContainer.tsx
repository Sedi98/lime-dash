'use client';
import React from "react";

import PieChart from "./PieChart";
import ProfitStats from "./ProfitStats";

const ChartsContainer = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ProfitStats />
      
      <div className="w-full p-4 bg-base-100 shadow rounded flex items-center justify-center">
        <PieChart />
      </div>
    </div>
  );
};

export default ChartsContainer;
