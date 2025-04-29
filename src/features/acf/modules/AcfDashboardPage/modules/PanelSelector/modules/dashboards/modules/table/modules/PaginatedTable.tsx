import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";
import { getListData, type ListDataResponse } from "@/services/lista-nominal/ListaNominal";
import { Table } from "@impulsogov/design-system";
import type { GridPaginationModel } from "@mui/x-data-grid/models";
import type { AxiosResponse } from "axios";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { EmptyTableMessage } from "./EmptyTableMessage";
import { diabetesColumns } from "./diabetes/modules/columns/columns";

type PaginatedTableProps = {
    //TODO: Descomentar quando implementarmos cada funcionalidade
    // searchText: [],
    // filters: [],
    // sorting: GridSortModel,
    acfDashboardType: AcfDashboardType,
};

export const PaginatedTable = ({acfDashboardType}: PaginatedTableProps) => {
    const { data: session } = useSession();
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 8,
    });

    const [response, setResponse] = useState<AxiosResponse<ListDataResponse> | null >(null);
    const [user, setUser] = useState<Session["user"]>();

    // const sortModel = {};
    // const sorting = {};
    // const handleSortModelChange = {};

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

    if (response && response?.status !== 200){
        return <p style={{ textAlign: "center", padding: "20px" }}>
            Erro ao buscar dados, entre em contato com o suporte.      
        </p>
    }

    return (
        //TODO: Trocar diabetesColumns quando tivermos novas listas
        <Table
            columns={diabetesColumns}
            data={response?.data.data || []}
            rowHeight={60}
            paginationMode="server"
            // sortingMode="server"
            rowCount={response?.data.totalRows}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            // sortModel={DEFAULT_SORTING} //TODO: Mudar para o sorting recebido como prop quando implementarmos sorting
            // onSortModelChange={(_) => {}} //TODO: Mudar para a função recebida como prop quando implementarmos sorting
            isLoading={!response}
            slots={{ noRowsOverlay: EmptyTableMessage }}
            data-testid="list-table"
        />
    );
    

    
};