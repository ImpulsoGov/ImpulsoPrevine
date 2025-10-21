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
    ] = params as [
        Date,
        Date | null,
        Date | null,
        Date | null,
        Date | null,
        Date | null,
    ];
    return {
        patientBirthDate,
        papTestLatestRequestDate,
        papTestLatestEvaluationDate,
        mammographyLatestRequestDate,
        mammographyLatestEvaluationDate,
        latestSexualAndReproductiveHealthAppointmentDate,
        // TODO: trocar pela data de criação do CSV
        createdAt: new Date(),
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
