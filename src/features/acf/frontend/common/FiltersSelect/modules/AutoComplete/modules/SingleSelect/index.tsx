import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import type {
    HtmlSelectOption,
    SelectConfig,
} from "@/features/acf/frontend/diabetes/modules/AcfPage/modules/PanelSelector/modules/List/modules/FiltersBar/modules/common/SelectConfig";
import Autocomplete from "@mui/material/Autocomplete";
import type { Dispatch, JSX, SetStateAction } from "react";
import { renderInput } from "../common/renderInput";
import { slotProps } from "../common/slotProps";
import { sxSingleSelect } from "./consts";

type AutoCompleteProps<TAppliedFilters extends AppliedFilters> = {
    value: HtmlSelectOption;
    // TODO: rever se o componente precisa receber o select inteiro ou apenas o id e as opções.
    select: SelectConfig;
    setSelectedValues: Dispatch<SetStateAction<TAppliedFilters>>;
    selectedValues: TAppliedFilters;
};

export const AutoCompleteSingleSelect = <
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
