import type { ListDataResponse } from "@/services/lista-nominal/ListaNominal";
import { Table } from "@impulsogov/design-system";
import type { GridPaginationModel } from "@mui/x-data-grid";
import type { AxiosResponse } from "axios";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";
import { diabetesColumns } from "./modules/diabetes/modules/columns/columns";

export const PaginatedTable = ({
    response,
    paginationModel,
    setPaginationModel,
    isLoading
}:{
    response: AxiosResponse<ListDataResponse> | null,
    paginationModel: GridPaginationModel,
    setPaginationModel: (model: GridPaginationModel) => void,
    isLoading: boolean,
}) => {
    if (response && response.status !== 200 && response.data.totalRows !== undefined){
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
            rowCount={response?.data.totalRows || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            // sortModel={DEFAULT_SORTING} //TODO: Mudar para o sorting recebido como prop quando implementarmos sorting
            // onSortModelChange={(_) => {}} //TODO: Mudar para a função recebida como prop quando implementarmos sorting
            isLoading={isLoading}
            slots={{ noRowsOverlay: EmptyTableMessage }}
            data-testid="list-table"
        />
    );
};