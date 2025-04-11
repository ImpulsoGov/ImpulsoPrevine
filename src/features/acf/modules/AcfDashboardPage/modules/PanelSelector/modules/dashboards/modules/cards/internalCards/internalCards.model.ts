import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";

export type DiabetesAcfInternalCardsHealthIndicatorType = "TOTAL_COM_DIABETES" | "EXAME_E_CONSULTA_EM_DIA"
 | "DIAGNOSTICO_AUTORREFERIDO" | "DIAGNOSTICO_CLINICO";

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
