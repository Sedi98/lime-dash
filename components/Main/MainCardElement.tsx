import React from "react";
import Badge from "../shared/Badge";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

type MainCardElementProps = {
  title?: string;
  money?: string;
  percentage?: string|number;
  lastPeriodMoney?: string;
  lastPeriodText?: string;
  icon?: React.ReactNode;
};

const MainCardElement: React.FC<MainCardElementProps> = ({
  title = "Header",
  money = "550.25",
  percentage = "20",
  lastPeriodMoney = "450.25",
  lastPeriodText = "last period",
  icon
}) => {
  return (
    <div className="flex justify-between items-start bg-base-100 p-4 shadow rounded">
      <div className="textContent">
        <p className="text-base-content/80 text-sm font-normal">{title}</p>
        <div className="mt-3 flex gap-2 items-center">
          <h3 className="text-base-content font-semibold text-2xl">
            {money}
          </h3>
          <Badge size="sm" color={money>lastPeriodMoney ? "success" : "error"}  variant="solid">
            {money>lastPeriodMoney ? <LuArrowUp /> : <LuArrowDown />}
            <span>{percentage}%</span>
          </Badge>
        </div>

        <span className="text-sm text-base-content/60">
          {lastPeriodText} {lastPeriodMoney} 
        </span>
      </div>
      <div className="iconContent p-2 bg-base-300 rounded">{icon}</div>
    </div>
  );
};

export default MainCardElement;
