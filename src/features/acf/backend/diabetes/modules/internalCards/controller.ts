import type { InternalCardDataItem } from "./model";
import {
    internalCardsDataForAps,
    internalCardsDataForTeam,
} from "./repository";

export const getCoaps = async (
    municipalitySusId: string
): Promise<ReadonlyArray<InternalCardDataItem>> => {
    const data = await internalCardsDataForAps(municipalitySusId);
    return data;
};

export const getCoeq = async (
    municipalitySusId: string,
    teamIne: string
): Promise<ReadonlyArray<InternalCardDataItem>> => {
    const data = await internalCardsDataForTeam(teamIne, municipalitySusId);
    return data;
};
