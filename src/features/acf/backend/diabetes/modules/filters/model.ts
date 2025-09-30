import type {
    MedicalRecordUpdatedText,
    GoodPracticesStatusByQuarterText,
    HypertensionAcfItem,
    PatientAgeRangeText,
} from "@features/acf/shared/hypertension/model";

export type SharedFiltersOptions = {
    microAreaName: ReadonlyArray<HypertensionAcfItem["microAreaName"]>;
    patientAgeRange: ReadonlyArray<PatientAgeRangeText>;
    goodPracticesStatusByQuarter: ReadonlyArray<GoodPracticesStatusByQuarterText>;
    medicalRecordUpdated: ReadonlyArray<MedicalRecordUpdatedText>;
};

export type FiltersOptionsCoeq = SharedFiltersOptions;

export type FiltersOptionsCoaps = SharedFiltersOptions & {
    careTeamName: ReadonlyArray<HypertensionAcfItem["careTeamName"]>;
};
