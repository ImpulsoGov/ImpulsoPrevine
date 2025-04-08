import { captureException } from "@sentry/nextjs";
import type { Session } from "next-auth";
import { getListData } from "@/services/lista-nominal/ListaNominal";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import type { GridSortModel } from "@mui/x-data-grid";

export type PrintStatesType = {
    list: string;
    sorting: GridSortModel;
    value: FilterItem;
    search: string;
}

export const getPrintDataResponse = async (
    user: Session["user"] | undefined,
    printStates: PrintStatesType
) => {
    if (!user) return;
    try {
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