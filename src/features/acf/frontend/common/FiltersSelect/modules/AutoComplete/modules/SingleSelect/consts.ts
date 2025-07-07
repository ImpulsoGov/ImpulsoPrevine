import type { CSSProperties } from "react";

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
