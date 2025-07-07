import type { LiHTMLAttributes, ReactNode } from "react";
import CheckIcon from "@mui/icons-material/Check";
import Chip from "@mui/material/Chip";
import type { HtmlSelectOption } from "@/features/acf/frontend/common/SelectConfig";

type RenderOptionMultiSelectProps = {
    key?: string | number;
} & LiHTMLAttributes<HTMLLIElement>;

type RenderOptionMultiSelectState = {
    selected: boolean;
};

export const renderOptionMultiSelect = (
    props: RenderOptionMultiSelectProps,
    option: HtmlSelectOption,
    state: RenderOptionMultiSelectState
): ReactNode => {
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
            {state.selected && <CheckIcon style={{ fill: "#046C4E" }} />}
        </li>
    );
};

export const renderTagsMultiSelect = (
    value: Array<HtmlSelectOption>,
    getTagProps: (params: { index: number }) => Record<string, unknown>
): React.ReactNode => {
    const numTags = value.length;
    const limitTags = 1;
    return (
        <>
            {value.slice(0, limitTags).map((option, index) => (
                <Chip
                    {...getTagProps({ index })}
                    key={index}
                    label={
                        option.label.length > 20
                            ? `${option.label.slice(0, 20)}...`
                            : option.label
                    }
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
                    {numTags > limitTags && `+${String(numTags - limitTags)}`}
                </div>
            )}
        </>
    );
};
