import { RenderDateTagCell } from "@/helpers/lista-nominal/renderCell";
import { parseDate, formatDate } from "@/common/time";
import { cpfFormatter } from "@/common/formatters/cpf";

type CpfOrBirthdayFormatterProps = {
    value: string | null;
};

export const CpfOrBirthdayFormatter: React.FC<CpfOrBirthdayFormatterProps> = ({ value }) => {
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

type DateRenderCellProps  = {
    value: string | null;
};

export const DateRenderCell: React.FC<DateRenderCellProps> = ({ value })=> {
    if (!value)
        return <div data-testid="tag">
            <RenderDateTagCell/>
        </div>;
    return <div>{formatDate(new Date(value.slice(0, 10)))}</div>;
}

