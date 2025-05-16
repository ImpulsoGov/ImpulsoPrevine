'use client'
import { useSearchParams } from "next/navigation";
import { createSelectConfigs } from "./modules/filters/modules/diabetes/filtersBuilder";
import { type SelectConfig, initialFiltersBuilder } from "./modules/filters/initialFilters";
import { useState } from "react";
import { SelectDropdown } from "@impulsogov/design-system";
import { ClearFilters } from "@impulsogov/design-system";
import { FiltersContext } from "./TableWithFilters.context";
import { FilterBar } from "@impulsogov/design-system";
import { clearFiltersArgs } from './modules/filters/clearFiltersArgs';
import type { Filters, FiltersUI } from "@/features/acf/diabetes/common/model";

type TableWithFiltersProps = React.PropsWithChildren<{
    filterItem: Filters
}>;

export const TableWithFilters = ({
    children,
    filterItem
}: TableWithFiltersProps) => {
    const searchParams = useSearchParams(); 
    const filters = createSelectConfigs(filterItem);
    const initialFilters = initialFiltersBuilder(searchParams);
    const [value, setValue] = useState<FiltersUI>(initialFilters);
    const filtersSelect = filters.map((select: SelectConfig) => (
        <SelectDropdown
            key={select.id}
            {...select}
            value={value}
            setValue={setValue}
            options={select.options}
            label={select.label}
            multiSelect={select.isMultiSelect}
            width={select.width}
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