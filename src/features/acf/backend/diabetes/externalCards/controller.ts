import type { ExternalCardDataItem } from "../../../diabetes/backend/model";
import type { AcfDashboardType } from "../../../diabetes/common/model";
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
