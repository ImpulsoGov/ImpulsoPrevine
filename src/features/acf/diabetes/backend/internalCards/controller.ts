import type { InternalCardDataItem } from "../model";
import { dbToModel } from "./adapter";
import {
    internalCardsDataForAps,
    internalCardsDataForTeam,
} from "./repository";

export const internalCardsControllerCoaps = async (
    municipalitySusId: string
): Promise<Array<InternalCardDataItem>> => {
    const data = await internalCardsDataForAps(municipalitySusId);
    return dbToModel(data);
};

export const internalCardsControllerCoeq = async (
    municipalitySusId: string,
    teamIne: string
): Promise<Array<InternalCardDataItem>> => {
    const data = await internalCardsDataForTeam(teamIne, municipalitySusId);
    return dbToModel(data);
};
