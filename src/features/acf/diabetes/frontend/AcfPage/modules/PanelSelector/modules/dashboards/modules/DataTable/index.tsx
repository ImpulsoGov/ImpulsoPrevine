"use client";
import type { SelectedFilterValues } from "@/features/acf/diabetes/frontend/model";
import { Table } from "@impulsogov/design-system";
import { useContext } from "react";
import { FiltersContext } from "../WithFilters/context";
import type { PaginationModel } from "../WithPagination";
import { PaginationContext } from "../WithPagination/context";
import { SearchContext, type SearchModel } from "../WithSearch/context";
import type { SortingModel } from "../WithSorting";
import { SortingContext } from "../WithSorting/context";
import { useTableData } from "./hook";
import { diabetesColumns } from "./modules/columns";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";

export const DataTable: React.FC = () => {
    const filters = useContext<SelectedFilterValues>(FiltersContext);
    const { gridPaginationModel, onPaginationModelChange, resetPagination } =
        useContext<PaginationModel>(PaginationContext);
    const { gridSortingModel, onSortingModelChange } =
        useContext<SortingModel>(SortingContext);
    const { searchString } = useContext<SearchModel>(SearchContext);
    const { data, status, isLoading } = useTableData(
        gridPaginationModel.page,
        filters,
        gridSortingModel,
        searchString,
        resetPagination
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
