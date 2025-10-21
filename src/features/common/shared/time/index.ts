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

export const brtStringToUtcDate = (date: BRTDateString): Date => {
    const { day, month, year } = brtStringDateParser(date);
    const hourForBrt = 3;
    return new Date(year, month - 1, day, hourForBrt);
};
