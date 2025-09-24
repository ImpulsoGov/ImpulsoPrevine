"use client";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters/model";
import type { PaginationModel } from "@/features/acf/frontend/common/WithPagination";
import { PaginationContext } from "@/features/acf/frontend/common/WithPagination";
import type { SortingModel } from "@/features/acf/frontend/common/WithSorting";
import { SortingContext } from "@/features/acf/frontend/common/WithSorting/context";
import { Table } from "@/features/acf/frontend/common/Table";
import { isAxiosError } from "axios";
import React, { useContext } from "react";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";
import type { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import type { DataResponses, PageResponse } from "@/features/acf/shared/schema";
import type { ServiceGetData } from "../useAcfData";
import { useAcfData } from "../useAcfData";
import type { SystemStyleObject } from "@mui/system";

export { getPageBuilder } from "./service";
export type { BodyBuilder } from "./service";

type DataTableProps<
    TAppliedFilters extends AppliedFilters,
    TResponse extends DataResponses,
> = {
    columns: Array<GridColDef>;
    columnGroupingModel?: GridColumnGroupingModel;
    serviceGetPage: ServiceGetData<TAppliedFilters, TResponse>;
    customSx?: SystemStyleObject;
};
export const DataTable = <
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponse,
>({
    columns,
    columnGroupingModel,
    serviceGetPage,
    customSx,
}: DataTableProps<TAppliedFilters, TResponse>): React.ReactNode => {
    const { gridPaginationModel, onPaginationModelChange, resetPagination } =
        useContext<PaginationModel>(PaginationContext);
    const { gridSortingModel, onSortingModelChange } =
        useContext<SortingModel>(SortingContext);

    const { response, isLoading } = useAcfData({
        serviceGetData: serviceGetPage,
        page: gridPaginationModel.page,
        resetPagination: resetPagination,
    });

    if (isAxiosError(response)) {
        return (
            <p
                data-testid="error-message"
                style={{ textAlign: "center", padding: "20px" }}
            >
                Erro ao buscar dados, entre em contato com o suporte.
            </p>
        );
    }

    return (
        <Table
            columns={columns}
            data={response?.data.page || []}
            paginationMode="server"
            sortingMode="server"
            rowCount={response?.data.totalRows || 0}
            paginationModel={gridPaginationModel}
            onPaginationModelChange={onPaginationModelChange}
            sortModel={[gridSortingModel]}
            onSortModelChange={onSortingModelChange}
            isLoading={isLoading}
            slots={{ noRowsOverlay: EmptyTableMessage }}
            data-testid="list-table"
            columnGroupingModel={columnGroupingModel}
            customSx={customSx}
        />
    );
};
