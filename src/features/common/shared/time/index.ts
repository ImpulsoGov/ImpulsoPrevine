import { LocalDate } from "@js-joda/core";

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

export type BRTDateString2DigitYear = `${Day}/${Month}/${Year}`;

export type BRTDateString = `${Day}/${Month}/${FourDigitYear}`;

type RangeInternal<
    TNum extends number,
    TResult extends Array<unknown> = [],
> = TResult["length"] extends TNum
    ? TResult[number]
    : RangeInternal<TNum, [...TResult, TResult["length"]]>;

// Remove o 0 e gera um range de 1 até N
type Range<TFrom extends number, TTo extends number> = Exclude<
    RangeInternal<TTo>,
    RangeInternal<TFrom>
>;

// Exemplo: 1 a 31
type DayOfMonth = Range<1, 32>;
type MonthOfYear = Range<1, 13>;

type ParsedDate = {
    day: DayOfMonth;
    month: MonthOfYear;
    year: number;
};

const isDateValid = (date: Date): boolean => !Number.isNaN(date.getTime());

/**
 * Formata uma data qualquer para "dd/MM/yyyy"
 * @param date - Data a ser formatada
 * @returns DateString se isDateValid(date) === true, ou null em caso contrário
 */
export const formatDate = (date: Date): BRTDateString2DigitYear | null => {
    if (!isDateValid(date)) return null;

    const day = date.getUTCDate().toString().padStart(2, "0") as Day;
    // O mês é 0-indexado, por isso adicionamos 1
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0") as Month;
    const year = date.getUTCFullYear().toString().slice(2) as Year;
    const result: BRTDateString2DigitYear = `${day}/${month}/${year}`;
    return result;
};

export const parseDate = (date: string): Date => new Date(date);

export const isDate = (date: string): boolean => {
    return isDateValid(parseDate(date));
};

/**
 * Converte uma string de data no formato BRT dd/mm/yyyy para um objeto com dia, mês e ano.
 * @param date Data no formato dd/mm/yyyy
 * @returns Objeto no formato { day, month, year }
 */
export const brtStringDateParser = (date: BRTDateString): ParsedDate => {
    const [day, month, year] = date.split("/");
    return {
        day: Number(day) as DayOfMonth,
        month: Number(month) as MonthOfYear,
        year: Number(year),
    };
};

type StringHour = `0${Range<0, 10>}` | `${Range<10, 24>}`;

type StringMinute = `0${Range<0, 10>}` | `${Range<10, 60>}`;

export type BRTTimeString = `${StringHour}:${StringMinute}`;

export const brtStringToLocalDate = (date: BRTDateString): LocalDate | null => {
    const { day, month, year } = brtStringDateParser(date);
    try {
        return LocalDate.of(year, month, day);
    } catch {
        return null;
    }
};

export const localDateToBrtString2DigitYear = (
    date: LocalDate
): BRTDateString2DigitYear => {
    const day = date.dayOfMonth().toString().padStart(2, "0") as Day;
    const month = date.monthValue().toString().padStart(2, "0") as Month;
    const year = date.year().toString().slice(2) as Year;
    return `${day}/${month}/${year}`;
};

export const brtDateRegex = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}/g;

export const isBrtDateStringValid = (dateString: string): boolean => {
    const brtDateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return brtDateRegex.test(dateString);
};

export const isBrtTimeStringValid = (timeString: string): boolean => {
    const brtTimeRegex = /^(0[\d]|1[\d]|2[0-3]):([0-5][\d])/;
    return brtTimeRegex.test(timeString);
};
