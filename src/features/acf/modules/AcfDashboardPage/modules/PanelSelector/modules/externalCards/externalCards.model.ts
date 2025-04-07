import { AcfDashboardType } from "../../../../types";

export type DiabetesAcfExternalCardsDescriptionType = "DIAGNOSTICO_AUTORREFERIDO" | "DIAGNOSTICO_CLINICO"

export type ExternalCardItem = ExternalCardDataItem &{
    municipalitySusID: string,
    teamIne: string,
}

export type ExternalCardDataItem = {
    acfDashboardType: AcfDashboardType,
    acfExternalCardsDescription: DiabetesAcfExternalCardsDescriptionType;
    value: number;
} 

export type ExternalCardDBDataItem = {
    municipio_id_sus: string;
    ine: string;
    lista: string;
    valor: number;
    descricao: string;
}