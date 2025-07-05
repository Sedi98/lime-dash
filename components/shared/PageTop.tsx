import React from "react";
import Input from "./Input";
import Select from "./Select";
import { LuSearch, LuPlus } from "react-icons/lu";
import Button from "./Button";
import { useSearch } from "@/contexts/SearchContext";

const PageTop = () => {
  const { query, setQuery } = useSearch();
  return (
    <div className="flex justify-between items-center p-6">
      <div className="flex gap-4">
        <Input
          icon={<LuSearch />}
          className="text-sm"
          placeholder="Məhsullarda Axtar"
          value={query}
          changeAction={(e) => setQuery(e.target.value)}
        />
        <Select placeholder="Kateqoriya" options={[]} />
      </div>
      <div>
        <Button startIcon={<LuPlus />}>Əlavə et </Button>
      </div>
    </div>
  );
};

export default PageTop;
