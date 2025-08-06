import type * as db from "@prisma/client";
import type { StatusCodes } from "@/features/acf/backend/hypertension/modules/common/DbCodeToText";
import { statusByQuarterCodeToText } from "@/features/acf/backend/hypertension/modules/common/DbCodeToText";
import type { PageItem } from "./model";

const dbToModel = (hypertensionRow: db.HypertensionAcfItem): PageItem => {
    return {
        municipalitySusId: hypertensionRow.municipalitySusId,
        municipalityName: hypertensionRow.municipalityName,
        patientName: hypertensionRow.patientName,
        patientCpf: hypertensionRow.patientCpf,
        latestAppointmentDate: hypertensionRow.latestAppointmentDate,
        appointmentStatusByQuarter:
            statusByQuarterCodeToText[
                hypertensionRow.appointmentStatusByQuarter as StatusCodes
            ],
        latestExamRequestDate: hypertensionRow.latestExamRequestDate,
        latestExamRequestStatusByQuarter:
            statusByQuarterCodeToText[
                hypertensionRow.latestExamRequestStatusByQuarter as StatusCodes
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
