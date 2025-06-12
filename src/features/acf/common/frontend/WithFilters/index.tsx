"use client";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { FiltersContext } from "./context";
import type { PossibleSelectedFilterValues } from "./model";

export { FiltersContext };
export type { PossibleSelectedFilterValues };

type FiltersBarProps = {
    selectedValues: PossibleSelectedFilterValues;
    setSelectedValues: Dispatch<SetStateAction<PossibleSelectedFilterValues>>;
};

type WithFiltersProps = React.PropsWithChildren<{
    initialSelectedValues: PossibleSelectedFilterValues;
    FiltersBar: React.FC<FiltersBarProps>;
}>;

export const WithFilters: React.FC<WithFiltersProps> = ({
    initialSelectedValues,
    FiltersBar,
    children,
}) => {
    const [selectedValues, setSelectedValues] =
        useState<PossibleSelectedFilterValues>(initialSelectedValues);

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
