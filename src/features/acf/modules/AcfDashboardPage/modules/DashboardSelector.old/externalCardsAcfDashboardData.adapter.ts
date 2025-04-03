import type { ExternalCardDataItem, AcfDashboardType, DiabetesAcfExternalCardsDescriptionType } from "./ExternalCardItem.model.ts"

export const externalCardsAcfDashboardDataAdapter = (
    data: { 
        municipio_id_sus: string;
        ine: string;
        lista: string;
        valor: number;
        descricao: string;
    }[]
): ExternalCardDataItem[] => {
    return data.map((item) => ({
        value: item.valor,
        acfDashboardType: item.lista as AcfDashboardType,
        acfExternalCardsDescription: item.descricao as DiabetesAcfExternalCardsDescriptionType
    }))
}