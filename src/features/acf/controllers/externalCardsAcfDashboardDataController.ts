import { externalCardsAcfDashboardDataAdapter } from "../adapters/externalCardsAcfDashboardDataAdapter"
import type { ExternalCardDataItem, AcfDashboardType } from "../models/ExternalCardItem";
import { externalCardsAcfDashboardDataRepository } from "../repositories/externalCardsAcfDashboardDataRepository";

export const externalCardsAcfDashboardDataController = async(
    listName: AcfDashboardType, 
    municipalitySusId: string, 
    teamIne : string
): Promise<ExternalCardDataItem[]> => {
    const data = externalCardsAcfDashboardDataRepository(listName, teamIne, municipalitySusId);
    return externalCardsAcfDashboardDataAdapter(data);

}
