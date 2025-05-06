import { Table } from "@impulsogov/design-system";
import type { GridPaginationModel } from "@mui/x-data-grid";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";
import { diabetesColumns } from "./modules/diabetes/modules/columns/columns";
import { tableDataHook } from "./Table.hook";
import { useState } from "react";
import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";

type PaginatedTableProps = {
    acfDashboardType: AcfDashboardType;
}

export const PaginatedTable = ({
    acfDashboardType,
}: PaginatedTableProps) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 8,
    });
    const { data, status, isLoading } = tableDataHook(acfDashboardType, paginationModel);

    if (data && status !== 200 && data.totalRows !== undefined){
        return <p style={{ textAlign: "center", padding: "20px" }}>
            Erro ao buscar dados, entre em contato com o suporte.
        </p>
    }
    
    return (
        //TODO: Trocar diabetesColumns quando tivermos novas listas
            <Table
                columns={diabetesColumns}
                data={data?.data || []}
                rowHeight={60}
                paginationMode="server"
                // sortingMode="server"
                rowCount={data?.totalRows || 0}
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