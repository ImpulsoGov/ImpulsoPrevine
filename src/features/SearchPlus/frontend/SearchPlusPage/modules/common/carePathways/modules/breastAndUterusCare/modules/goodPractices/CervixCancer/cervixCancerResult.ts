import type { Status, InputData } from ".";
import { CervixCancerCalculator } from "./cervixCancerCalculator";

type CervixCancerResult = {
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
        createdAt,
    };
};

export const cervixCancerResult = (params: unknown): CervixCancerResult => {
    const data = modelToTable(params);
    // TODO: usar factory para criar os calculadores
    const cervixCancerCalc = new CervixCancerCalculator({ ...data });
    return {
        latestDate: cervixCancerCalc.computelatestDate(),
        status: cervixCancerCalc.computeStatus(),
    };
};
