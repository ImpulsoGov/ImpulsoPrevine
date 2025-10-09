import type {
    PatientAgeRange,
    GoodPracticesStatusByQuarter,
    MedicalRecordUpdated,
} from "@/features/acf/shared/diabetes/schema";

export type DiabetesSharedAppliedFilters = {
    microAreaName: Array<string>;
    patientAgeRange: PatientAgeRange | "";
    goodPracticesStatusByQuarter: GoodPracticesStatusByQuarter | "";
    medicalRecordUpdated: MedicalRecordUpdated | "";
};
