import React from "react";
import StackedChart from "./StackedChart";

const ChartsContainer = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 space-x-2">
      <div className="w-full p-4 bg-base-100 shadow rounded">
        <div>
          <div className="flex justify-between items-start bg-base-100 p-4">
            <div className="textContent">
              <p className="text-base-content text-md font-normal">
                Revenue
              </p>
              <div className="mt-3 flex gap-2 items-center">
                <h3 className="text-base-content font-semibold text-2xl">
                  550 &#8380;
                </h3>
              </div>
            </div>
            {/* <div className="iconContent p-2 bg-base-300 rounded">{icon}</div> */}
          </div>
        </div>
        <StackedChart />
      </div>
      <div></div>
    </div>
  );
};

export default ChartsContainer;
