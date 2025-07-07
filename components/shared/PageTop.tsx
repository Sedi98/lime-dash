import React from "react";
import Input from "./Input";
import Select from "./Select";
import { LuSearch, LuPlus, LuX } from "react-icons/lu";
import Button from "./Button";
import { useSearch } from "@/contexts/SearchContext";

const PageTop = () => {
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

        <Select
          value={""}
          onChange={(e) => console.log(e.target.value)} // Handle value change;
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}
          placeholder="Kateqoriya seç"
          className="max-w-32"
        />
      </div>
      <div>
        <Button startIcon={<LuPlus />}>Əlavə et </Button>
      </div>
    </div>
  );
};

export default PageTop;
