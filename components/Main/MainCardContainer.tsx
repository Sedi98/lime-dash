import React from "react";
import MainCardElement from "./MainCardElement";
import { LuCircleDollarSign } from "react-icons/lu";

const MainCardContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MainCardElement
        title="Mənfəət"
        money="550.25"
        percentage="20"
        lastPeriodMoney="450.25"
        lastPeriodText="Keçən ay"
        icon={<LuCircleDollarSign className="text-xl" />}
      />

      <MainCardElement
        title=" Xalis Mənfəət"
        money="350.25"
        percentage="20"
        lastPeriodMoney="280.25"
        lastPeriodText="Keçən ay"
        icon={<LuCircleDollarSign className="text-xl" />}
      />
      <MainCardElement
        title=" Xalis Mənfəət"
        money="350.25"
        percentage="20"
        lastPeriodMoney="280.25"
        lastPeriodText="Keçən ay"
        icon={<LuCircleDollarSign className="text-xl" />}
      />
      <MainCardElement
        title=" Xalis Mənfəət"
        money="350.25"
        percentage="20"
        lastPeriodMoney="280.25"
        lastPeriodText="Keçən ay"
        icon={<LuCircleDollarSign className="text-xl" />}
      />
    </div>
  );
};

export default MainCardContainer;
