import type { LocalDate } from "@js-joda/core";
import type { Status, InputData } from "./hpvVaccinationCalculator";
import { HpvVaccinationCalculator } from "./hpvVaccinationCalculator";

type HpvVaccinationResult = {
    latestDate: LocalDate | null;
    status: Status;
};

const modelToTable = (params: unknown): InputData => {
    const [
        patientBirthDate,
        papTestLatestRequestDate,
        papTestLatestEvaluationDate,
        mammographyLatestRequestDate,
        mammographyLatestEvaluationDate,
        latestSexualAndReproductiveHealthAppointmentDate,
        latestHpvVaccinationDate,
        createdAt,
    ] = params as [
        LocalDate,
        LocalDate | null,
        LocalDate | null,
        LocalDate | null,
        LocalDate | null,
        LocalDate | null,
        LocalDate | null,
        LocalDate,
    ];
    return {
        patientBirthDate,
        papTestLatestRequestDate,
        papTestLatestEvaluationDate,
        mammographyLatestRequestDate,
        mammographyLatestEvaluationDate,
        latestSexualAndReproductiveHealthAppointmentDate,
        latestHpvVaccinationDate,
        createdAt: createdAt,
    };
};

export const hpvVaccinationResult = (params: unknown): HpvVaccinationResult => {
    const data = modelToTable(params);
    // TODO: usar factory para criar os calculadores
    const hpvVaccinationCalculator = new HpvVaccinationCalculator({ ...data });
    return {
        latestDate: hpvVaccinationCalculator.computelatestDate(),
        status: hpvVaccinationCalculator.computeStatus(),
    };
};
