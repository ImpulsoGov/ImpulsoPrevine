'use client'
import { useSearchParams } from "next/navigation";
import type { DiabetesFilterItem } from "./modules/filters/modules/diabetes/diabetes.model";
import { filtersBuilder } from "./modules/filters/modules/diabetes/filtersBuilder";
import { type Filter, initialFiltersBuilder } from "./modules/filters/initialFilters";
import { useState } from "react";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import { SelectDropdown } from "@impulsogov/design-system";
import { ClearFilters } from "@impulsogov/design-system";
import { FiltersContext } from "./TableWithFilters.context";
import { FilterBar } from "@impulsogov/design-system";
import { clearFiltersArgs } from './modules/filters/clearFiltersArgs';

type TableWithFiltersProps = React.PropsWithChildren<{
    filterItem: DiabetesFilterItem
}>;

export const TableWithFilters = ({
    children,
    filterItem
}: TableWithFiltersProps) => {
    const searchParams = useSearchParams(); 
    const filters = filtersBuilder(filterItem);
    const initialFilters = initialFiltersBuilder(searchParams, filters);
    const [value, setValue] = useState<FilterItem>(initialFilters);

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