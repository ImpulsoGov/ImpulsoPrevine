"use client";
import type {
    FiltersUi,
    SelectedFilterValues,
} from "@/features/acf/diabetes/frontend/model";
import {
    ClearFilters,
    FilterBar,
    SelectDropdown,
} from "@impulsogov/design-system";
import type { Dispatch, SetStateAction } from "react";
import { clearFiltersArgs } from "./consts";
import type { SelectConfig } from "./logic";
import { createSelectConfigsCoeqs } from "./logic";

type FiltersBarCoeqsProps = React.PropsWithChildren<{
    selectedValues: SelectedFilterValues;
    setSelectedValues: Dispatch<SetStateAction<SelectedFilterValues>>;
    filtersOptions: FiltersUi;
}>;

//TODO: Pra depois, pensar em mudar a estrutura de dados pra algo desse tipo ao invés de FiltersUi + SelectedFilterValues
// type FilterOptions<T> = {
//     selected: Array<T>,
//     options: Array<T>,
// }

export const FiltersBar: React.FC<FiltersBarCoeqsProps> = ({
    selectedValues,
    setSelectedValues,
    filtersOptions,
}) => {
    //TODO: Extrair as coisas especificas de COEQS para o container
    const selectConfigs = createSelectConfigsCoeqs(filtersOptions);

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

    return <FilterBar filters={filtersSelect} clearButton={clearButton} />;
};
