import type {
    AcfExternalCardsDescription,
    ExternalCardDataItem,
    ExternalCardDBDataItem,
} from "../../../diabetes/backend/model";
import type { AcfDashboardType } from "../../../diabetes/common/model";

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
