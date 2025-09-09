const lastValueUppercase = "SEM EQUIPE";

export const orderPrintGroups = (current: string, next: string): number => {
    const currentValueUppercase = current.toUpperCase();
    const nextValueUppercase = next.toUpperCase();

    if (nextValueUppercase === lastValueUppercase) return -1;

    if (currentValueUppercase === lastValueUppercase) return 1;

    return currentValueUppercase.localeCompare(nextValueUppercase);
};
