"use client";
import dynamic from 'next/dynamic';
import MainCardContainer from "@/components/Main/MainCardContainer";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

const ChartsContainer = dynamic(
  () => import('@/components/Main/Charts/ChartsContainer'),
  { ssr: false }
);

const DashMain = () => {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Dashboard"
        pathNames={{ dash: "Dash" }}
        homeName={"Dashboard"}
      />
      <div className="my-4"></div>
      <MainCardContainer />
      <ChartsContainer />
    </div>
  );
};

export default DashMain;