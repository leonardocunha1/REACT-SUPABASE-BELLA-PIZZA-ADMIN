import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { useSearchParams } from "react-router-dom";
import FilterOptions from "./FilterOptions";

function TableOperations({
  label,
  filterOptions = [],
  selectOptions = [],
  fieldTab,
  fieldSelect,
  setCurrentPage,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectOrder = searchParams.get(fieldSelect) || "";
  const filterTab =
    searchParams.get(fieldTab) ||
    (filterOptions.length > 0 ? filterOptions[0].value : "");

  function handleChangeSelectOrder(value) {
    searchParams.set(fieldSelect, value);
    setSearchParams(searchParams);
  }

  function handleChangeFilterTab(value) {
    searchParams.set(fieldTab, value);

    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }

    if (setCurrentPage) {
      setCurrentPage(1);
    }

    setSearchParams(searchParams);
  }

  return (
    <div className="flex w-full flex-col items-center justify-between gap-3 lg:flex-row">
      <h2 className="text-xl font-bold sm:text-3xl">{label}</h2>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        {filterOptions.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-lg bg-stone-50 px-2 py-1.5">
            {filterOptions.map((option) => (
              <FilterOptions
                key={option.value}
                label={option.label}
                value={option.value}
                selected={filterTab === option.value}
                onClick={handleChangeFilterTab}
              />
            ))}
          </div>
        )}
        {selectOptions.length > 0 && (
          <Select value={selectOrder} onValueChange={handleChangeSelectOrder}>
            <SelectTrigger className="w-[130px] bg-stone-100 lg:w-44">
              <SelectValue placeholder="Selecione um filtro" />
            </SelectTrigger>
            <SelectContent className="bg-stone-100 font-[poppins] text-sm tracking-wide">
              <SelectGroup>
                {selectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}

export default TableOperations;
