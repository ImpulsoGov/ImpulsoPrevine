import type * as model from "@/features/acf/shared/diabetes/model";
import { isDate, parseDate } from "@/features/common/shared/time";
import type * as db from ".prisma/serviceLayerClient";

export const cpfOrDate = (fieldValue: string | null): Date | string | null => {
    if (fieldValue && isDate(fieldValue)) {
        return parseDate(fieldValue);
    }
    return fieldValue;
};

const dbToModel = (diabetesRow: db.DiabetesAcfItem): model.DiabetesAcfItem => {
    //Este throw é uma gambiarra. Nós sabemos que estes campos
    //não tem nenhum valor null no BD hoje, e é só o tipo das colunas que está nullable, quando não deveria

    if (!diabetesRow.municipalitySusId || !diabetesRow.careTeamIne) {
        throw new Error(
            "Municipo ou INE da equipe faltando em um dos registros"
        );
    }

    return {
        municipalitySusId: diabetesRow.municipalitySusId || "",
        municipalityState: diabetesRow.municipalityState || "",
        latestExamRequestDate: diabetesRow.latestExamRequestDate
            ? new Date(diabetesRow.latestExamRequestDate)
            : null,
        mostRecentAppointmentDate: diabetesRow.mostRecentAppointmentDate,
        hemoglobinTestDueDate: diabetesRow.hemoglobinTestDueDate || "",
        nextAppointmentDueDate: diabetesRow.nextAppointmentDueDate || "",
        patientStatus: diabetesRow.patientStatus as model.PatientStatus,
        conditionIdentifiedBy:
            diabetesRow.conditionIdentifiedBy as model.ConditionIdentifiedBy,
        patientCpfOrBirthday: cpfOrDate(diabetesRow.patientCpfOrBirthday) || "",
        patientName: diabetesRow.patientName || "",
        patientAgeRange: diabetesRow.patientAgeRange as model.PatientAgeRange,
        patientAge: diabetesRow.patientAge || 0,
        careTeamIne: diabetesRow.careTeamIne,
        careTeamName: diabetesRow.careTeamName || "",
        communityHealthWorker: diabetesRow.communityHealthWorker || "",
        mostRecentProductionRecordDate:
            diabetesRow.mostRecentProductionRecordDate,
    };
};
export const diabetesPageDbToModel = (
    data: ReadonlyArray<db.DiabetesAcfItem>
): Array<model.DiabetesAcfItem> => {
    return data.map<model.DiabetesAcfItem>(dbToModel);
};
