"use client";

import React, { useContext, createContext, useState } from "react";

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  query: "",
  setQuery: () => {},
  handleSearch: () => {},
});
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setQuery(query);
  };
  const values = { query, setQuery, handleSearch };
  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
