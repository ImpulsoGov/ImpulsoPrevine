import type { ProfileIdValue } from "@/types/profile";
import type { AcfDashboardType } from "./ExternalCardItem.model";
import { externalCardsDbToModel } from "./externalCards.adapter"
import { externalCardsDataForTeam } from "./externalCards.repository";

export const externalCardsAcfDashboardDataController = async(
    listName: AcfDashboardType, 
    municipalitySusId: string, 
    teamIne : string,
    userProfiles : ProfileIdValue[]
): Promise<ExternalCardDataItem[]> => {
    const data = externalCardsDataForTeam(listName, teamIne, municipalitySusId, userProfiles);
    return externalCardsDbToModel(data);
}
