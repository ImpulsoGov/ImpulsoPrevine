import { externalCardsAcfDashboardDataAdapter } from "./externalCardsAcfDashboardData.adapter"
import type { ExternalCardDataItem, AcfDashboardType } from "./ExternalCardItem.model";
import { externalCardsAcfDashboardDataRepository } from "./externalCardsAcfDashboardData.repository";
import type { ProfileIdValue } from "@/types/profile";

export const externalCardsAcfDashboardDataController = async(
    listName: AcfDashboardType, 
    municipalitySusId: string, 
    teamIne : string,
    profileId : ProfileIdValue[]
): Promise<ExternalCardDataItem[]> => {
    const data = externalCardsAcfDashboardDataRepository(listName, teamIne, municipalitySusId, profileId);
    return externalCardsAcfDashboardDataAdapter(data);

}
