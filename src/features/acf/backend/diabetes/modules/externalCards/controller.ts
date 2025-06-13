import type { AcfDashboardType } from "../../../../shared/diabetes/model";
import type { ExternalCardDataItem } from "../../model";
import { externalCardsDbToModel } from "./adapter";
import { externalCardsDataForTeam } from "./repository";

export const externalCardsAcfDashboardDataControllerForTeam = (
    listName: AcfDashboardType,
    municipalitySusId: string,
    teamIne: string
): Array<ExternalCardDataItem> => {
    const data = externalCardsDataForTeam(listName, teamIne, municipalitySusId);
    return externalCardsDbToModel(data);
};
