"use client";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { FiltersContext } from "./context";
import type { AppliedFilters } from "./model";

export { FiltersContext };
export type { AppliedFilters };

type FiltersBarProps = {
    selectedValues: AppliedFilters; //TODO: Usar um generic ao invés do union type aqui
    setSelectedValues: Dispatch<SetStateAction<AppliedFilters>>;
};

type WithFiltersProps = React.PropsWithChildren<{
    initialSelectedValues: AppliedFilters;
    FiltersBar: React.FC<FiltersBarProps>;
}>;

export const WithFilters: React.FC<WithFiltersProps> = ({
    initialSelectedValues,
    FiltersBar,
    children,
}) => {
    const [selectedValues, setSelectedValues] = useState<AppliedFilters>(
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
