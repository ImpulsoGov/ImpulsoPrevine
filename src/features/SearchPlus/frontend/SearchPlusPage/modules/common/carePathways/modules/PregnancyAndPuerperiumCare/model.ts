import type * as time from "@/features/common/shared/time";

//Esse tipo esta em portugues para ficar igual ao cabeçalho do CSV
export type PregnancyAndPuerperiumCareCsvRow = {
    "Quantidade de atendimentos até 12 semanas no pré-natal": string;
    "Data de nascimento": time.BRTDateString | "" | null;
    "IG (DUM) (semanas)": string;
    "IG (DUM) (dias)": string;
    "IG (ecografia obstétrica) (semanas)": string;
    "IG (ecografia obstétrica) (dias)": string;
    "Quantidade de atendimentos no pré-natal": string;
    "Quantidade de visitas domiciliares no puerpério": string;
    "Quantidade de atendimentos no puerpério": string;
    "Quantidade de visitas domiciliares no pré-natal": string;
};

export type PregnancyAndPuerperiumCareItem = {
    appointmentsUntil12thWeek: number;
    gestationalAgeByLastMenstrualPeriodWeeks: number | null;
    gestationalAgeByLastMenstrualPeriodDays: number | null;
    gestationalAgeByObstreticalUltrasoundWeeks: number | null;
    gestationalAgeByObstreticalUltrasoundDays: number | null;
    appointmentsDuringPrenatal: number;
    homeVisitsDuringPuerperium: number;
    appointmentsDuringPuerperium: number;
    homeVisitsDuringPregnancy: number;
};
