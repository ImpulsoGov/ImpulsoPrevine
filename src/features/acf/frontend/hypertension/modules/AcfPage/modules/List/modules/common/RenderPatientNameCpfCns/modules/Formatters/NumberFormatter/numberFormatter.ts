export const numberFormatter = (cellNumber: string | null): string => {
    if (!cellNumber) return "-";
    const DDD = cellNumber.slice(0, 2);
    if (cellNumber.length == 11) {
        return `(${DDD}) ${cellNumber.slice(0, 5)}-${cellNumber.slice(5)}`;
    }
    if (cellNumber[2] !== "9" && cellNumber.length == 10) {
        const nineDigitNumber = cellNumber.slice(2).padStart(11, "9");
        return `(${DDD}) ${nineDigitNumber.slice(0, 5)}-${nineDigitNumber.slice(5)}`;
    }
    if (cellNumber.length == 8) {
        return `${cellNumber.slice(0, 4)}-${cellNumber.slice(4)}`;
    }
    return `${cellNumber.slice(0, 5)}-${cellNumber.slice(5)}`;
};
// def standardize_phone_number(number):
//     number = str(number)
//     if number.startswith('559') and len(number) == 11:
//         return number
//     elif number.startswith('55') and len(number) == 10:
//         return '559' + number[2:]
//     elif number.startswith('9') and len(number) == 9:
//       return '55' + number
//     elif len(number) <= 9:
//       return '559' + number
