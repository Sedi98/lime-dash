import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen absolute top-0 left-0 bg-black/20 z-50">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
