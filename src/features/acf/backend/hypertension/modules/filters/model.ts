import type { HypertensionAcfItem } from "@features/acf/shared/hypertension/model";

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
