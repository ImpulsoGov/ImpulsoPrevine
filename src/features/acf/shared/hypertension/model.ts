export type HypertensionAcfItem = {
    municipalitySusId: string;
    municipalityName: string;
    patientName: string;
    patientCpf: string;
    latestAppointmentDate: Date | null;
    appointmentStatusByQuarter: number | null;
    latestExamRequestDate: Date | null;
    latestExamRequestStatusByQuarter: number | null;
    careTeamName: string | null;
    microAreaName: string | null;
    patientPhoneNumber: string | null;
    patientAge: number;
};

export const sortOrder = ["asc", "desc"] as const;

export type SortOrder = (typeof sortOrder)[number];

export const sortableFieldCoeq = [
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

export const sortableFieldCoaps = [
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
