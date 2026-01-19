// import type { LocalDate } from "@js-joda/core";

//Esse tipo esta em portugues para ficar igual ao cabeçalho do CSV
export type PregnancyAndPuerperiumCareCsvRow = {
    "Quantidade de atendimentos até 12 semanas no pré-natal": string;
};

export type PregnancyAndPuerperiumCareItem = {
    appointmentsUntil12thWeek: number;
};
