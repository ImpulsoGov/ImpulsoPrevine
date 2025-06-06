"use client";
import type { SelectedFilterValues } from "@/features/acf/diabetes/frontend/model";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { FiltersContext } from "./context";

type FiltersBarProps = {
    selectedValues: SelectedFilterValues;
    setSelectedValues: Dispatch<SetStateAction<SelectedFilterValues>>;
    // searchParams: ReadonlyURLSearchParams;
};

type WithFiltersProps = React.PropsWithChildren<{
    municipalitySusID: string;
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

    //TODO: Repensar se realmente queremos repassar o SearhParams pra dentro, talvez seja melhor pegar isso a partir de um provider em cima.
    return (
        <>
            <FiltersBar
                // searchParams={useSearchParams()}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
            />
            <FiltersContext.Provider value={selectedValues}>
                {children}
            </FiltersContext.Provider>
        </>
    );
};
