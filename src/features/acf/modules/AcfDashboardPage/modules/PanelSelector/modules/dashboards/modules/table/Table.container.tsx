import { useSession } from "next-auth/react";
import { PaginatedTable } from "./Table.presentation";
import { useEffect, useState } from "react";
import type { GridPaginationModel } from "@mui/x-data-grid";
import type { AxiosResponse } from "axios";
import { getListData, type ListDataResponse } from "@/services/lista-nominal/ListaNominal";
import type { Session } from "next-auth";
import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";

type TableContainerProps = {
    acfDashboardType: AcfDashboardType;
};

export const TableContainer = ({ 
    acfDashboardType 
}: TableContainerProps
) => {
    const { data: session } = useSession();
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 8,
    });
    const [response, setResponse] = useState<AxiosResponse<ListDataResponse> | null >(null);
    const [user, setUser] = useState<Session["user"]>();
    useEffect(() => setUser(session?.user), [session?.user]);

    useEffect(() => {
        const getResponse = async () => {
            if (!user) { return; }
            const res = await getListData({
                token: user.access_token,
                listName: acfDashboardType,
                // sorting: [
                //     {
                //         sortField: sorting[0].field,
                //         sortOrder: sorting[0].sort,
                //     },
                // ],
                // filters: value,
                pagination: paginationModel,
                // search: search,
            });
                setResponse(res);
        }

        getResponse();
    }, [user, acfDashboardType, paginationModel]);
    return (
        <PaginatedTable
            response={response}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
        />
    );
}