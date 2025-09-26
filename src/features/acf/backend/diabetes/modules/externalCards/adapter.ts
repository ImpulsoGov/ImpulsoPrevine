import type { AcfDashboardType } from "@/features/acf/frontend/common/AcfDashboard";
import type {
    AcfExternalCardsDescription,
    ExternalCardDataItem,
    ExternalCardDBDataItem,
} from "./model";

export const externalCardsDbToModel = (
    data: Array<ExternalCardDBDataItem>
): Array<ExternalCardDataItem> => {
    return data.map((item) => ({
        value: item.valor,
        acfDashboardType: item.lista as AcfDashboardType,
        acfExternalCardsDescription:
            item.descricao as AcfExternalCardsDescription,
    }));
};
