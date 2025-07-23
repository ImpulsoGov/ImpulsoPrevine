import type * as model from "@/features/acf/shared/hypertension/model";
import type * as db from ".prisma/serviceLayerClient";

const dbToModel = (
    hypertensionRow: db.HypertensionAcfItem
): model.HypertensionAcfItem => {
    //Este throw é uma gambiarra. Nós sabemos que estes campos
    //não tem nenhum valor null no BD hoje, e é só o tipo das colunas que está nullable, quando não deveria

    if (!hypertensionRow.municipalitySusId || !hypertensionRow.careTeamName) {
        throw new Error(
            "Municipo ou INE da equipe faltando em um dos registros"
        );
    }

    return {
        municipalitySusId: hypertensionRow.municipalitySusId,
        municipalityName: hypertensionRow.municipalityName,
        patientName: hypertensionRow.patientName ?? "",
        patientCpf: hypertensionRow.patientCpf,
        latestAppointmentDate: hypertensionRow.latestAppointmentDate,
        appointmentStatusByQuarter: hypertensionRow.appointmentStatusByQuarter,
        latestExamRequestDate: hypertensionRow.latestExamRequestDate,
        latestExamRequestStatusByQuarter:
            hypertensionRow.latestExamRequestStatusByQuarter,
        careTeamName: hypertensionRow.careTeamName,
        microAreaName: hypertensionRow.microAreaName,
        patientPhoneNumber: hypertensionRow.patientPhoneNumber,
        patientAge: hypertensionRow.patientAge,
    };
};
export const hypertensionPageDbToModel = (
    data: ReadonlyArray<db.HypertensionAcfItem>
): Array<model.HypertensionAcfItem> => {
    return data.map<model.HypertensionAcfItem>(dbToModel);
};
