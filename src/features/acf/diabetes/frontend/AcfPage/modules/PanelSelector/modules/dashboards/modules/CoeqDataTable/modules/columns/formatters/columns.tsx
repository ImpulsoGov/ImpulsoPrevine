import { TableTag } from "@/features/acf/common/frontend/TableTag";
import { cpfFormatter } from "@/features/common/formatters/cpf";
import { formatDate, parseDate } from "@/features/common/time";
import React from "react";
import { iconDetailsMap } from "../../../consts";

type CpfOrBirthdayFormatterProps = {
    value: string | null;
};

export const CpfOrBirthdayFormatter: React.FC<CpfOrBirthdayFormatterProps> = ({
    value,
}) => {
    if (!value) return <div data-testid="empty-return">{value}</div>;
    if (value.length === 11)
        return <div data-testid="cpf-return">{cpfFormatter(value)}</div>;
    if (value.length > 11)
        return (
            <div data-testid="birthday-return">
                {formatDate(parseDate(value))}
            </div>
        );
    return <div data-testid="fallback-return">{value}</div>;
};

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

export const RenderDateTagCell: React.FC = () => (
    <TableTag
        theme="pending"
        text="Não realizada"
        icon={iconDetailsMap.pending}
    />
);

export const RenderStatusTagCell: React.FC<{ value: string }> = ({ value }) => {
    const theme = value === "Em dia" ? "success" : "warning";
    return <TableTag theme={theme} text={value} icon={iconDetailsMap[theme]} />;
};
