import { type FilterItem, getListData } from "@/services/lista-nominal/ListaNominal";
import type { Session } from "next-auth";
import { captureException } from "@sentry/nextjs";
import type { DataItem } from "@/utils/FilterData";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

export type ListData = {
    data: DataItem[];
    totalRows: number;
};

export const getListDataResponse = async (
    user: Session["user"],
    setResponse: React.Dispatch<React.SetStateAction<ListData>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    list: string,
    sorting: GridSortModel,
    value: FilterItem,
    pagination: GridPaginationModel,
    search: string,
) => {
    setIsLoading(true);
    try {
        const res = await getListData({
            token: user.access_token,
            listName: list,
            sorting: [
                {
                    sortField: sorting[0].field,
                    sortOrder: sorting[0].sort,
                },
            ],
            filters: value,
            pagination,
            search: search,
        });
        setResponse(res.data);
        setErrorMessage("");
    } catch (error) {
        captureException(error);
        setErrorMessage(
            "Erro ao buscar dados, entre em contato com o suporte.",
        );
    }
    setIsLoading(false);
};
