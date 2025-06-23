"use client";
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
import type { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import {
    type Dispatch,
    type SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { coapsColumns } from "./consts";
import * as service from "./service";
import { FiltersContext } from "@/features/acf/frontend/common/WithFilters/context";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters/model";
import { EmptyTableMessage } from "../common/EmptyTableMessage";

import type { AppliedFiltersCoaps } from "./model";

export type { AppliedFiltersCoaps } from "./model";

const fetchPage = (
    session: Session | null,
    gridSortingModel: GridSortItem,
    gridPaginationModel: GridPaginationModel,
    searchString: string,
    filters: AppliedFiltersCoaps | null,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setResponse: Dispatch<
        SetStateAction<AxiosResponse<schema.PageResponse> | AxiosError | null>
    >
): void => {
    if (!session?.user) {
        return;
    }

    setIsLoading(true);

    const getCoapsPageParams = Object.assign(
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

    service
        .getCoapsPage(getCoapsPageParams)
        .then((res) => {
            setResponse(res);
            setIsLoading(false);
        })
        .catch((error: unknown) => {
            //TODO: generalizar esse error handling e reutilizar
            setIsLoading(false);
            if (error instanceof AxiosError) {
                setResponse(error);
            }
            if (error instanceof Error) {
                setResponse(null);
                console.error(`Erro ao buscar a página. Razão: ${error}`);
            }
        });
};

export const CoapsDataTable: React.FC = () => {
    const { data: session } = useSession();
    //TODO: adicionar um type guard aqui para garantir que o context é do tipo AppliedFiltersCoaps
    const filtersContext = useContext<AppliedFilters | null>(FiltersContext);
    const filters = filtersContext as AppliedFiltersCoaps | null;
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
            setIsLoading,
            setResponse
        );
    }, [session, gridPaginationModel, filters, gridSortingModel, searchString]);

    if (response instanceof AxiosError) {
        return (
            <p style={{ textAlign: "center", padding: "20px" }}>
                Erro ao buscar dados, entre em contato com o suporte.
            </p>
        );
    }

    return (
        <Table
            columns={coapsColumns}
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
