type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type NonZeroDigit = Exclude<Digit, "0">;

//Dia de 01 a 31
type Day =
    // 01–09
    | `0${NonZeroDigit}`
    // 10–19
    | `1${Digit}`
    // 20–29
    | `2${Digit}`
    // 30–31
    | `3${"0" | "1"}`;

type Month =
    // 01–09
    | `0${NonZeroDigit}`
    // 10–12
    | `1${"0" | "1" | "2"}`;

type Year = `${Digit}${Digit}`;

type FourDigitYear = `${"19" | "20"}${Digit}${Digit}`;

export type DateString = `${Day}/${Month}/${Year}`;

export type DateStringWithFullYear = `${Day}/${Month}/${FourDigitYear}`;

export type ISODateString = `${FourDigitYear}-${Month}-${Day}`;

const isDateValid = (date: Date): boolean => !Number.isNaN(date.getTime());

/**
 * Formata uma data qualquer para "dd/MM/yyyy"
 * @param date - Data a ser formatada
 * @returns DateString se isDateValid(date) === true, ou null em caso contrário
 */
export const formatDate = (date: Date): DateString | null => {
    if (!isDateValid(date)) return null;

    const day = date.getUTCDate().toString().padStart(2, "0") as Day;
    // O mês é 0-indexado, por isso adicionamos 1
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0") as Month;
    const year = date.getUTCFullYear().toString().slice(2) as Year;
    const result: DateString = `${day}/${month}/${year}`;
    return result;
};

export const parseDate = (date: string): Date => new Date(date);

export const isDate = (date: string): boolean => {
    return isDateValid(parseDate(date));
};

/**
 * Converte uma data no formato não padrão dd/mm/yyyy para o formato ISO yyyy-mm-dd
 * @param date Data no formato dd/mm/yyyy
 * @returns Data no formato ISO yyyy-mm-dd
 */
export const nonStandardToISO = (
    date: DateStringWithFullYear
): ISODateString => {
    const [day, month, year] = date.split("/");
    return `${year as FourDigitYear}-${month as Month}-${day as Day}`;
};
