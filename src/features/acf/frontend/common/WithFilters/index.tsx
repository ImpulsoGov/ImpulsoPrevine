"use client";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { createFiltersContext } from "./context";
import type { AppliedFilters } from "./model";

// export { FiltersContext };
export type { AppliedFilters };

type FiltersBarProps<TAppliedFilters> = {
    selectedValues: TAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
};

type WithFiltersProps<TAppliedFilters> = React.PropsWithChildren<{
    initialSelectedValues: TAppliedFilters;
    FiltersBar: React.FC<FiltersBarProps<TAppliedFilters>>;
}>;

export const FiltersContext = createFiltersContext();

export function WithFilters<TAppliedFilters extends AppliedFilters>({
    initialSelectedValues,
    FiltersBar,
    children,
}: WithFiltersProps<TAppliedFilters>): React.ReactNode {
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
}
