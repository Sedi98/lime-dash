'use client';
import React from "react";
import StackedChart from "./StackedChart";
import Badge from "@/components/shared/Badge";
import { LuArrowUp } from "react-icons/lu";
import PieChart from "./PieChart";

const ChartsContainer = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="w-full p-4 bg-base-100 shadow rounded">
        <div>
          <div className="flex justify-between items-start bg-base-100">
            <div className="textContent">
              <p className="text-base-content text-md font-medium">Satış</p>
              <div className="mt-3 flex gap-2 items-center">
                <h3 className="text-base-content font-semibold text-2xl">
                  550 &#8380;
                </h3>
                <Badge size="sm" color="success" variant="soft">
                  <LuArrowUp />
                  <span>20%</span>
                </Badge>
              </div>
            </div>
            {/* <div className="iconContent p-2 bg-base-300 rounded">{icon}</div> */}
          </div>
        </div>
        <StackedChart />
      </div>
      <div className="w-full p-4 bg-base-100 shadow rounded flex items-center justify-center">
        <PieChart />
      </div>
    </div>
  );
};

export default ChartsContainer;
