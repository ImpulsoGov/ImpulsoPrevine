"use client";
import type {
    FiltersUi,
    SelectedFilterValues,
} from "@/features/acf/diabetes/frontend/model";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import type React from "react";
import type { Dispatch, SetStateAction } from "react";
import { Suspense, useState } from "react";
import {
    filterOptionsCoaps,
    filterOptionsCoeq,
} from "../../../../../../../../backend/filters/controller";
import { FiltersContext } from "./context";

type WithFiltersCoapsProps = React.PropsWithChildren<{
    municipalitySusID: string;
    FiltersBar: React.FC<React.PropsWithChildren<{ filtersValues: FiltersUi }>>;
}>;

type WithFiltersCoeqsProps = React.PropsWithChildren<{
    municipalitySusID: string;
    teamIne: string;
    FiltersBar: React.FC<React.PropsWithChildren<{ filtersValues: FiltersUi }>>;
}>;

export const WithFiltersCoaps: React.FC<WithFiltersCoapsProps> = async ({
    municipalitySusID,
    children,
    FiltersBar,
}) => {
    // TODO rever nome do controller filterOptions
    const filtersValues = await filterOptionsCoaps(municipalitySusID);

    return (
        <Suspense>
            <FiltersBar filtersValues={filtersValues}>{children}</FiltersBar>
        </Suspense>
    );
};

export const WithFiltersCoeq: React.FC<WithFiltersCoeqsProps> = async ({
    municipalitySusID,
    teamIne,
    children,
    FiltersBar,
}) => {
    // TODO rever nome do controller filterOptions
    const filtersValues = await filterOptionsCoeq(municipalitySusID, teamIne);

    return (
        <Suspense>
            <FiltersBar filtersValues={filtersValues}>{children}</FiltersBar>
        </Suspense>
    );
};

type FiltersBarProps = {
    selectedValues: SelectedFilterValues;
    setSelectedValues: Dispatch<SetStateAction<SelectedFilterValues>>;
    searchParams: ReadonlyURLSearchParams;
};

type WithFiltersProps = React.PropsWithChildren<{
    municipalitySusID: string;
    FiltersBar: React.FC<React.PropsWithChildren<FiltersBarProps>>;
}>;

export const WithFilters: React.FC<WithFiltersProps> = ({
    children,
    FiltersBar,
}) => {
    const [selectedValues, setSelectedValues] =
        useState<SelectedFilterValues>(null);

    //TODO: Repensar se realmente queremos repassar o SearhParams pra dentro, talvez seja melhor pegar isso a partir de um provider em cima.
    return (
        <Suspense>
            <FiltersBar
                searchParams={useSearchParams()}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
            />
            <FiltersContext.Provider value={selectedValues}>
                {children}
            </FiltersContext.Provider>
        </Suspense>
    );
};
