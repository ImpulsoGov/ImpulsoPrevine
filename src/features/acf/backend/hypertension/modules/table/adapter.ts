import type * as db from "@prisma/client";
import type {
    AppointmentStatusByQuarterCode,
    LatestExamRequestStatusByQuarterCode,
} from "@/features/acf/shared/hypertension/model";
import { appointmentStatusByQuarterCodeToText } from "@/features/acf/shared/hypertension/model";
import type { PageItem } from "./model";

const dbToModel = (hypertensionRow: db.HypertensionAcfItem): PageItem => {
    return {
        municipalitySusId: hypertensionRow.municipalitySusId,
        municipalityName: hypertensionRow.municipalityName,
        patientName: hypertensionRow.patientName,
        patientCpf: hypertensionRow.patientCpf,
        latestAppointmentDate: hypertensionRow.latestAppointmentDate,
        appointmentStatusByQuarter:
            appointmentStatusByQuarterCodeToText[
                hypertensionRow.appointmentStatusByQuarter as AppointmentStatusByQuarterCode
            ],
        latestExamRequestDate: hypertensionRow.latestExamRequestDate,
        latestExamRequestStatusByQuarter:
            appointmentStatusByQuarterCodeToText[
                hypertensionRow.latestExamRequestStatusByQuarter as LatestExamRequestStatusByQuarterCode
            ],
        careTeamName: hypertensionRow.careTeamName,
        microAreaName: hypertensionRow.microAreaName,
        patientPhoneNumber: hypertensionRow.patientPhoneNumber,
        patientAge: hypertensionRow.patientAge,
    };
};

export const hypertensionPageDbToModel = (
    data: ReadonlyArray<db.HypertensionAcfItem>
): Array<PageItem> => {
    return data.map(dbToModel);
};
