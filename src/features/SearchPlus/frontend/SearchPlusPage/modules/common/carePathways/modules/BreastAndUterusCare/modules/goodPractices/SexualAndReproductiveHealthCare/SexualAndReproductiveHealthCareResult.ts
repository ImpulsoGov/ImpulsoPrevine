import type {
    Status,
    InputData,
} from "./SexualAndReproductiveHealthCareCalculator";
import { SexualAndReproductiveHealthCareCalculator } from "./SexualAndReproductiveHealthCareCalculator";
import type { LocalDate } from "@js-joda/core";
type SexualAndReproductiveHealthCareResult = {
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

export const SexualAndReproductiveHealthCareResult = (
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
