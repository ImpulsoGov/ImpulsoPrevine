import type { Dispatch, JSX, SetStateAction } from "react";
import type {
    HtmlSelectOption,
    SelectConfig,
} from "../../../../CoeqFiltersBar/logic";
import Autocomplete from "@mui/material/Autocomplete";
import { sxMultipleSelect, slotProps, sxSingleSelect } from "./const";
import {
    renderInput,
    renderOptionMultiSelect,
    renderTagsMultiSelect,
} from "./logic";
import type { AppliedFilters } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/PanelSelector/modules/List/modules/common/SharedAppliedFilters";

type AutoCompleteProps<TAppliedFilters extends AppliedFilters> = {
    valueMemo: Record<keyof TAppliedFilters, Array<HtmlSelectOption>>;
    select: SelectConfig;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
    selectedValues: TAppliedFilters;
};

export const AutoCompleteMultiSelect = <
    TAppliedFilters extends AppliedFilters,
>({
    valueMemo,
    select,
    setSelectedValues,
    selectedValues,
}: AutoCompleteProps<TAppliedFilters>): JSX.Element => {
    return (
        <Autocomplete
            value={valueMemo[select.id as keyof TAppliedFilters]}
            key={select.id}
            onChange={(_event, newValue) => {
                setSelectedValues((prevState) => ({
                    ...prevState,
                    [select.id]: newValue.map((item) => item.value),
                }));
            }}
            multiple
            options={select.options}
            limitTags={1}
            sx={sxMultipleSelect(
                selectedValues[
                    select.id as keyof TAppliedFilters
                ] as Array<string>
            )}
            disableCloseOnSelect
            renderInput={renderInput(select.label)}
            renderOption={renderOptionMultiSelect}
            renderTags={renderTagsMultiSelect}
            slotProps={slotProps}
            style={{ width: select.width }}
        />
    );
};

export const AutoCompleteSingleSelect = <
    TAppliedFilters extends AppliedFilters,
>({
    valueMemo,
    select,
    setSelectedValues,
    selectedValues,
}: AutoCompleteProps<TAppliedFilters>): JSX.Element => {
    return (
        <Autocomplete
            value={
                valueMemo[select.id as keyof TAppliedFilters][0] ?? {
                    value: "",
                    label: "",
                }
            }
            key={select.id}
            onChange={(_event, newValue) => {
                setSelectedValues((prevState) => ({
                    ...prevState,
                    [select.id]: newValue ? newValue.value : "",
                }));
            }}
            multiple={false}
            options={select.options}
            sx={sxSingleSelect(
                selectedValues[select.id as keyof TAppliedFilters] as string
            )}
            disableCloseOnSelect
            renderInput={renderInput(select.label)}
            slotProps={slotProps}
            style={{ width: select.width }}
        />
    );
};
