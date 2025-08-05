export type HypertensionAcfItem = {
    municipalitySusId: string;
    municipalityName: string;
    patientName: string;
    patientCpf: string;
    latestAppointmentDate: Date | null;
    appointmentStatusByQuarter: string;
    latestExamRequestDate: Date | null;
    latestExamRequestStatusByQuarter: string;
    careTeamName: string | null;
    microAreaName: string | null;
    patientPhoneNumber: string | null;
    patientAge: number;
    patientAgeRange: string;
};

export const sortOrder = ["asc", "desc"] as const;

export type SortOrder = (typeof sortOrder)[number];

export const sortableFieldCoeq: ReadonlyArray<keyof HypertensionAcfItem> = [
    "patientName",
    "patientCpf",
    "latestAppointmentDate",
    "appointmentStatusByQuarter",
    "latestExamRequestDate",
    "latestExamRequestStatusByQuarter",
    "microAreaName",
    "patientPhoneNumber",
    "patientAge",
] as const;

export const sortableFieldCoaps: ReadonlyArray<keyof HypertensionAcfItem> = [
    "patientName",
    "patientCpf",
    "latestAppointmentDate",
    "appointmentStatusByQuarter",
    "latestExamRequestDate",
    "latestExamRequestStatusByQuarter",
    "microAreaName",
    "patientPhoneNumber",
    "patientAge",
    "careTeamName",
] as const;
