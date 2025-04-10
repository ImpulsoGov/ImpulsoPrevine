import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";

export type DiabetesAcfInternalCardsHealthIndicatorType = "Total de pessoas com diabetes" | "Total de pessoas com solicitação de hemoglobina glicada e consulta em dia"
 | "Total de pessoas com diagnóstico autorreferido" | "Total de pessoas com diagnóstico clínico";

export type InternalCardDBDataItem = {
    municipio_id_sus: string;
    ine: string;
    lista: AcfDashboardType;
    valor: number;
    descricao: string;
}

export type InternalCardDataItem = {
    acfDashboardType: AcfDashboardType
    value: number;
    healthIndicator: DiabetesAcfInternalCardsHealthIndicatorType;
}
