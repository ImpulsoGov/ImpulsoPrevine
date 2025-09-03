const VALOR_NULL = "NULL";
// TODO: apagar esse arquivo
export const orderGroups = (
    current: string,
    next: string,
    last: string
): number => {
    const currentValueUppercase = current.toUpperCase();
    const nextValueUppercase = next.toUpperCase();
    const lastValueUppercase = last.toUpperCase();

    if (
        nextValueUppercase.includes(lastValueUppercase) ||
        nextValueUppercase === VALOR_NULL
    ) {
        return -1;
    }

    if (
        currentValueUppercase.includes(lastValueUppercase) ||
        currentValueUppercase === VALOR_NULL
    ) {
        return 1;
    }

    return currentValueUppercase.localeCompare(nextValueUppercase);
};
