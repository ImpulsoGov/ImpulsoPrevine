//TODO: criar tipo da string de saida que verifica formato
//TODO criar teste unitario
export const formatDate = (date: Date): string => {
    if (Number.isNaN(date.valueOf())) return "";

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    return `${day}/${month}/${year.slice(-2)}`;
}

//essa funcao esta considerando a data no formato yyyy-mm-dd
export const isDate = (date: string): boolean => date.length === 10 && date.includes("-")

export const stringToDate = (date: string): Date => new Date(date);

export const birthdayFormatter = (value: string) : string => {
    const [year, month, day] = value.slice(0, 10).split("-");
    return `${day}/${month}/${year.slice(2)}`;
}