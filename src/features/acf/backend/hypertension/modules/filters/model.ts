import type {
    MedicalRecordUpdatedText,
    GoodPracticesStatusByQuarterText,
    HypertensionAcfItem,
    PatientAgeRangeText,
} from "@features/acf/shared/hypertension/model";

// TODO: criar tipos com os campos em comum entre coaps e coeq e reaproveitar
export type FiltersOptionsCoeq = {
    microAreaName: ReadonlyArray<HypertensionAcfItem["microAreaName"]>;
    patientAgeRange: ReadonlyArray<PatientAgeRangeText>;
    goodPracticesStatusByQuarter: ReadonlyArray<GoodPracticesStatusByQuarterText>;
    medicalRecordUpdated: ReadonlyArray<MedicalRecordUpdatedText>;
};

export type FiltersOptionsCoaps = {
    careTeamName: ReadonlyArray<HypertensionAcfItem["careTeamName"]>;
    microAreaName: ReadonlyArray<HypertensionAcfItem["microAreaName"]>;
    patientAgeRange: ReadonlyArray<PatientAgeRangeText>;
    goodPracticesStatusByQuarter: ReadonlyArray<GoodPracticesStatusByQuarterText>;
    medicalRecordUpdated: ReadonlyArray<MedicalRecordUpdatedText>;
};
