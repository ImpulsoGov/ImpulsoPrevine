import type { InternalCardDataItem } from "../model";
import { dbToModel } from "./adapter";
import { internalCardsDataForTeam } from "./repository";

export const internalCardsController = async(
    municipalitySusId: string,
    teamIne : string,
): Promise<InternalCardDataItem[]> => {
    const data = await internalCardsDataForTeam(teamIne, municipalitySusId);
    return dbToModel(data);
}