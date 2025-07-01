import type { AppliedFiltersCoaps } from "../../../DataTable/modules/CoapsDataTable/model";
import type { SelectConfig, HtmlSelectOption } from "../CoapsFiltersBar/logic";
import {
    useMemo,
    type CSSProperties,
    type Dispatch,
    type SetStateAction,
} from "react";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type FiltersSelectProps = {
    selectConfigs: Array<SelectConfig>;
    selectedValues: AppliedFiltersCoaps;
    setSelectedValues: Dispatch<SetStateAction<AppliedFiltersCoaps>>;
};

const sxSelect = (
    value: string | Array<string>
): Record<string, CSSProperties> | CSSProperties => {
    const colorSelect = value.length === 0 ? "#A6B5BE" : "#1E8E76";
    return {
        color: colorSelect,
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                borderRadius: "100px",
                border: `2px solid #1E8E76`,
            },
        "& .MuiInputLabel-shrink.Mui-focused": {
            color: "#1E8E76",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "100px",
            border: `2px solid ${colorSelect}`,
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderRadius: "100px",
            border: `2px solid ${colorSelect}`,
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            color: "#1E8E76",
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
            fontFamily: "Inter",
        },
        "& .MuiAutocomplete-tag": {
            maxWidth: "100%",
            backgroundColor: "#DEF7EC",
            fontFamily: "Inter",
        },
        "& .MuiChip-root .MuiChip-deleteIcon": {
            color: "#1E8E76",
        },
        "&:hover .MuiChip-root .MuiChip-deleteIcon": {
            color: "#145C56",
        },
        "& .MuiSvgIcon-fontSizeSmall.MuiSvgIcon-root": {
            color: "red",
        },
        "& .MuiAutocomplete-clearIndicator": {
            visibility: "visible",
        },
        "&:hover .MuiAutocomplete-clearIndicator": {
            backgroundColor: "#FFE8E8",
        },
        "& .MuiChip-colorDefault": {
            color: "#000000de",
            borderRadius: "16px",
            padding: "0px",
            fontWeight: "normal",
        },
        '& [data-tag-index]:not([data-tag-index="0"])': {
            visibility: "hidden",
        },
        "& .MuiInputLabel-root": {
            fontFamily: "Inter",
        },
        '& .MuiAutocomplete-option[aria-selected="true"]': {
            backgroundColor: "#DEF7EC",
        },
        '& .MuiAutocomplete-option[aria-selected="true"]:hover': {
            backgroundColor: "#BCF0DA",
        },
        '& .MuiAutocomplete-option[aria-selected="false"]:hover': {
            backgroundColor: "#F4F4F4",
        },
        "& MuiAutocomplete-listbox.MuiAutocomplete-option.Mui-focused": {
            backgroundColor: "#DEF7EC", // Cor de fundo ao passar mouse ou focar
        },
    };
};

