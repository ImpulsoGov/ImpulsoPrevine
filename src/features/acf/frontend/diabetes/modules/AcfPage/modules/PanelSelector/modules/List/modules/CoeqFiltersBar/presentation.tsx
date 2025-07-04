"use client";
import {
    ClearFilters,
    FilterBar,
    SelectDropdown,
} from "@impulsogov/design-system";
import type { Dispatch, SetStateAction } from "react";
import type { CoeqAppliedFilters } from "../CoeqDataTable";
import { clearFiltersArgs } from "./consts";
import type { SelectConfig } from "./logic";

type FiltersBarProps = React.PropsWithChildren<{
    selectedValues: CoeqAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<CoeqAppliedFilters>>;
    selectConfigs: Array<SelectConfig>;
}>;

type FiltersSelectProps = {
    selectConfigs: Array<SelectConfig>;
    selectedValues: CoeqAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<CoeqAppliedFilters>>;
};

//TODO: Pra depois, pensar em mudar a estrutura de dados pra algo desse tipo ao invés de FiltersUi + SelectedFilterValues
// type FilterOptions<T> = {
//     selected: Array<T>,
//     options: Array<T>,
// }

const FiltersSelect: React.FC<FiltersSelectProps> = ({
    selectConfigs,
    selectedValues,
    setSelectedValues,
}) => {
    return selectConfigs.map((select: SelectConfig) => (
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
};

export const FiltersBar: React.FC<FiltersBarProps> = ({
    selectedValues,
    setSelectedValues,
    selectConfigs,
}) => {
    console.log(selectedValues);
    const clearButton = (
        <ClearFilters
            data={selectedValues}
            setData={setSelectedValues}
            {...clearFiltersArgs}
        />
    );
    const filters = (
        <FiltersSelect
            selectConfigs={selectConfigs}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
        />
    );
    return <FilterBar filters={filters} clearButton={clearButton} />;
};
