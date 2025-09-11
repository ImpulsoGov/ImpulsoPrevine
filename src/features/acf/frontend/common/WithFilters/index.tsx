"use client";
import type React from "react";
import { useState } from "react";
import { FiltersContext } from "./context";
import type { AppliedFilters } from "./model";
export type { AppliedFilters };

type WithFiltersProps<TAppliedFilters> = React.PropsWithChildren<{
    initialSelectedValues: TAppliedFilters;
}>;

export const WithFilters = <TAppliedFilters extends AppliedFilters>({
    initialSelectedValues,
    children,
}: WithFiltersProps<TAppliedFilters>): React.ReactNode => {
    const [selectedValues, setSelectedValues] = useState<TAppliedFilters>(
        initialSelectedValues
    );

    return (
        <>
            <FiltersContext.Provider
                value={{ selectedValues, setSelectedValues }}
            >
                {children}
            </FiltersContext.Provider>
        </>
    );
};
