"use client";
import { ClearFilters, FilterBar } from "@impulsogov/design-system";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { FiltersSelect } from "../FiltersSelect";
import type { SelectConfig } from "../SelectConfig";
import type { AppliedFilters } from "../WithFilters";
import { clearFiltersArgs } from "./consts";

type FiltersBarProps<TAppliedFilters> = React.PropsWithChildren<{
    selectedValues: TAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
    selectConfigs: Array<SelectConfig>;
}>;

export function FiltersBar<TAppliedFilters extends AppliedFilters>({
    selectedValues,
    setSelectedValues,
    selectConfigs,
}: FiltersBarProps<TAppliedFilters>): React.ReactNode {
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
}
