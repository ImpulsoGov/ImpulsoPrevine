import type * as model from "@/features/acf/shared/hypertension/model";
import type * as db from "@prisma/client";

const dbToModel = (
    hypertensionRow: db.HypertensionAcfItem
): model.HypertensionAcfItem => {
    return {
        municipalitySusId: hypertensionRow.municipalitySusId,
        municipalityName: hypertensionRow.municipalityName,
        patientName: hypertensionRow.patientName,
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
