type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type NonZeroDigit = Exclude<Digit, '0'>

//Dia de 01 a 31
type Day =
  // 01–09
  | `0${NonZeroDigit}`
  // 10–19
  | `1${Digit}`
  // 20–29
  | `2${Digit}`
  // 30–31
  | `3${'0'|'1'}`;

type Month =
// 01–09
| `0${NonZeroDigit}`
// 10–12
| `1${'0'|'1'|'2'}`;

type Year = `${Digit}${Digit}`;

type FourDigitYear = `${"19" | "20"}${Digit}${Digit}`;

export type DateString =
  `${Day}/${Month}/${Year}`;

export type ISODateString = `${FourDigitYear}-${Month}-${Day}`;

const isDateValid = (date: Date): boolean => !Number.isNaN(date.getTime())

export const formatDate = (date: Date): DateString | null => {
  //TODO: Retornar algo que descreve o erro, ou fazer throw
    if (!isDateValid(date)) return null;

    const day = date.getUTCDate().toString().padStart(2, "0") as Day;
    // O mês é 0-indexado, então adicionamos 1
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0") as Month;
    const year = date.getUTCFullYear().toString().slice(2) as Year;
    const result: DateString = `${day}/${month}/${year}`
    return result;
}

//TODO: escrever testes
export const isDate = (date: string): boolean => {
    return isDateValid(parseDate(date));
};

//TODO: Rename to parseDate
export const parseDate = (date: string): Date => new Date(date);