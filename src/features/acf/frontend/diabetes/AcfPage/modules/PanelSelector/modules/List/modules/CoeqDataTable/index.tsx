"use client";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import { FiltersContext } from "@/features/acf/frontend/common/WithFilters";
import type { PaginationModel } from "@/features/acf/frontend/common/WithPagination";
import { PaginationContext } from "@/features/acf/frontend/common/WithPagination";
import {
    SearchContext,
    type SearchModel,
} from "@/features/acf/frontend/common/WithSearch";
import type { SortingModel } from "@/features/acf/frontend/common/WithSorting";
import { SortingContext } from "@/features/acf/frontend/common/WithSorting/context";
import { Table } from "@impulsogov/design-system";
import { useContext } from "react";
import { coeqColumns } from "./consts";
import { useTableData } from "./hook";
import type { AppliedFiltersCoeq } from "./model";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";

export type { AppliedFiltersCoaps, AppliedFiltersCoeq } from "./model";

export const CoeqDataTable: React.FC = () => {
    const filters = useContext<AppliedFilters | null>(FiltersContext);
    const { gridPaginationModel, onPaginationModelChange, resetPagination } =
        useContext<PaginationModel>(PaginationContext);
    const { gridSortingModel, onSortingModelChange } =
        useContext<SortingModel>(SortingContext);
    const { searchString } = useContext<SearchModel>(SearchContext);

    const { data, status, isLoading } = useTableData(
        gridPaginationModel.page,
        filters as AppliedFiltersCoeq | null, //TODO: Esse cast é um tanto quanto chato. Será que tem como evitar?
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
        <Table
            columns={coeqColumns}
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
