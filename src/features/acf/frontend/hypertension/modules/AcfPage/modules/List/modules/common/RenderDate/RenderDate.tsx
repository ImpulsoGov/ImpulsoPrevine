import { parseDate, formatDate } from "@/features/common/shared/time";
import type { JSX } from "react";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";

export const RenderDate = ({
    value,
}: GridRenderCellParams<HypertensionAcfItem, string | null>): JSX.Element => {
    if (!value) return <span>-</span>;

    const date = parseDate(value);
    return <span>{formatDate(date)}</span>;
};
