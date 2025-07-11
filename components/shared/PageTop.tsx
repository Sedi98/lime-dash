import React from "react";
import Input from "./Input";
import Select from "./Select";
import { LuSearch, LuPlus, LuX } from "react-icons/lu";
import Button from "./Button";
import { useSearch } from "@/contexts/SearchContext";

import DayMonthFilter from "./DayMonthFilter";
import DayMonthSelector from "./DayMonthSelector";

interface PageTopTypes {
  type: string;
}

const PageTop: React.FC<PageTopTypes> = ({ type }) => {
  const { query, setQuery, handleSearch } = useSearch();
  const [searchData, setSearchData] = React.useState<string>(query);
  return (
    <div className="flex justify-between items-center p-6">
      <div className="flex gap-2">
        <form
          className="flex gap-2 relative"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchData);
          }} // Handle form submission;
        >
          <Input
            icon={<LuSearch />}
            className="text-sm "
            placeholder="Məhsullarda Axtar"
            value={searchData}
            changeAction={(e) => setSearchData(e.target.value)}
            type="text"
          />
          <div
            className="tooltip absolute right-1 bottom-1 z-20"
            data-tip="Temizle"
          >
            <Button
              onClick={(e) => {
                setQuery("");
                setSearchData("");
              }}
              type="button"
              size="sm"
              variant="ghost"
              shape="circle"
            >
              <LuX />
            </Button>
          </div>
        </form>

        {/* <CategoryFilter /> */}

        {type?.toLowerCase() !== "products" && <DayMonthFilter data={[{name:'Gündəlik',value:'d'}, {name:'Aylıq',value:'m'}]} />}
        {/* <DateFilter data={["Gündəlik", "Aylıq"]} /> */}
        <DayMonthSelector />
      </div>
      <div>
        <Button startIcon={<LuPlus />}>Əlavə et </Button>
      </div>
    </div>
  );
};

export default PageTop;
