"use client";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { FiltersContext } from "./context";
import type { AppliedFilters } from "./model";

// export { FiltersContext };
export type { AppliedFilters };

type FiltersBarProps<TAppliedFilters> = {
    selectedValues: TAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
};

type WithFiltersProps<TAppliedFilters extends AppliedFilters> =
    React.PropsWithChildren<{
        initialSelectedValues: TAppliedFilters;
        FiltersBar: React.FC<FiltersBarProps<TAppliedFilters>>;
    }>;

export const WithFilters = <TAppliedFilters extends AppliedFilters>({
    initialSelectedValues,
    FiltersBar,
    children,
}: WithFiltersProps<TAppliedFilters>): React.ReactNode => {
    const [selectedValues, setSelectedValues] = useState<TAppliedFilters>(
        initialSelectedValues
    );

    return (
        <>
            <FiltersBar
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
            />
            <FiltersContext.Provider value={selectedValues}>
                {children}
            </FiltersContext.Provider>
        </>
    );
};
