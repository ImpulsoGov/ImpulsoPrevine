export const cpfFormatter = (value: string) : string => value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

export const birthdayFormatter = (value: string) : string => {
    const [year, month, day] = value.slice(0, 10).split("-");
    return `${day}/${month}/${year.slice(2)}`;
}

export const cpfOrBirthdayFormatter = (value: string) : string => {
    if(value.length === 11) return cpfFormatter(value);
    if(value.length > 11) return birthdayFormatter(value);
    return value;
}