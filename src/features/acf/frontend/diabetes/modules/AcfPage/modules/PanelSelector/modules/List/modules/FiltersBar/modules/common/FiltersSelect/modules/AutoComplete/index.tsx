import type { Dispatch, SetStateAction } from "react";
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
import type { SharedAppliedFilters } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/PanelSelector/modules/List/modules/common/SharedAppliedFilters";
import type { CoapsAppliedFilters } from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/PanelSelector/modules/List/modules/CoapsDataTable";

type AutoCompleteProps = {
    valueMemo: Record<
        keyof SharedAppliedFilters | "careTeamName",
        Array<HtmlSelectOption>
    >;
    select: SelectConfig;
    setSelectedValues: Dispatch<SetStateAction<CoapsAppliedFilters>>;
    selectedValues: CoapsAppliedFilters;
};

export const AutoCompleteMultiSelect: React.FC<AutoCompleteProps> = ({
    valueMemo,
    select,
    setSelectedValues,
    selectedValues,
}) => {
    return (
        <Autocomplete
            value={valueMemo[select.id as keyof CoapsAppliedFilters]}
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
                selectedValues[select.id as keyof CoapsAppliedFilters]
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

export const AutoCompleteSingleSelect: React.FC<AutoCompleteProps> = ({
    valueMemo,
    select,
    setSelectedValues,
    selectedValues,
}) => {
    return (
        <Autocomplete
            value={
                valueMemo[select.id as keyof CoapsAppliedFilters][0] ?? {
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
                selectedValues[select.id as keyof CoapsAppliedFilters]
            )}
            disableCloseOnSelect
            renderInput={renderInput(select.label)}
            slotProps={slotProps}
            style={{ width: select.width }}
        />
    );
};
