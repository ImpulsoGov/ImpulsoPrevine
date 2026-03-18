import type { ErrorData } from "@/features/SearchPlus/frontend/SearchPlusPage";
import type { PregnancyAndPuerperiumCareCsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

const hasValidValue = (value: string | null | undefined): boolean => {
    if (value === undefined || value === null) return false;
    if (value === "-") return false;
    if (value === "") return false;
    if (value === " ") return false;
    if (Number.isNaN(Number(value))) return false;
    if (Number(value) < 0) return false;
    return true;
};

const hasValidGestationalAge = (
    ageInWeeks: string | null | undefined,
    ageInDays: string | null | undefined
): boolean => {
    if (!hasValidValue(ageInWeeks)) return false;
    if (!hasValidValue(ageInDays)) return false;
    return true;
};

const hasGestationalAge = (
    GestationalAgeBasedOnLastMenstrualPeriodWeeks: string | null | undefined,
    GestationalAgeBasedOnLastMenstrualPeriodDays: string | null | undefined,
    GestationalAgeBasedOnUltrasoundWeeks: string | null | undefined,
    GestationalAgeBasedOnUltrasoundDays: string | null | undefined
): boolean => {
    if (
        hasValidGestationalAge(
            GestationalAgeBasedOnUltrasoundWeeks,
            GestationalAgeBasedOnUltrasoundDays
        )
    ) {
        return true;
    } else if (
        hasValidGestationalAge(
            GestationalAgeBasedOnLastMenstrualPeriodWeeks,
            GestationalAgeBasedOnLastMenstrualPeriodDays
        )
    ) {
        return true;
    }
    return false;
};

export const hasPregnancyAndPuerperiumValidations = (
    data: Array<PregnancyAndPuerperiumCareCsvRow>,
    errorHandler: (message: ErrorData) => void
): boolean => {
    const raiseError = (): void => {
        errorHandler({
            title: "Ops, parece que algo não funcionou!",
            message:
                "Erro 08: Possivelmente esse arquivo foi modificado e possui dados inválidos. Tente novamente e selecione um arquivo CSV baixado diretamente do PEC.",
        });
    };

    if (
        data.some((item) => {
            return (
                hasValidValue(
                    item[
                        "Quantidade de atendimentos até 12 semanas no pré-natal"
                    ]
                ) ||
                hasValidValue(
                    item["Quantidade de atendimentos no pré-natal"]
                ) ||
                hasValidValue(
                    item["Quantidade de visitas domiciliares no puerpério"]
                ) ||
                hasValidValue(
                    item["Quantidade de atendimentos no puerpério"]
                ) ||
                !hasGestationalAge(
                    item["IG (DUM) (semanas)"],
                    item["IG (DUM) (dias)"],
                    item["IG (ecografia obstétrica) (semanas)"],
                    item["IG (ecografia obstétrica) (dias)"]
                )
            );
        })
    ) {
        raiseError();
        return false;
    }

    return true;
};
