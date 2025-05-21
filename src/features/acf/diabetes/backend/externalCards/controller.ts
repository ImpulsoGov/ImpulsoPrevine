import type { AcfDashboardType } from "../../common/model";
import type { ExternalCardDataItem } from "../model";
import { externalCardsDbToModel } from "./adapter";
import { externalCardsDataForTeam } from "./repository";

export const externalCardsAcfDashboardDataControllerForTeam = async(
    listName: AcfDashboardType, 
    municipalitySusId: string, 
    teamIne : string,
): Promise<Array<ExternalCardDataItem>> => {
    const data = externalCardsDataForTeam(listName, teamIne, municipalitySusId);
    return externalCardsDbToModel(data);
}
