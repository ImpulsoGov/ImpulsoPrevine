import type {
    PatientAgeRange,
    GoodPracticesStatusByQuarter,
    MedicalRecordUpdated,
} from "@/features/acf/shared/hypertension/schema";

export type HypertensionSharedAppliedFilters = {
    microAreaName: Array<string>;
    patientAgeRange: PatientAgeRange | "";
    goodPracticesStatusByQuarter: GoodPracticesStatusByQuarter | "";
    medicalRecordUpdated: MedicalRecordUpdated | "";
};
