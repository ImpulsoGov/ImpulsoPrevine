"use client";
import type React from "react";
import { useContext, type Dispatch, type SetStateAction } from "react";
import type { AppliedFilters } from "../WithFilters/model";
import {
    FiltersContext,
    type FiltersContextType,
} from "../WithFilters/context";

type FiltersBarProps<TAppliedFilters> = {
    selectedValues: TAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
    isPrintEnabled: boolean;
};

type WithFiltersProps<TAppliedFilters extends AppliedFilters> =
    React.PropsWithChildren<{
        FiltersBar: React.FC<FiltersBarProps<TAppliedFilters>>;
        isPrintEnabled: boolean;
    }>;

export const WithFiltersBar = <TAppliedFilters extends AppliedFilters>({
    FiltersBar,
    children,
    isPrintEnabled,
}: WithFiltersProps<TAppliedFilters>): React.ReactNode => {
    const { selectedValues, setSelectedValues } = useContext(
        FiltersContext
    ) as FiltersContextType<TAppliedFilters>;

    if (selectedValues)
        return (
            <>
                <FiltersBar
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    isPrintEnabled={isPrintEnabled}
                />
                {children}
            </>
        );
};
