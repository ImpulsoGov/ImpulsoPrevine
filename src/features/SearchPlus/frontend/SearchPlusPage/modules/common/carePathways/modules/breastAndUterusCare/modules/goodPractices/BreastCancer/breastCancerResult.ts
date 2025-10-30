import type { Status, InputData } from "./breastCancerCalculator";
import { BreastCancerCalculator } from "./breastCancerCalculator";
import type { LocalDate } from "@js-joda/core";

type BreastCancerResult = {
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
        createdAt,
    ] = params as [
        LocalDate,
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
        createdAt: createdAt,
    };
};

export const breastCancerResult = (params: unknown): BreastCancerResult => {
    const data = modelToTable(params);
    // TODO: usar factory para criar os calculadores
    const breastCancerCalc = new BreastCancerCalculator({ ...data });
    return {
        latestDate: breastCancerCalc.computelatestDate(),
        status: breastCancerCalc.computeStatus(),
    };
};
