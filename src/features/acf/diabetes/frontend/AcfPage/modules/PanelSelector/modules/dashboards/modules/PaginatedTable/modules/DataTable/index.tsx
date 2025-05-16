'use client'
import type { GridPaginationModel } from "@mui/x-data-grid";
import type { Dispatch, SetStateAction, } from "react";
import { tableDataHook } from "./DataTable.hook";
import { diabetesColumns } from "./modules/diabetes/modules/columns/columns";
import { Table } from "@impulsogov/design-system";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";
import { useContext } from 'react';
import { FiltersContext } from "../../../TableWithFilters/TableWithFilters.context";
import type { FiltersUI } from "@/features/acf/diabetes/common/model";
import type { AcfDashboardType } from "@/features/acf/diabetes/common/types";

type TableProps = {
    acfDashboardType: AcfDashboardType;
    paginationModel: GridPaginationModel;
    onPaginationModelChange: Dispatch<SetStateAction<GridPaginationModel>>
}

export const DataTable = ({
    paginationModel,
    onPaginationModelChange,
}: TableProps) => {
    const filters = useContext<FiltersUI>(FiltersContext);
    const { data, status, isLoading } = tableDataHook(paginationModel.page, filters);
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
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            // sortModel={DEFAULT_SORTING} //TODO: Mudar para o sorting recebido como prop quando implementarmos sorting
            // onSortModelChange={(_) => {}} //TODO: Mudar para a função recebida como prop quando implementarmos sorting
            isLoading={isLoading}
            slots={{ noRowsOverlay: EmptyTableMessage }}
            data-testid="list-table"
        />
    );
};