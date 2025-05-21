'use client'
import { useTableData } from "./hook";
import { Table } from "@impulsogov/design-system";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";
import { useContext } from 'react';
import { FiltersContext } from "../WithFilters/context";
import type { SelectedValues } from "@/features/acf/diabetes/frontend/model";
import { PaginationContext } from "../WithPagination/context";
import type { PaginationModel } from "../WithPagination";
import { diabetesColumns } from "./modules/columns";

export const DataTable = () => {
    const filters = useContext<SelectedValues>(FiltersContext);
    const paginationModel = useContext<PaginationModel>(PaginationContext);
    const { data, status, isLoading } = useTableData(paginationModel.gridPaginationModel.page, filters);
    if (data && status !== 200 && data.totalRows !== undefined){
        return <p style={{ textAlign: "center", padding: "20px" }}>
            Erro ao buscar dados, entre em contato com o suporte.
        </p>
    }
    
    return (
        //TODO: Trocar diabetesColumns quando tivermos novas listas
        <Table
            columns={diabetesColumns}
            data={data?.page || []}
            rowHeight={60}
            paginationMode="server"
            // sortingMode="server"
            rowCount={data?.totalRows || 0}
            paginationModel={paginationModel.gridPaginationModel}
            onPaginationModelChange={paginationModel.onPaginationModelChange}
            // sortModel={DEFAULT_SORTING} //TODO: Mudar para o sorting recebido como prop quando implementarmos sorting
            // onSortModelChange={(_) => {}} //TODO: Mudar para a função recebida como prop quando implementarmos sorting
            isLoading={isLoading}
            slots={{ noRowsOverlay: EmptyTableMessage }}
            data-testid="list-table"
        />
    );
};