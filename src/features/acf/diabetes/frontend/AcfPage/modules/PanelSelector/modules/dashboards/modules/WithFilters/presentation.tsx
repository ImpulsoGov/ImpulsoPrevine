'use client'
import { useSearchParams } from "next/navigation";
import { createSelectConfigs } from "./logic";
import { useState } from "react";
import { SelectDropdown } from "@impulsogov/design-system";
import { ClearFilters } from "@impulsogov/design-system";
import { FiltersContext } from "./context";
import { FilterBar } from "@impulsogov/design-system";
import type { FiltersUi, SelectedValues } from "@/features/acf/diabetes/frontend/model";
import { clearFiltersArgs } from "./consts";
import type { SelectConfig } from "./logic";
import { searchParamsToSelectedValues } from "./logic";

type WithFiltersProps = React.PropsWithChildren<{
    filtersValues: FiltersUi
}>;

export const WithFilters = ({
    children,
    filtersValues
}: WithFiltersProps) => {
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