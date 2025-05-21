import type { DiabetesInternalCardsValue, InternalCardDataItem, InternalCardDBDataItem } from "../model"

export const dbToModel = (
    data: readonly InternalCardDBDataItem[]
): InternalCardDataItem[] => {
    return data.map((item) => ({
        value: item.valor,
        healthIndicator: item.descricao as DiabetesInternalCardsValue
    }))
}
