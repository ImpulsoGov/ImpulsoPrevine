import { dbToModel } from "./internalCards.adapter";
import type { InternalCardDataItem } from "./internalCards.model";
import { internalCardsDataForTeam } from "./internalCards.repository";

export const internalCardsController = async(
    municipalitySusId: string,
    teamIne : string,
): Promise<InternalCardDataItem[]> => {
    const data = await internalCardsDataForTeam(teamIne, municipalitySusId);
    return dbToModel(data);
}