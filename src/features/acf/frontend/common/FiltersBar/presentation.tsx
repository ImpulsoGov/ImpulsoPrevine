"use client";
import { ClearFilters, FilterBar } from "@impulsogov/design-system";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { FiltersSelect } from "../FiltersSelect";
import type { SelectConfig } from "../SelectConfig";
import type { AppliedFilters } from "../WithFilters";
import { clearFiltersArgs } from "./consts";
import type { ObjectWithArrays } from "@impulsogov/design-system/dist/molecules/ClearFilters/helpers/ClearObj";

type FiltersBarProps<TAppliedFilters> = React.PropsWithChildren<{
    selectedValues: TAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
    selectConfigs: Array<SelectConfig>;
}>;
const isNumber = (obj: keyof ObjectWithArrays): number | string =>
    typeof obj === "number" ? NaN : "";

const clearObj = (obj: ObjectWithArrays): ObjectWithArrays => {
    return Object.keys(obj).reduce<ObjectWithArrays>((acc, key) => {
        acc[key] = Array.isArray(obj[key]) ? [] : isNumber(obj[key]);
        return acc;
    }, {});
};
export function FiltersBar<TAppliedFilters extends AppliedFilters>({
    selectedValues,
    setSelectedValues,
    selectConfigs,
}: FiltersBarProps<TAppliedFilters>): React.ReactNode {
    const clearButton = (
        <ClearFilters
            data={selectedValues}
            setData={setSelectedValues}
            clearObj={clearObj}
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
