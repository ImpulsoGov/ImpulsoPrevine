import { captureException } from "@sentry/nextjs";
import type { Session } from "next-auth";
import { getListData } from "@/services/lista-nominal/ListaNominal";
import type {
    FilterItem,
    ListDataResponse,
} from "@/services/lista-nominal/ListaNominal";
import type { GridSortModel } from "@mui/x-data-grid";

export type PrintStatesType = {
    list: string;
    sorting: GridSortModel;
    value: FilterItem;
    search: string;
};

export const getPrintDataResponse = async (
    user: Session["user"] | undefined,
    printStates: PrintStatesType
): Promise<ListDataResponse | undefined> => {
    if (!user) return;
    try {
        //Este código vai mudar em breve, e esse uso da fn deprecada será corrigido
        //eslint-disable-next-line @typescript-eslint/no-deprecated
        const res = await getListData({
            token: user.access_token,
            listName: printStates.list,
            sorting: [
                {
                    sortField: printStates.sorting[0].field,
                    sortOrder: printStates.sorting[0].sort,
                },
            ],
            filters: printStates.value,
            search: printStates.search,
        });
        return res.data;
    } catch (error) {
        captureException(error);
    }
};
