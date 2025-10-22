import type {
    Status,
    InputData,
} from "./sexualAndReproductiveHealthCareCalculator";
import { SexualAndReproductiveHealthCareCalculator } from "./sexualAndReproductiveHealthCareCalculator";

type SexualAndReproductiveHealthCareResult = {
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

export const sexualAndReproductiveHealthCareResult = (
    params: unknown
): SexualAndReproductiveHealthCareResult => {
    const data = modelToTable(params);
    // TODO: usar factory para criar os calculadores
    const sexualAndReproductiveHealthCareCalc =
        new SexualAndReproductiveHealthCareCalculator({ ...data });
    return {
        latestDate: sexualAndReproductiveHealthCareCalc.computelatestDate(),
        status: sexualAndReproductiveHealthCareCalc.computeStatus(),
    };
};
