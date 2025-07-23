import React, { useState } from "react";
import Select from "./Select";

const DashDateFilter = () => {
  const [special, setSpecial] = useState(false);


  const handleClick = () => {
    setSpecial(false);

  };
  return (
    <div className="flex gap-2">
      <div className="join ">
        <input
          className="join-item btn "
          type="radio"
          name="options"
          aria-label="Bu gün"
          onClick={handleClick}
        />
        <input
          className="join-item btn"
          type="radio"
          name="options"
          aria-label="Bu ay"
          onClick={handleClick}

        />
        <input
          className="join-item btn"
          type="radio"
          name="options"
          aria-label="Hamısı"
          onClick={handleClick}
        />
        <input
          className="join-item btn"
          type="radio"
          name="options"
          aria-label="Xüsusi"
          onClick={() => setSpecial(!special)}
        />
      </div>
      {special && <Select options={[]} placeholder="Tarix seç" />}
    </div>
  );
};

export default DashDateFilter;
