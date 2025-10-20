import type * as time from "@/features/common/shared/time";

//Esse tipo esta em portugues para ficar igual ao cabeçalho do CSV
export type BreastAndUterusCareCsvRow = {
    Nome: string;
    Idade: string;
    CPF: string;
    CNS: string;
    "Telefone celular": string;
    "Telefone residencial": string;
    "Telefone de contato": string;
    Microárea: string;
    "Data de nascimento": time.DateStringWithFullYear;
    "Exame de rastreamento de câncer de colo de útero data última solicitação":
        | time.DateStringWithFullYear
        | "-";
    "Exame de rastreamento de câncer de colo de útero data última avaliação":
        | time.DateStringWithFullYear
        | "-";
    "Exame de rastreamento de câncer de mama data Última solicitação":
        | time.DateStringWithFullYear
        | "-";
    "Exame de rastreamento de câncer de mama data Última avaliação":
        | time.DateStringWithFullYear
        | "-";
    "Data da última consulta de saúde sexual e reprodutiva":
        | time.DateStringWithFullYear
        | "-";
    // "Gerado em": time.DateStringWithFullYear;
};

export type BreastAndUterusCareItem = {
    patientName: string;
    patientAge: string;
    patientCpf: string;
    patientCns: string;
    patientPhoneNumber: string;
    microAreaName: string;
    patientBirthDate: Date;
    papTestLatestRequestDate: Date | null;
    papTestLatestEvaluationDate: Date | null;
    mammographyLatestRequestDate: Date | null;
    mammographyLatestEvaluationDate: Date | null;
    latestSexualAndReproductiveHealthAppointmentDate: Date | null;
    // createdAt: Date;
};
