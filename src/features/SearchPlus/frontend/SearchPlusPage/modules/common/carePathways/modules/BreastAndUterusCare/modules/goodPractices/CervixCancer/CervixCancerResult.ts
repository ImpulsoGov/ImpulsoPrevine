import type { Status, InputData } from ".";
import { CervixCancerCalculator } from "./CervixCancerCalculator";
import type { LocalDate } from "@js-joda/core";

type CervixCancerResult = {
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
        createdAt,
    };
};

export const CervixCancerResult = (params: unknown): CervixCancerResult => {
    const data = modelToTable(params);
    // TODO: usar factory para criar os calculadores
    const cervixCancerCalc = new CervixCancerCalculator({ ...data });
    return {
        latestDate: cervixCancerCalc.computelatestDate(),
        status: cervixCancerCalc.computeStatus(),
    };
};
