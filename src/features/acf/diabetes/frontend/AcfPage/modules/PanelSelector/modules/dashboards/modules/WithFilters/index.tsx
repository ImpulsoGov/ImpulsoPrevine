"use client";
import type { SelectedFilterValues } from "@/features/acf/diabetes/frontend/model";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { FiltersContext } from "./context";

type FiltersBarProps = {
    selectedValues: SelectedFilterValues;
    setSelectedValues: Dispatch<SetStateAction<SelectedFilterValues>>;
};

type WithFiltersProps = React.PropsWithChildren<{
    FiltersBar: React.FC<FiltersBarProps>;
}>;

const initialSelectedValues: SelectedFilterValues = {
    patientStatus: [],
    conditionIdentifiedBy: "",
    visitantCommunityHealthWorker: [],
    patientAgeRange: [],
};

export const WithFilters: React.FC<WithFiltersProps> = ({
    children,
    FiltersBar,
}) => {
    const [selectedValues, setSelectedValues] = useState<SelectedFilterValues>(
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
