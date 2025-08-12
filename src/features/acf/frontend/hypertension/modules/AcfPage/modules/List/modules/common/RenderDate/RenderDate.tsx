import { parseDate, formatDate } from "@/features/common/shared/time";
import type { JSX } from "react";

export const RenderDate = ({
    value,
}: {
    value: string | null;
}): JSX.Element => {
    if (!value) return <span>-</span>;

    const date = parseDate(value);
    return <span>{formatDate(date)}</span>;
};
