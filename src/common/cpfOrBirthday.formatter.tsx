import { birthdayFormatter } from "./time";

export const cpfFormatter = (value: string) : string => value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

export const CpfOrBirthdayFormatter = ({value}:{value: string | null})=> {
    if (!value) return <div data-testid="empty-return">{value}</div>;
    if(value.length === 11) return <div data-testid="cpf-return">{cpfFormatter(value)}</div>;
    if(value.length > 11) return <div data-testid="birthday-return">{birthdayFormatter(value)}</div>;
    return <div data-testid="fallback-return">{value}</div>;
}

