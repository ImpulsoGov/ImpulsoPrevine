"use client";
import type { SelectedValues } from "@/features/acf/diabetes/frontend/model";
import { ClearFilters, SelectDropdown } from "@impulsogov/design-system";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const FilterToolbar: React.FC = () => {
    const searchParams = useSearchParams();
    const selectConfigs = createSelectConfigs(filtersValues);
    const initialSelectedValues = searchParamsToSelectedValues(searchParams);
    const [selectedValues, setSelectedValues] = useState<SelectedValues>(
        initialSelectedValues
    );
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
    const clearButton = (
        <ClearFilters
            data={selectedValues}
            setData={setSelectedValues}
            {...clearFiltersArgs}
        />
    );
};
