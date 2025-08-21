import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import { externalCardsDbToModel } from "./adapter";
import type { ExternalCardDataItem } from "./model";
import { externalCardsDataForTeam } from "./repository";

export const externalCardsAcfDashboardDataControllerForTeam = (
    listName: AcfDashboardType,
    municipalitySusId: string,
    teamIne: string
): Array<ExternalCardDataItem> => {
    const data = externalCardsDataForTeam(listName, teamIne, municipalitySusId);
    return externalCardsDbToModel(data);
};
