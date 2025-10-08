const FORA_DE_AREA = "FA";
const SEM_MICROAREA = "NULL";

export const orderMicroAreas = (current: string, next: string): number => {
    const currentValueUppercase = current.toUpperCase();
    const nextValueUppercase = next.toUpperCase();

    if (currentValueUppercase === SEM_MICROAREA) return 1;

    if (nextValueUppercase === SEM_MICROAREA) return -1;

    if (currentValueUppercase === FORA_DE_AREA.toUpperCase()) return 1;

    if (nextValueUppercase === FORA_DE_AREA.toUpperCase()) return -1;

    return currentValueUppercase.localeCompare(nextValueUppercase, undefined, {
        numeric: true,
    });
};
