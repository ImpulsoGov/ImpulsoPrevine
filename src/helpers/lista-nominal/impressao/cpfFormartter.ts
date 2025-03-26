export const birthDayDate = (data: string) => {
    if (data.includes("/")) return data;
    const parts = data.split("-");
    const dia = parts[2];
    const mes = parts[1];
    const ano = parts[0];
    const date = `${dia}/${mes}/${ano}`;
    return date;
};

export const cpfFormatter = (cpf: string) => {
    if (cpf.includes(".") && cpf.includes("-")) return cpf;

    const parte1 = cpf.slice(0, 3);
    const parte2 = cpf.slice(3, 6);
    const parte3 = cpf.slice(6, 9);
    const parte4 = cpf.slice(-2);
    const cpfFormatado = `${parte1}.${parte2}.${parte3}-${parte4}`;

    return cpfFormatado;
};

export const cpfOrBirthDayFormatter = ({ value }: Record<string, string>) => {
    return !(
        value.includes(".") &&
        value.includes("-") &&
        value.includes("/")
    ) ||
        (value.includes(".") && value.includes("-"))
        ? cpfFormatter(value)
        : birthDayDate(value);
};
