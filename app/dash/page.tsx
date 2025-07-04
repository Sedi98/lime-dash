"use client";
import ChartsContainer from "@/components/Main/Charts/ChartsContainer";
import StackedChart from "@/components/Main/Charts/StackedChart";
import MainCardContainer from "@/components/Main/MainCardContainer";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

const DashMain = () => {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Dashboard"
        pathNames={{
          dash: "Dash",
        }}
        homeName={"Dashboard"}
      />
      <div className="my-4"></div>
      <MainCardContainer />


      <ChartsContainer />
    </div>
  );
};

export default DashMain;
