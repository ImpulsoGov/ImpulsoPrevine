import type { Status, InputData } from "./breastCancerCalculator";
import { BreastCancerCalculator } from "./breastCancerCalculator";

type BreastCancerResult = {
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
        createdAt,
    ] = params as [
        Date,
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
