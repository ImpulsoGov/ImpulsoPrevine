"use client";
import {
    ClearFilters,
    FilterBar,
    SelectDropdown,
} from "@impulsogov/design-system";
import type { CSSProperties, Dispatch, SetStateAction } from "react";
import { clearFiltersArgs } from "./consts";
import type { SelectConfig } from "./logic";
import type { AppliedFiltersCoaps } from "../DataTable";
import { Autocomplete, TextField } from "@mui/material";

type FiltersBarProps = React.PropsWithChildren<{
    selectedValues: AppliedFiltersCoaps;
    setSelectedValues: Dispatch<SetStateAction<AppliedFiltersCoaps>>;
    selectConfigs: Array<SelectConfig>;
}>;

type FiltersSelectProps = {
    selectConfigs: Array<SelectConfig>;
    selectedValues: AppliedFiltersCoaps;
    setSelectedValues: Dispatch<SetStateAction<AppliedFiltersCoaps>>;
};

//TODO: Pra depois, pensar em mudar a estrutura de dados pra algo desse tipo ao invés de FiltersUi + SelectedFilterValues
// type FilterOptions<T> = {
//     selected: Array<T>,
//     options: Array<T>,
// }
export const sxSelect = (
    value: string | Array<string>
): Record<string, CSSProperties> | CSSProperties => {
    const colorSelect = value.length === 0 ? "#A6B5BE" : "#1E8E76";
    return {
        color: colorSelect,
        "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "100px",
            border: `2px solid ${colorSelect}`,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #A6B5BE",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #1E8E76",
        },
        "& .MuiSelect-icon": {
            color: colorSelect,
        },
        "&.Mui-focused .MuiSelect-icon": {
            color: "#1E8E76",
        },
        "& .MuiAutocomplete-inputRoot": {
            maxHeight: 56,
        },
        "& .MuiAutocomplete-tag": {
            maxWidth: "100%",
        },
        "& .MuiSvgIcon-fontSizeSmall": {
            fill: "red",
        },
    };
};
const FiltersSelect: React.FC<FiltersSelectProps> = ({
    selectConfigs,
    selectedValues,
    setSelectedValues,
}) => {
    return selectConfigs.map((select: SelectConfig) =>
        select.id === "communityHealthWorker" ? (
            <Autocomplete
                key={select.id}
                multiple
                options={select.options}
                limitTags={1}
                sx={sxSelect(selectedValues[select.id])}
                disableCloseOnSelect
                renderInput={(params) => (
                    <TextField {...params} label={select.label} />
                )}
                style={{ width: select.width }}
            />
        ) : (
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
        )
    );
};

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
