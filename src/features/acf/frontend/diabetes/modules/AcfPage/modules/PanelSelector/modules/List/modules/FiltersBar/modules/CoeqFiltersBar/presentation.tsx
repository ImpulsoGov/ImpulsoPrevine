"use client";
import { ClearFilters, FilterBar } from "@impulsogov/design-system";
import type { Dispatch, SetStateAction } from "react";
import type { CoeqAppliedFilters } from "../../..//CoeqDataTable";
import { clearFiltersArgs } from "./consts";
import type { SelectConfig } from "./logic";
import { FiltersSelect } from "../common/FiltersSelect";

type FiltersBarProps = React.PropsWithChildren<{
    selectedValues: CoeqAppliedFilters;
    setSelectedValues: Dispatch<SetStateAction<CoeqAppliedFilters>>;
    selectConfigs: Array<SelectConfig>;
}>;

//TODO: Pra depois, pensar em mudar a estrutura de dados pra algo desse tipo ao invés de FiltersUi + SelectedFilterValues
// type FilterOptions<T> = {
//     selected: Array<T>,
//     options: Array<T>,
// }

export const FiltersBar: React.FC<FiltersBarProps> = ({
    selectedValues,
    setSelectedValues,
    selectConfigs,
}) => {
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
