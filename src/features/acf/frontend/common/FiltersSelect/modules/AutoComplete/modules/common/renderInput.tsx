import type { AutocompleteRenderInputParams } from "@mui/material";
import { TextField } from "@mui/material";
import type { JSX } from "react";

export const renderInput = (label: string) => {
    return (params: AutocompleteRenderInputParams): JSX.Element => (
        <TextField {...params} label={label} />
    );
};
