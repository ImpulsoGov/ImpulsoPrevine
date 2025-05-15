'use client'
import { useSearchParams } from "next/navigation";
import { filtersBuilder } from "./modules/filters/modules/diabetes/filtersBuilder";
import { type Filter, initialFiltersBuilder } from "./modules/filters/initialFilters";
import { useState } from "react";
import { SelectDropdown } from "@impulsogov/design-system";
import { ClearFilters } from "@impulsogov/design-system";
import { FiltersContext } from "./TableWithFilters.context";
import { FilterBar } from "@impulsogov/design-system";
import { clearFiltersArgs } from './modules/filters/clearFiltersArgs';
import type { Filters } from "@/features/acf/diabetes/common/model";

type TableWithFiltersProps = React.PropsWithChildren<{
    filterItem: Filters
}>;


export const TableWithFilters = ({
    children,
    filterItem
}: TableWithFiltersProps) => {
    const searchParams = useSearchParams(); 
    const filters = filtersBuilder(filterItem);
    const initialFilters = initialFiltersBuilder(searchParams);
    const [value, setValue] = useState<Filters>(initialFilters);

    const filtersSelect = filters.map((filter: Filter) => (
        <SelectDropdown
            key={filter.id}
            {...filter}
            value={value}
            setValue={setValue}
            options={filter.options}
            label={filter.label}
            multiSelect={filter.isMultiSelect}
            width={filter.width}
        />
    ));
    const clearButton = <ClearFilters data={value} setData={setValue} {...clearFiltersArgs} />

  return (
    <FiltersContext.Provider value={value}>
        <FilterBar filters={filtersSelect} clearButton={clearButton} />
        {children}
    </FiltersContext.Provider>
  )
}