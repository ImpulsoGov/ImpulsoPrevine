import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";
import { internalCardsDbToModel } from "./internalCards.adapter";
import type { InternalCardDataItem } from "./internalCards.model";
import { internalCardsDataForTeam } from "./internalCards.repository";

export const internalCardsAcfDashboardDataControllerForTeam = async(
    listName: AcfDashboardType,
    municipalitySusId: string,
    teamIne : string,
): Promise<InternalCardDataItem[]> => {
    const data = internalCardsDataForTeam(listName, teamIne, municipalitySusId);
    return internalCardsDbToModel(data);
}