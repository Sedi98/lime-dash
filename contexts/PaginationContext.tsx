"use client";

import React, { useContext, createContext, useState } from "react";

type PaginationContextType = {
  totalPage: number;
  activePage: number;
  skip: number;
  limit: number;
  totalItem: number;
  setTotalItem: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  setActive: (page: number) => void;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationContext = createContext<PaginationContextType>({
  totalPage: 1,
  activePage: 1,
  skip: 0,
  limit: 30,
  totalItem: 0,
  setTotalItem: () => {},
  setLimit: () => {},
  setSkip: () => {},
  setActive: () => {},
  setActivePage: () => {},
  setTotalPage: () => {},
});

export const PaginationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);
  const [totalItem, setTotalItem] = useState(0);

  const setActive = (page: number) => {
    setActivePage(page);
    setSkip((prev) => (page > activePage ? prev + 20 : prev - 20));
  };

  const values = {
    skip,
    totalPage,
    activePage,
    limit,
    totalItem,
    setTotalItem,
    setLimit,
    setActive,
    setActivePage,
    setTotalPage,
    setSkip,
  };

  return (
    <PaginationContext.Provider value={values}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => useContext(PaginationContext);
