// import type * as time from "@/features/common/shared/time";

export type Count = {
    current: number;
    total: number;
};

//Esse tipo esta em portugues para ficar igual ao cabeçalho do CSV
export type PregnancyAndPuerperiumCareCsvRow = {
    Nome: string;
    CPF: string;
    CNS: string;
    Idade: string;
    Microárea: string;
    "Telefone celular": string;
    "Telefone residencial": string;
    "Telefone de contato": string;
    "Quantidade de atendimentos até 12 semanas no pré-natal": string;
    // "Data de nascimento": time.BRTDateString | "" | null;
    "IG (DUM) (semanas)": string;
    "IG (DUM) (dias)": string;
    "IG (ecografia obstétrica) (semanas)": string;
    "IG (ecografia obstétrica) (dias)": string;
    "Quantidade de atendimentos no pré-natal": string;
    "Quantidade de visitas domiciliares no puerpério": string;
    "Quantidade de atendimentos no puerpério": string;
    "Quantidade de medições de pressão arterial": string;
    "Quantidade de visitas domiciliares no pré-natal": string;
    "Quantidade de medições simultâneas de peso e altura": string;
    "Quantidade de atendimentos odontológicos no pré-natal": string;
};

export type PregnancyAndPuerperiumCareItem = {
    patientName: string;
    patientCpf: string;
    patientCns: string;
    patientAge: string;
    microAreaName: string;
    patientPhoneNumber: string;
    appointmentsUntil12thWeek: number;
    gestationalAgeByLastMenstrualPeriodWeeks: number | null;
    gestationalAgeByLastMenstrualPeriodDays: number | null;
    gestationalAgeByObstreticalUltrasoundWeeks: number | null;
    gestationalAgeByObstreticalUltrasoundDays: number | null;
    appointmentsDuringPrenatal: number;
    homeVisitsDuringPuerperium: number;
    appointmentsDuringPuerperium: number;
    bloodPressureMeasurements: number;
    homeVisitsDuringPregnancy: number;
    weightAndHeightMeasurements: number;
    dentalAppointmentsDuringPrenatal: number;
};
