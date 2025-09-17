import type {
    AppointmentStatusByQuarter,
    PatientAgeRange,
    LatestExamRequestStatusByQuarter,
    GoodPracticesStatusByQuarter,
    MedicalRecordUpdated,
} from "@/features/acf/shared/hypertension/schema";

export type HypertensionSharedAppliedFilters = {
    microAreaName: Array<string>;
    appointmentStatusByQuarter: Array<AppointmentStatusByQuarter>;
    latestExamRequestStatusByQuarter: Array<LatestExamRequestStatusByQuarter>;
    patientAgeRange: PatientAgeRange | "";
    goodPracticesStatusByQuarter: GoodPracticesStatusByQuarter | "";
    medicalRecordUpdated: MedicalRecordUpdated | "";
};
