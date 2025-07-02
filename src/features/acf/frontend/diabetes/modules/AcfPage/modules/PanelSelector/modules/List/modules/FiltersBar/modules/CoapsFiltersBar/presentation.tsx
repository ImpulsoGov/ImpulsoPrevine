"use client";
import { ClearFilters, FilterBar } from "@impulsogov/design-system";
import { type Dispatch, type SetStateAction } from "react";
import { clearFiltersArgs } from "./consts";
import type { SelectConfig } from "./logic";
import { FiltersSelect } from "../common/FiltersSelect";
import type { CoapsAppliedFilters } from "../../../CoapsDataTable";

type FiltersBarProps = React.PropsWithChildren<{
    selectedValues: CoapsAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<CoapsAppliedFilters>>;
    selectConfigs: Array<SelectConfig>;
}>;

export const FiltersBar: React.FC<FiltersBarProps> = ({
    selectedValues,
    setSelectedValues,
    selectConfigs,
}) => {
    const clearButton = (
        <ClearFilters
            data={selectedValues}
            setData={setSelectedValues}
            {...clearFiltersArgs}
        />
    );
    const filters = (
        <FiltersSelect
            selectConfigs={selectConfigs}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
        />
    );
    return <FilterBar filters={filters} clearButton={clearButton} />;
};
