import type { AcfDashboardType, DiabetesAcfExternalCardsDescriptionType, ExternalCardDBDataItem, ExternalCardDataItem } from "./externalCards.model"

export const externalCardsDbToModel = (
    data: ExternalCardDBDataItem[]
): ExternalCardDataItem[] => {
    return data.map((item) => ({
        value: item.valor,
        acfDashboardType: item.lista as AcfDashboardType,
        acfExternalCardsDescription: item.descricao as DiabetesAcfExternalCardsDescriptionType
    }))
}