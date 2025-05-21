import type { DiabetesInternalCardsValue, InternalCardDataItem, InternalCardDBDataItem } from "../model"

export const dbToModel = (
    data: ReadonlyArray<InternalCardDBDataItem>
): Array<InternalCardDataItem> => {
    return data.map((item) => ({
        value: item.valor,
        healthIndicator: item.descricao
    }))
}
