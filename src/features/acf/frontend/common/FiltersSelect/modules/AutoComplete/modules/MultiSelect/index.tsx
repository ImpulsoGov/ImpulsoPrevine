import Autocomplete from "@mui/material/Autocomplete";
import type { Dispatch, JSX, SetStateAction } from "react";
import { sxMultipleSelect } from "./consts";

import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import { renderInput } from "../common/renderInput";
import { slotProps } from "../common/slotProps";
import { renderOptionMultiSelect, renderTagsMultiSelect } from "./logic";
import type {
    HtmlSelectOption,
    SelectConfig,
} from "@/features/acf/frontend/common/SelectConfig";

type AutoCompleteProps<TAppliedFilters extends AppliedFilters> = {
    value: Array<HtmlSelectOption>;
    // TODO: rever se o componente precisa receber o select inteiro ou apenas o id e as opções.
    select: SelectConfig;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
    selectedValues: TAppliedFilters;
};

export const AutoCompleteMultiSelect = <
    TAppliedFilters extends AppliedFilters,
>({
    value,
    select,
    setSelectedValues,
    selectedValues,
}: AutoCompleteProps<TAppliedFilters>): JSX.Element => {
    return (
        <Autocomplete
            value={value}
            key={select.id}
            onChange={(_event, newValue) => {
                setSelectedValues((prevState) => ({
                    ...prevState,
                    [select.id]: newValue.map((item) => item.value),
                }));
            }}
            multiple={true}
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
