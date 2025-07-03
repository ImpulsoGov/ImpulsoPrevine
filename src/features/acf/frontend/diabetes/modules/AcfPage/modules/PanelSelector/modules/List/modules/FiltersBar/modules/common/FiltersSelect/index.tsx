import type {
    SelectConfig,
    HtmlSelectOption,
} from "../../CoapsFiltersBar/logic";
import type { JSX } from "react";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import {
    AutoCompleteMultiSelect,
    AutoCompleteSingleSelect,
} from "./modules/AutoComplete";
import type { AppliedFilters } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/PanelSelector/modules/List/modules/common/SharedAppliedFilters";

export type FiltersSelectProps<TAppliedFilters extends AppliedFilters> = {
    selectConfigs: Array<SelectConfig>;
    selectedValues: TAppliedFilters;
    // TODO: renomear essa prop para algo como handleAutocompleteChange?
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
};

const getSelectedOptions = <TAppliedFilters extends AppliedFilters>(
    filter: keyof TAppliedFilters,
    selectConfigs: Array<SelectConfig>,
    selectedValues: TAppliedFilters
): Array<HtmlSelectOption> => {
    const selected = selectedValues[filter];
    const config = selectConfigs.find((s) => s.id === filter);
    if (!config) return [];
    if (Array.isArray(selected)) {
        return config.options.filter((opt) =>
            (selected as Array<string>).includes(opt.value)
        );
    } else {
        return config.options.filter((opt) => opt.value === selected);
    }
};

export const FiltersSelect = <TAppliedFilters extends AppliedFilters>({
    selectConfigs,
    selectedValues,
    setSelectedValues,
}: FiltersSelectProps<TAppliedFilters>): Array<JSX.Element> => {
    const valueMemo = useMemo(() => {
        const keys = Object.keys(selectedValues);
        const filters = keys.reduce<
            Record<keyof TAppliedFilters, Array<HtmlSelectOption>>
        >(
            (acc, key) => {
                acc[key as keyof TAppliedFilters] = getSelectedOptions(
                    key as keyof TAppliedFilters,
                    selectConfigs,
                    selectedValues
                );
                return acc;
            },
            {} as Record<keyof TAppliedFilters, Array<HtmlSelectOption>>
        );

        return filters;
    }, [selectedValues, selectConfigs]);

    return selectConfigs.map((select: SelectConfig) =>
        select.isMultiSelect ? (
            <AutoCompleteMultiSelect
                key={`${select.id}-multiSelect`}
                valueMemo={valueMemo}
                select={select}
                setSelectedValues={setSelectedValues}
                selectedValues={selectedValues}
            />
        ) : (
            <AutoCompleteSingleSelect
                key={`${select.id}-singleSelect`}
                valueMemo={valueMemo}
                select={select}
                setSelectedValues={setSelectedValues}
                selectedValues={selectedValues}
            />
        )
    );
};
