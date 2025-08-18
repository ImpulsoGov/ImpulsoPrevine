import { parseDate, formatDate } from "@/features/common/shared/time";
import type { JSX } from "react";
import type { GridRenderCellParams, GridValidRowModel } from "@mui/x-data-grid";

export const RenderDate = <TModel extends GridValidRowModel>({
    value,
}: GridRenderCellParams<TModel, string | null>): JSX.Element => {
    if (!value) return <span>-</span>;

    const date = parseDate(value);
    return <span>{formatDate(date)}</span>;
};
