import { nameFormatter } from "../../../../../../../logic"; //TODO: Checar este import

type NameFormatterProps = {
    value: string | null;
};

export const NameFormatter: React.FC<NameFormatterProps> = ({ value }) => {
    if (!value) return <div data-testid="empty-return">{value}</div>;
    return <div data-testid="name-return">{nameFormatter(value)}</div>;
};
