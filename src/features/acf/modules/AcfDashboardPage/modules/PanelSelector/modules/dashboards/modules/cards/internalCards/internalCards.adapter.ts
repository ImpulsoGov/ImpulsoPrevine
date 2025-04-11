import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types"
import type { DiabetesAcfInternalCardsHealthIndicatorType, InternalCardDBDataItem, InternalCardDataItem } from "./internalCards.model"

export const internalCardsDbToModel = (
    data: InternalCardDBDataItem[]
): InternalCardDataItem[] => {
    return data.map((item) => ({
        value: item.valor,
        acfDashboardType: item.lista as AcfDashboardType,
        healthIndicator: item.descricao as DiabetesAcfInternalCardsHealthIndicatorType
    }))
}
