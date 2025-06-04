"use client";
import { useSearchParams } from "next/navigation";
import {
    createSelectConfigsCoaps,
    createSelectConfigsCoeqs,
    searchParamsToSelectedValuesCoeqs,
} from "./logic";
import { useState } from "react";
import { SelectDropdown } from "@impulsogov/design-system";
import { ClearFilters } from "@impulsogov/design-system";
import { FiltersContext } from "./context";
import { FilterBar } from "@impulsogov/design-system";
import type {
    FiltersUi,
    SelectedValues,
} from "@/features/acf/diabetes/frontend/model";
import { clearFiltersArgs } from "./consts";
import type { SelectConfig } from "./logic";
import { searchParamsToSelectedValuesCoaps } from "./logic";

type FiltersBarCoapsProps = React.PropsWithChildren<{
    filtersValues: FiltersUi;
}>;

type FiltersBarCoeqsProps = React.PropsWithChildren<{
    filtersValues: FiltersUi;
}>;

export const FiltersBarCoaps: React.FC<FiltersBarCoapsProps> = ({
    children,
    filtersValues,
}) => {
    const searchParams = useSearchParams();
    const selectConfigs = createSelectConfigsCoaps(filtersValues);
    const initialSelectedValues =
        searchParamsToSelectedValuesCoaps(searchParams);
    const [selectedValues, setSelectedValues] = useState<SelectedValues>(
        initialSelectedValues
    );
    const filtersSelect = selectConfigs.map((select: SelectConfig) => (
        <SelectDropdown
            key={select.id}
            {...select}
            value={selectedValues}
            setValue={setSelectedValues}
            options={select.options}
            label={select.label}
            multiSelect={select.isMultiSelect}
            width={select.width}
        />
    ));
    const clearButton = (
        <ClearFilters
            data={selectedValues}
            setData={setSelectedValues}
            {...clearFiltersArgs}
        />
    );

    return (
        <>
            <FilterBar filters={filtersSelect} clearButton={clearButton} />

            <FiltersContext.Provider value={selectedValues}>
                {children}
            </FiltersContext.Provider>
        </>
    );
};

export const FiltersBarCoeqs: React.FC<FiltersBarCoeqsProps> = ({
    children,
    filtersValues,
}) => {
    const searchParams = useSearchParams();
    const selectConfigs = createSelectConfigsCoeqs(filtersValues);
    const initialSelectedValues =
        searchParamsToSelectedValuesCoeqs(searchParams);
    const [selectedValues, setSelectedValues] = useState<SelectedValues>(
        initialSelectedValues
    );
    const filtersSelect = selectConfigs.map((select: SelectConfig) => (
        <SelectDropdown
            key={select.id}
            {...select}
            value={selectedValues}
            setValue={setSelectedValues}
            options={select.options}
            label={select.label}
            multiSelect={select.isMultiSelect}
            width={select.width}
        />
    ));
    const clearButton = (
        <ClearFilters
            data={selectedValues}
            setData={setSelectedValues}
            {...clearFiltersArgs}
        />
    );

    return (
        <>
            <FilterBar filters={filtersSelect} clearButton={clearButton} />

            <FiltersContext.Provider value={selectedValues}>
                {children}
            </FiltersContext.Provider>
        </>
    );
};
