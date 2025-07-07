import type { LiHTMLAttributes } from "react";

export type RenderOptionMultiSelectProps = {
    key?: string | number;
} & LiHTMLAttributes<HTMLLIElement>;

export type RenderOptionMultiSelectState = {
    selected: boolean;
};
