import type {
    ConditionIdentifiedBy,
    DiabetesAcfItem,
    PatientAgeRange,
    PatientStatus,
} from "@/features/acf/shared/diabetes/model";
import { isDate, parseDate } from "@/features/common/shared/time";
import type { diabetesAcf } from "@prisma/client";

export const cpfOrDate = (fieldValue: string | null): Date | string | null => {
    if (fieldValue && isDate(fieldValue)) {
        return parseDate(fieldValue);
    }
    return fieldValue;
};

const diabetesRowToModel = (diabetesRow: diabetesAcf): DiabetesAcfItem => {
    //Este throw é uma gambiarra. Nós sabemos que estes campos
    //não tem nenhum valor null no BD hoje, e é só o tipo das colunas que está nullable, quando não deveria

    if (!diabetesRow.municipalitySusId || !diabetesRow.careTeamIne) {
        throw new Error(
            "Municipo ou INE da equipe faltando em um dos registros"
        );
    }

    return {
        municipalitySusId: diabetesRow.municipalitySusId,
        municipalityState: diabetesRow.municipalityState || "",
        latestExamRequestDate: diabetesRow.latestExamRequestDate
            ? new Date(diabetesRow.latestExamRequestDate)
            : null,
        mostRecentAppointmentDate: diabetesRow.mostRecentAppointmentDate,
        hemoglobinTestDueDate: diabetesRow.hemoglobinTestDueDate || "",
        nextAppointmentDueDate: diabetesRow.nextAppointmentDueDate || "",
        patientStatus: diabetesRow.patientStatus as PatientStatus,
        conditionIdentifiedBy:
            diabetesRow.conditionIdentifiedBy as ConditionIdentifiedBy,
        patientCpfOrBirthday: cpfOrDate(diabetesRow.patientCpfOrBirthday) || "",
        patientName: diabetesRow.patientName || "",
        patientAgeRange: diabetesRow.patientAgeRange as PatientAgeRange,
        patientAge: diabetesRow.patientAge || 0,
        careTeamIne: diabetesRow.careTeamIne,
        careTeamName: diabetesRow.careTeamName || "",
        communityHealthWorker: diabetesRow.communityHealthWorker || "",
        mostRecentProductionRecordDate:
            diabetesRow.mostRecentProductionRecordDate,
    };
};
export const diabetesPageDbToModel = (
    data: ReadonlyArray<diabetesAcf>
): Array<DiabetesAcfItem> => {
    return data.map<DiabetesAcfItem>(diabetesRowToModel);
};
