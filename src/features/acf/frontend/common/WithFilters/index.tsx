"use client";
import type React from "react";
import { useState } from "react";
import { FiltersContext } from "./context";
import type { AppliedFilters } from "./model";
// export { FiltersContext };
export type { AppliedFilters };

// type FiltersBarProps<TAppliedFilters> = {
//     selectedValues: TAppliedFilters;
//     setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
// };

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
