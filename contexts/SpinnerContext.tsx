"use client";

import React, { useContext, createContext, useState } from "react";

type SpinnerContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const SpinnerContext = createContext<SpinnerContextType>({
  isLoading: false,
  setIsLoading: () => {},
});
export const SpinnerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const values = { isLoading, setIsLoading };
  return (
    <SpinnerContext.Provider value={values}>{children}</SpinnerContext.Provider>
  );
};

export const useSpinner = () => useContext(SpinnerContext);
