import type { Status, InputData } from "./hpvVaccinationCalculator";
import { HpvVaccinationCalculator } from "./hpvVaccinationCalculator";

type HpvVaccinationResult = {
    latestDate: Date | null;
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
        Date,
        Date | null,
        Date | null,
        Date | null,
        Date | null,
        Date | null,
        Date | null,
        Date,
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
