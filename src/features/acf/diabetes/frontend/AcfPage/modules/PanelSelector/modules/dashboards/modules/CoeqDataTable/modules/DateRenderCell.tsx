import { formatDate } from "@/features/common/time";
import React from "react";
import { RenderDateTagCell } from "./RenderDateTagCell";

type DateRenderCellProps = {
    value: string | null;
};

export const DateRenderCell: React.FC<DateRenderCellProps> = ({ value }) => {
    if (!value)
        return (
            <div data-testid="tag">
                <RenderDateTagCell />
            </div>
        );
    return <div>{formatDate(new Date(value.slice(0, 10)))}</div>;
};
