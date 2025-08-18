export const sortMicroAreas = (
    a: { label: string; value: string | number },
    b: { label: string; value: string | number }
): number => {
    const isANumber = typeof a.value === "number";
    const isBNumber = typeof b.value === "number";

    if (isANumber && isBNumber) {
        return Number(a.value) - Number(b.value); // ordena números normalmente
    } else if (isANumber && !isBNumber) {
        return -1; // números vêm antes das strings
    } else if (!isANumber && isBNumber) {
        return 1; // strings vêm depois dos números
    } else {
        return String(a.value).localeCompare(String(b.value)); // compara strings
    }
};
