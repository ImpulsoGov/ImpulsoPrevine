import type { CSSProperties } from "react";

export const slotProps = {
    listbox: {
        sx: {
            '& .MuiAutocomplete-option[aria-selected="true"]': {
                backgroundColor: "#DEF7EC",
            },
            '& .MuiAutocomplete-option[aria-selected="false"]:hover': {
                backgroundColor: "#F4F4F4",
            },
            "& .MuiAutocomplete-option.Mui-focused": {
                backgroundColor: "#FFF",
            },
            '& .MuiAutocomplete-option.Mui-focused[aria-selected="true"]': {
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
            '& .MuiAutocomplete-option[aria-selected="true"]:hover': {
                color: "#000000de",
            },
        },
    },
};

export const sxMultipleSelect = (
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
        "& .MuiOutlinedInput-root.Mui-focused:hover .MuiOutlinedInput-notchedOutline":
            {
                border: `2px solid #1E8E76`,
            },
        "& .MuiInputLabel-shrink": {
            color: "#1E8E76",
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
            backgroundColor: "#DEF7EC",
        },
    };
};
export const sxSingleSelect = (
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
        "& .MuiOutlinedInput-root.Mui-focused .MuiAutocomplete-clearIndicator":
            {
                visibility: value.length > 0 ? "visible" : "hidden",
            },
        "& .MuiOutlinedInput-root.Mui-focused:hover .MuiOutlinedInput-notchedOutline":
            {
                border: `2px solid #1E8E76`,
            },
        "& .MuiInputLabel-shrink": {
            color: "#1E8E76",
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
        "& .MuiAutocomplete-inputRoot": {
            maxHeight: 56,
            fontFamily: "Inter",
        },
        "& .MuiSvgIcon-fontSizeSmall.MuiSvgIcon-root": {
            color: "red",
        },
        "& .MuiAutocomplete-clearIndicator": {
            visibility: value.length > 0 ? "visible" : "hidden",
        },
        "&:hover .MuiAutocomplete-clearIndicator": {
            backgroundColor: "#FFE8E8",
            visibility: value.length > 0 ? "visible" : "hidden",
        },
        "& .MuiInputLabel-root": {
            fontFamily: "Inter",
        },
    };
};
