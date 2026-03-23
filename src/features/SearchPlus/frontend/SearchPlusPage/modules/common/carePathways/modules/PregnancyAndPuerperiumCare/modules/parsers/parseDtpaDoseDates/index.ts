import {
    brtStringToLocalDate,
    type BRTDateString,
} from "@/features/common/shared/time";
import type { LocalDate } from "@js-joda/core";

export const parseDtpaDoseDates = (
    tetanusDiphtheriaPertussisVaccineDoses: string
): Array<LocalDate> => {
    const doses = tetanusDiphtheriaPertussisVaccineDoses.split("|");
    if (doses.length === 1 && doses[0].trim() === "") return [];
    if (doses.length === 0) return [];
    if (doses.some((dose) => !dose.includes("-") || !dose.includes("/")))
        return [];
    const dosesDates = doses.map(
        (dose) =>
            brtStringToLocalDate(
                dose.split("-")[1].trim() as BRTDateString
            ) as LocalDate
    );
    return dosesDates;
};
