import { externalCardsAcfDashboardDataAdapter } from "../adapters/externalCardsAcfDashboardDataAdapter"
import type { ExternalCardDataItem, AcfDashboardType } from "../models/ExternalCardItem";
import { externalCardsAcfDashboardDataRepository } from "../repositories/externalCardsAcfDashboardDataRepository";
import type { ProfileIdValue } from "@/types/profile";

export const externalCardsAcfDashboardDataController = async(
    listName: AcfDashboardType, 
    municipalitySusId: string, 
    teamIne : string,
    _profileId : ProfileIdValue
): Promise<ExternalCardDataItem[]> => {
    const data = externalCardsAcfDashboardDataRepository(listName, teamIne, municipalitySusId);
    return externalCardsAcfDashboardDataAdapter(data);

}
