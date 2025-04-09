import type { AcfDashboardType } from "../../../../types";
import { externalCardsDbToModel } from "./externalCards.adapter";
import type { ExternalCardDataItem } from "./externalCards.model";
import { externalCardsDataForTeam } from "./externalCards.repository";

export const externalCardsAcfDashboardDataControllerForTeam = async(
    listName: AcfDashboardType, 
    municipalitySusId: string, 
    teamIne : string,
): Promise<ExternalCardDataItem[]> => {
    const data = externalCardsDataForTeam(listName, teamIne, municipalitySusId);
    return externalCardsDbToModel(data);
}
