'use client'
import { useSearchParams } from "next/navigation";
import { createSelectConfigs } from "./modules/filters/modules/diabetes/createSelectConfigs";
import { type SelectConfig, searchParamsToSelectedValues } from "./modules/filters/searchParamsToSelectedValues";
import { useState } from "react";
import { SelectDropdown } from "@impulsogov/design-system";
import { ClearFilters } from "@impulsogov/design-system";
import { FiltersContext } from "./TableWithFilters.context";
import { FilterBar } from "@impulsogov/design-system";
import { clearFiltersArgs } from './modules/filters/clearFiltersArgs';
import type { FiltersUi, SelectedValues } from "@/features/acf/diabetes/frontend/model";

type TableWithFiltersProps = React.PropsWithChildren<{
    filtersValues: FiltersUi
}>;

export const TableWithFilters = ({
    children,
    filtersValues
}: TableWithFiltersProps) => {
    const searchParams = useSearchParams(); 
    const selectConfigs = createSelectConfigs(filtersValues);
    const initialSelectedValues = searchParamsToSelectedValues(searchParams);
    const [selectedValues, setSelectedValues] = useState<SelectedValues>(initialSelectedValues);
    const filtersSelect = selectConfigs.map((select: SelectConfig) => (
        <SelectDropdown
            key={select.id}
            {...select}
            value={selectedValues}
            setValue={setSelectedValues}
            options={select.options}
            label={select.label}
            multiSelect={select.isMultiSelect}
            width={select.width}
        />
    ));
    const clearButton = <ClearFilters data={selectedValues} setData={setSelectedValues} {...clearFiltersArgs} />

  return (
    <FiltersContext.Provider value={selectedValues}>
        <FilterBar filters={filtersSelect} clearButton={clearButton} />
        {children}
    </FiltersContext.Provider>
  )
}