import type {
    AppointmentStatusByQuarter,
    PatientAgeRange,
    LatestExamRequestStatusByQuarter,
} from "@/features/acf/shared/hypertension/schema";

export type HypertensionSharedAppliedFilters = {
    microAreaName: Array<string>;
    appointmentStatusByQuarter: Array<AppointmentStatusByQuarter>;
    latestExamRequestStatusByQuarter: Array<LatestExamRequestStatusByQuarter>;
    patientAgeRange: PatientAgeRange | "";
};
