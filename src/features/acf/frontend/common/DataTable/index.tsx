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
import { Table } from "@impulsogov/design-system";
import type { GridPaginationModel, GridSortItem } from "@mui/x-data-grid";
import type { AxiosError, AxiosResponse } from "axios";
import { isAxiosError } from "axios";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, {
    type Dispatch,
    type SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { EmptyTableMessage } from "./modules/EmptyTableMessage";

import type { GridColDef } from "@mui/x-data-grid";
import type { PageResponses } from "@/features/acf/shared/schema";

export { getPageBuilder } from "./service";
export type { BodyBuilder, GetPageParams } from "./service";

type GetPageParams<TAppliedFilters extends AppliedFilters> = {
    token: string;
    page: number;
    sorting: GridSortItem;
    filters?: TAppliedFilters;
    search?: string;
};

export type ServiceGetPage<
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
> = (
    params: GetPageParams<TAppliedFilters>
) => Promise<AxiosResponse<TResponse>>;

const fetchPage = <
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
>(
    session: Session | null,
    gridSortingModel: GridSortItem,
    gridPaginationModel: GridPaginationModel,
    searchString: string,
    filters: TAppliedFilters | null,
    serviceGetPage: ServiceGetPage<TAppliedFilters, TResponse>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setResponse: Dispatch<
        SetStateAction<AxiosResponse<TResponse> | AxiosError | null>
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

type DataTableProps<
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
> = {
    columns: Array<GridColDef>;
    serviceGetPage: ServiceGetPage<TAppliedFilters, TResponse>;
};

export const DataTable = <
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
>({
    columns,
    serviceGetPage,
}: DataTableProps<TAppliedFilters, TResponse>): React.ReactNode => {
    const { data: session } = useSession();
    //TODO: adicionar um type guard aqui para garantir que o context é do tipo CoapsAppliedFilters
    const filtersContext = useContext<AppliedFilters | null>(FiltersContext);
    const filters = filtersContext as TAppliedFilters | null;
    const { gridPaginationModel, onPaginationModelChange, resetPagination } =
        useContext<PaginationModel>(PaginationContext);
    const { gridSortingModel, onSortingModelChange } =
        useContext<SortingModel>(SortingContext);
    const { searchString } = useContext<SearchModel>(SearchContext);
    const [response, setResponse] = useState<
        AxiosResponse<TResponse> | AxiosError | null
    >(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const shouldSkipNextFetchRef = useRef(false);
    useEffect(() => {
        shouldSkipNextFetchRef.current = true;
        resetPagination();
    }, [filters, gridSortingModel, searchString]);

    useEffect(() => {
        // TODO: essa implementação foi o jeito mais rápido que encontramos de evitar o bug em que
        // a fetchPage é chamada duas vezes com valores diferentes quando a paginação é resetada.
        // Precisamos pensar numa forma melhor de resolver esse problema sem usar a ref. Uma das
        // opções é mover a execução da resetPagination para dentro dos locais em que ela deve ser
        // chamada, como dentro do WithFilters, WithSorting e WithSearch.
        if (shouldSkipNextFetchRef.current) {
            shouldSkipNextFetchRef.current = false;
            return;
        }

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
            customSx={{
                "& .breakable-content": {
                    whiteSpace: "break-spaces",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                },
            }}
        />
    );
};
