"use client";
import { FiltersContext } from "@/features/acf/frontend/common/WithFilters/context";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters/model";
import type { PaginationModel } from "@/features/acf/frontend/common/WithPagination";
import { PaginationContext } from "@/features/acf/frontend/common/WithPagination";
import {
    SearchContext,
    type SearchModel,
} from "@/features/acf/frontend/common/WithSearch";
import type { SortingModel } from "@/features/acf/frontend/common/WithSorting";
import { SortingContext } from "@/features/acf/frontend/common/WithSorting/context";
import type * as schema from "@/features/acf/shared/diabetes/schema";
import { Table } from "@impulsogov/design-system";
import type { GridPaginationModel, GridSortItem } from "@mui/x-data-grid";
import type { AxiosResponse, AxiosError } from "axios";
import { isAxiosError } from "axios";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, {
    type Dispatch,
    type SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";

import type { GridColDef } from "@mui/x-data-grid";

export { getPageBuilder } from "./service";
export type { GetPageParams, BodyBuilder } from "./service";

type GetPageParams<TAppliedFilters extends AppliedFilters> = {
    token: string;
    page: number;
    sorting: GridSortItem;
    filters?: TAppliedFilters;
    search?: string;
};

//TODO: Incluir TResponse aqui e usar no lugar de schema.PageResponse
type ServiceGetPage<TAppliedFilters extends AppliedFilters> = (
    params: GetPageParams<TAppliedFilters>
) => Promise<AxiosResponse<schema.PageResponse>>;

const fetchPage = <TAppliedFilters extends AppliedFilters>(
    session: Session | null,
    gridSortingModel: GridSortItem,
    gridPaginationModel: GridPaginationModel,
    searchString: string,
    filters: TAppliedFilters | null,
    serviceGetPage: ServiceGetPage<TAppliedFilters>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setResponse: Dispatch<
        SetStateAction<AxiosResponse<schema.PageResponse> | AxiosError | null>
    >
): void => {
    if (!session?.user) {
        return;
    }

    setIsLoading(true);

    const getPageParams = Object.assign(
        {
            token: session.user.access_token,
            sorting: {
                field: gridSortingModel.field,
                sort: gridSortingModel.sort,
            },
            page: gridPaginationModel.page,
            search: searchString,
        },
        !filters ? {} : { filters: filters }
    );

    serviceGetPage(getPageParams)
        .then((res) => {
            setResponse(res);
            setIsLoading(false);
        })
        .catch((error: unknown) => {
            //TODO: generalizar esse error handling e reutilizar
            setIsLoading(false);
            if (isAxiosError(error)) {
                setResponse(error);
            }
            if (error instanceof Error) {
                setResponse(null);
                console.error(`Erro ao buscar a página. Razão: ${error}`);
            }
        });
};

type DataTableProps<TAppliedFilters extends AppliedFilters> = {
    columns: Array<GridColDef>;
    serviceGetPage: ServiceGetPage<TAppliedFilters>;
};

export const DataTable = <TAppliedFilters extends AppliedFilters>({
    columns,
    serviceGetPage,
}: DataTableProps<TAppliedFilters>): React.ReactNode => {
    const { data: session } = useSession();
    //TODO: adicionar um type guard aqui para garantir que o context é do tipo AppliedFiltersCoaps
    const filtersContext = useContext<AppliedFilters | null>(FiltersContext);
    const filters = filtersContext as TAppliedFilters | null;
    const { gridPaginationModel, onPaginationModelChange, resetPagination } =
        useContext<PaginationModel>(PaginationContext);
    const { gridSortingModel, onSortingModelChange } =
        useContext<SortingModel>(SortingContext);
    const { searchString } = useContext<SearchModel>(SearchContext);
    const [response, setResponse] = useState<
        AxiosResponse<schema.PageResponse> | AxiosError | null
    >(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        resetPagination();
    }, [filters, gridSortingModel, searchString]);

    useEffect(() => {
        fetchPage(
            session,
            gridSortingModel,
            gridPaginationModel,
            searchString,
            filters,
            serviceGetPage,
            setIsLoading,
            setResponse
        );
    }, [session, gridPaginationModel, filters, gridSortingModel, searchString]);

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
            rowHeight={60}
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
        />
    );
};