export const FiltersSelect: React.FC<FiltersSelectProps> = ({
    selectConfigs,
    selectedValues,
    setSelectedValues,
}) => {
    const memoFunc = (
        filter: keyof AppliedFiltersCoaps
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
    const valueMemo = useMemo(() => {
        const filters = {
            communityHealthWorker: memoFunc("communityHealthWorker"),
            conditionIdentifiedBy: memoFunc("conditionIdentifiedBy"),
            patientAgeRange: memoFunc("patientAgeRange"),
            patientStatus: memoFunc("patientStatus"),
            careTeamName: memoFunc("careTeamName"),
        } as Record<keyof AppliedFiltersCoaps, Array<HtmlSelectOption>>;

        return filters;
    }, [selectedValues, selectConfigs]);

    return selectConfigs.map((select: SelectConfig) =>
        select.isMultiSelect ? (
            <Autocomplete
                value={valueMemo[select.id as keyof AppliedFiltersCoaps]}
                key={select.id}
                onChange={(_event, newValue) => {
                    setSelectedValues((prevState) => ({
                        ...prevState,
                        [select.id]: newValue.map((item) => item.value),
                    }));
                }}
                multiple
                options={select.options}
                // // isOptionEqualToValue={(option, value) => option.value === value.value}
                limitTags={1}
                sx={sxSelect(
                    selectedValues[select.id as keyof AppliedFiltersCoaps]
                )}
                disableCloseOnSelect
                renderInput={(params) => (
                    <TextField {...params} label={select.label} />
                )}
                renderOption={(props, option, { selected }) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const { key = option.value, ...optionProps } = props;
                    return (
                        <li
                            key={key as string}
                            {...optionProps}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontFamily: "Inter",
                            }}
                        >
                            {option.label}
                            {selected && (
                                <CheckIcon style={{ fill: "#046C4E" }} />
                            )}
                        </li>
                    );
                }}
                renderTags={(value, getTagProps) => {
                    const numTags = value.length;
                    const limitTags = 1;
                    return (
                        <>
                            {value.slice(0, limitTags).map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={index}
                                    label={option.label}
                                />
                            ))}

                            {numTags - limitTags > 0 && (
                                <div
                                    style={{
                                        backgroundColor: "#DEF7EC",
                                        borderRadius: "100%",
                                        padding: "3px 7px",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        color: "#046C4E",
                                        fontFamily: "Inter",
                                    }}
                                >
                                    {numTags > limitTags &&
                                        `+${String(numTags - limitTags)}`}
                                </div>
                            )}
                        </>
                    );
                }}
                slotProps={{
                    listbox: {
                        sx: {
                            '& .MuiAutocomplete-option[aria-selected="true"]': {
                                backgroundColor: "#DEF7EC",
                            },
                            '& .MuiAutocomplete-option[aria-selected="false"]:hover':
                                {
                                    backgroundColor: "#F4F4F4",
                                },
                            "& .MuiAutocomplete-option.Mui-focused": {
                                backgroundColor: "#FFF",
                            },
                            '& .MuiAutocomplete-option.Mui-focused[aria-selected="true"]':
                                {
                                    backgroundColor: "#DEF7EC",
                                },
                            '& .MuiAutocomplete-option.Mui-focused[aria-selected="true"]:hover':
                                {
                                    backgroundColor: "#BCF0DA",
                                },
                        },
                    },
                    paper: {
                        sx: {
                            '& .MuiAutocomplete-option[aria-selected="true"]': {
                                color: "#000000de",
                            },
                            '& .MuiAutocomplete-option[aria-selected="true"]:hover':
                                {
                                    color: "#000000de",
                                },
                        },
                    },
                }}
                style={{ width: select.width }}
            />
        ) : (
            <Autocomplete
                value={
                    valueMemo[select.id as keyof AppliedFiltersCoaps][0] ?? {
                        value: "",
                        label: "",
                    }
                }
                key={select.id}
                onChange={(_event, newValue) => {
                    setSelectedValues((prevState) => ({
                        ...prevState,
                        [select.id]: newValue?.value,
                    }));
                }}
                multiple={false}
                options={select.options}
                // // isOptionEqualToValue={(option, value) => option.value === value.value}
                limitTags={1}
                sx={sxSelect(
                    selectedValues[select.id as keyof AppliedFiltersCoaps]
                )}
                disableCloseOnSelect
                renderInput={(params) => (
                    <TextField {...params} label={select.label} />
                )}
                renderOption={(props, option, { selected }) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const { key = option.value, ...optionProps } = props;
                    return (
                        <li
                            key={key as string}
                            {...optionProps}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontFamily: "Inter",
                            }}
                        >
                            {option.label}
                            {selected && (
                                <CheckIcon style={{ fill: "#046C4E" }} />
                            )}
                        </li>
                    );
                }}
                renderTags={(value, getTagProps) => {
                    const numTags = value.length;
                    const limitTags = 1;
                    return (
                        <>
                            {value.slice(0, limitTags).map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={index}
                                    label={option.label}
                                />
                            ))}

                            {numTags - limitTags > 0 && (
                                <div
                                    style={{
                                        backgroundColor: "#DEF7EC",
                                        borderRadius: "100%",
                                        padding: "3px 7px",
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        color: "#046C4E",
                                        fontFamily: "Inter",
                                    }}
                                >
                                    {numTags > limitTags &&
                                        `+${String(numTags - limitTags)}`}
                                </div>
                            )}
                        </>
                    );
                }}
                slotProps={{
                    listbox: {
                        sx: {
                            '& .MuiAutocomplete-option[aria-selected="true"]': {
                                backgroundColor: "#DEF7EC",
                            },
                            '& .MuiAutocomplete-option[aria-selected="false"]:hover':
                                {
                                    backgroundColor: "#F4F4F4",
                                },
                            "& .MuiAutocomplete-option.Mui-focused": {
                                backgroundColor: "#FFF",
                            },
                            '& .MuiAutocomplete-option.Mui-focused[aria-selected="true"]':
                                {
                                    backgroundColor: "#DEF7EC",
                                },
                            '& .MuiAutocomplete-option.Mui-focused[aria-selected="true"]:hover':
                                {
                                    backgroundColor: "#BCF0DA",
                                },
                        },
                    },
                    paper: {
                        sx: {
                            '& .MuiAutocomplete-option[aria-selected="true"]': {
                                color: "#000000de",
                            },
                            '& .MuiAutocomplete-option[aria-selected="true"]:hover':
                                {
                                    color: "#000000de",
                                },
                        },
                    },
                }}
                style={{ width: select.width }}
            />
        )
    );
};
