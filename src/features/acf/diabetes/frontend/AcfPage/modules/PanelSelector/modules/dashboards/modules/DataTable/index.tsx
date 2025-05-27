"use client";
import { useTableData } from "./hook";
import { Table } from "@impulsogov/design-system";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";
import { useContext } from "react";
import { FiltersContext } from "../WithFilters/context";
import type { SelectedValues } from "@/features/acf/diabetes/frontend/model";
import { PaginationContext } from "../WithPagination/context";
import type { PaginationModel } from "../WithPagination";
import type { SortingModel } from "../WithSorting";
import { diabetesColumns } from "./modules/columns";
import { SortingContext } from "../WithSorting/context";

export const DataTable: React.FC = () => {
    const filters = useContext<SelectedValues>(FiltersContext);
    const { gridPaginationModel, onPaginationModelChange } =
        useContext<PaginationModel>(PaginationContext);
    const { gridSortingModel, onSortingModelChange } =
        useContext<SortingModel>(SortingContext);
    const { data, status, isLoading } = useTableData(
        gridPaginationModel.page,
        filters,
        gridSortingModel
    );
    if (data && status !== 200) {
        return (
            <p style={{ textAlign: "center", padding: "20px" }}>
                Erro ao buscar dados, entre em contato com o suporte.
            </p>
        );
    }

    return (
        //TODO: Trocar diabetesColumns quando tivermos novas listas
        <Table
            columns={diabetesColumns}
            data={data?.page || []}
            rowHeight={60}
            paginationMode="server"
            sortingMode="server"
            rowCount={data?.totalRows || 0}
            paginationModel={gridPaginationModel}
            onPaginationModelChange={onPaginationModelChange}
            sortModel={[gridSortingModel]}
            onSortModelChange={onSortingModelChange}
            isLoading={isLoading}
            slots={{ noRowsOverlay: EmptyTableMessage }}
            data-testid="list-table"
        />
    );
};
