import { dbToModel } from "./adapter";
import type { InternalCardDataItem } from "./model";
import {
    internalCardsDataForAps,
    internalCardsDataForTeam,
} from "./repository";

export const getCoaps = async (
    municipalitySusId: string
): Promise<Array<InternalCardDataItem>> => {
    const data = await internalCardsDataForAps(municipalitySusId);
    return dbToModel(data);
};

export const getCoeq = async (
    municipalitySusId: string,
    teamIne: string
): Promise<Array<InternalCardDataItem>> => {
    const data = await internalCardsDataForTeam(teamIne, municipalitySusId);
    return dbToModel(data);
};
