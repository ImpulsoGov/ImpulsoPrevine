type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

//Dia de 01 a 31
type DayType =
  // 01–09
  | `0${'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'}`
  // 10–19
  | `1${Digit}`
  // 20–29
  | `2${Digit}`
  // 30–31
  | `3${'0'|'1'}`;

type MonthType =
// 01–09
| `0${'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'}`
// 10–12
| `1${'0'|'1'|'2'}`;

type YearType = `${Digit}${Digit}`;

type YearFourDigitsType = `${"19" | "20"}${Digit}${Digit}`;

export type DateString =
  `${DayType}/${MonthType}/${YearType}`;

export type DateStringISOWithoutTimeStampType = `${YearFourDigitsType}-${MonthType}-${DayType}`;

// ——— Type Guards ———
const isDayType = (s: string): boolean => /^(0[1-9]|[12]\d|3[01])$/.test(s)
const isMonthType = (s: string): boolean => /^(0[1-9]|1[0-2])$/.test(s);
const isYearType = (s: string): boolean => /^\d{2}$/.test(s);
const isDateStringValid = (
    day: string,
    month: string,
    year: string
): boolean=> {
    if (!isDayType(day)) {
        throw new Error(`Dia inválido: ${day}`);
    }
    if (!isMonthType(month)) {
        throw new Error(`Mês inválido: ${month}`);
    }
    if (!isYearType(year)) {
        throw new Error(`Ano inválido: ${year}`);
    }
    return true;
}

export const formatDate = (date: Date): DateString => {
    const dayString = date.getUTCDate().toString().padStart(2, "0") as DayType;
    const monthString = (date.getMonth() + 1).toString().padStart(2, "0") as MonthType;
    const yearString = date.getFullYear().toString().slice(2) as YearType;
    if (!isDateStringValid(dayString, monthString, yearString)) {
        throw new Error(`Data inválida: ${dayString}/${monthString}/${yearString}`);
    }
    const dateString: DateString = `${dayString}/${monthString}/${yearString}`
    return dateString;
}


const isDateIsoWithoutTimestampType = (date : string)=>/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date);

export const isDate = (date: string): boolean => {
    if(!isDateIsoWithoutTimestampType(date)) {
        throw new Error(`Data fora do formato ISO sem timestamp: ${date}`);
    }
    return date.length === 10 && date.includes("-")
}

export const stringToDate = (date: string): Date => new Date(date);

export const birthdayFormatter = (value: string) : string => {
    const [year, month, day] = value.slice(0, 10).split("-");
    return `${day}/${month}/${year.slice(2)}`;
}