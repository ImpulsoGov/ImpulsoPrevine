import type { AcfDashboardType } from "@/features/acf/frontend/common/AcfDashboard";

export type AcfExternalCardsDescription =
    | "DIAGNOSTICO_AUTORREFERIDO"
    | "DIAGNOSTICO_CLINICO";

export type ExternalCardDataItem = {
    acfDashboardType: keyof AcfDashboardType;
    acfExternalCardsDescription: AcfExternalCardsDescription;
    value: number;
};

export type ExternalCardDBDataItem = {
    municipio_id_sus: string;
    ine: string;
    lista: string;
    valor: number;
    descricao: string;
};
