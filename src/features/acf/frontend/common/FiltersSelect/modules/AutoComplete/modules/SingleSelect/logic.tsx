import Radio from "@mui/material/Radio";
import type {
    RenderOptionMultiSelectProps,
    RenderOptionMultiSelectState,
} from "../common/RenderOption";
import type { HtmlSelectOption } from "@/features/acf/frontend/common/SelectConfig";
import React from "react";

export const renderOptionsSingleSelect = (
    props: RenderOptionMultiSelectProps,
    option: HtmlSelectOption,
    state: RenderOptionMultiSelectState
): React.ReactNode => {
    const { key = option.value, ...optionProps } = props;
    return (
        <li key={key as string} {...optionProps}>
            <Radio
                checked={state.selected}
                sx={{
                    color: "#145C56",
                    "&.Mui-checked": {
                        color: "#145C56",
                    },
                }}
            />
            {option.label}
        </li>
    );
};
