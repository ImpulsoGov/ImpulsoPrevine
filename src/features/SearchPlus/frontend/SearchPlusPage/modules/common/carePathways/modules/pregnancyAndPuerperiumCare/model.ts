import type * as time from "@/features/common/shared/time";

//Esse tipo esta em portugues para ficar igual ao cabeçalho do CSV
export type PregnancyAndPuerperiumCareCsvRow = {
    "Quantidade de atendimentos até 12 semanas no pré-natal": string;
    "Data de nascimento": time.BRTDateString | "" | null;
};

export type PregnancyAndPuerperiumCareItem = {
    appointmentsUntil12thWeek: number;
};
