import { birthdayFormatter } from "./time";

export const cpfFormatter = (value: string) : string => value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

export const CpfOrBirthdayFormatter = ({value}:{value: string})=> {
    if (!value) return <div>{value}</div>;
    if(value.length === 11) return <div>{cpfFormatter(value)}</div>;
    if(value.length > 11) return <div>{birthdayFormatter(value)}</div>;
    return <div>{value}</div>;
}

