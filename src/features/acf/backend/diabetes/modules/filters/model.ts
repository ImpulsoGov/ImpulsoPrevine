import type {
    MedicalRecordUpdatedText,
    GoodPracticesStatusByQuarterText,
    DiabetesAcfItem,
    PatientAgeRangeText,
} from "@features/acf/shared/diabetes/model";

type SharedFiltersOptions = {
    microAreaName: ReadonlyArray<DiabetesAcfItem["microAreaName"]>;
    patientAgeRange: ReadonlyArray<PatientAgeRangeText>;
    goodPracticesStatusByQuarter: ReadonlyArray<GoodPracticesStatusByQuarterText>;
    medicalRecordUpdated: ReadonlyArray<MedicalRecordUpdatedText>;
};

export type FiltersOptionsCoeq = SharedFiltersOptions;

export type FiltersOptionsCoaps = SharedFiltersOptions & {
    careTeamName: ReadonlyArray<DiabetesAcfItem["careTeamName"]>;
};
