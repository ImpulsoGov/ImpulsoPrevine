import type { HypertensionAcfItem } from "@features/acf/shared/hypertension/model";
import type * as db from "@prisma/client";

// TODO: criar tipos com os campos em comum entre coaps e coeq e reaproveitar
export type FiltersOptionsDbCoaps = {
    careTeamName: ReadonlyArray<db.HypertensionAcfItem["careTeamName"]>;
    microAreaName: ReadonlyArray<db.HypertensionAcfItem["microAreaName"]>;
    appointmentStatusByQuarter: ReadonlyArray<
        db.HypertensionAcfItem["appointmentStatusByQuarter"]
    >;
    latestExamRequestStatusByQuarter: ReadonlyArray<
        db.HypertensionAcfItem["latestExamRequestStatusByQuarter"]
    >;
    patientAgeRange: ReadonlyArray<db.HypertensionAcfItem["patientAgeRange"]>;
};

export type FiltersOptionsDbCoeq = {
    microAreaName: ReadonlyArray<db.HypertensionAcfItem["microAreaName"]>;
    appointmentStatusByQuarter: ReadonlyArray<
        db.HypertensionAcfItem["appointmentStatusByQuarter"]
    >;
    latestExamRequestStatusByQuarter: ReadonlyArray<
        db.HypertensionAcfItem["latestExamRequestStatusByQuarter"]
    >;
    patientAgeRange: ReadonlyArray<db.HypertensionAcfItem["patientAgeRange"]>;
};

//TODO: sumir com esse arquivo, esses tipos podem ir pra dentro dos módulos
export type FiltersOptionsCoeq = {
    microAreaName: ReadonlyArray<HypertensionAcfItem["microAreaName"]>;
    appointmentStatusByQuarter: ReadonlyArray<
        HypertensionAcfItem["appointmentStatusByQuarter"]
    >;
    latestExamRequestStatusByQuarter: ReadonlyArray<
        HypertensionAcfItem["latestExamRequestStatusByQuarter"]
    >;
    patientAgeRange: ReadonlyArray<HypertensionAcfItem["patientAgeRange"]>;
};

export type FiltersOptionsCoaps = {
    careTeamName: ReadonlyArray<HypertensionAcfItem["careTeamName"]>;
    microAreaName: ReadonlyArray<HypertensionAcfItem["microAreaName"]>;
    appointmentStatusByQuarter: ReadonlyArray<
        HypertensionAcfItem["appointmentStatusByQuarter"]
    >;
    latestExamRequestStatusByQuarter: ReadonlyArray<
        HypertensionAcfItem["latestExamRequestStatusByQuarter"]
    >;
    patientAgeRange: ReadonlyArray<HypertensionAcfItem["patientAgeRange"]>;
};
