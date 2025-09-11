"use client";
import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import type { AppliedFilters } from "./model";
export type FiltersContextType<TAppliedFilters extends AppliedFilters> = {
    selectedValues: TAppliedFilters | null;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FiltersContext = createContext<FiltersContextType<any>>(
    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    undefined!
);
