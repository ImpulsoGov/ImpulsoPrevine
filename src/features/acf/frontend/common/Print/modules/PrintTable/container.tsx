"use client";
import type { AppliedFilters } from "@/features/acf/frontend/common/WithFilters";
import { FiltersContext } from "@/features/acf/frontend/common/WithFilters/context";
import { PrintTable } from "./presentation";
import type { Session } from "next-auth";
import type { AxiosError, AxiosResponse } from "axios";
import { isAxiosError } from "axios";
import type { GridColDef, GridSortItem } from "@mui/x-data-grid";
import {
    useContext,
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import { useSession } from "next-auth/react";
import type { SortingModel } from "@/features/acf/frontend/common/WithSorting";
import { SortingContext } from "@/features/acf/frontend/common/WithSorting";
import type { SearchModel } from "@/features/acf/frontend/common/WithSearch";
import { SearchContext } from "@/features/acf/frontend/common/WithSearch";
import type { PageResponses } from "@/features/acf/shared/schema";

type GetPageParams<TAppliedFilters extends AppliedFilters> = {
    token: string;
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
    searchString: string,
    filters: TAppliedFilters | null,
    serviceGetPage: ServiceGetPage<TAppliedFilters, TResponse>,
    setResponse: Dispatch<
        SetStateAction<AxiosResponse<TResponse> | AxiosError | null>
    >
): void => {
    if (!session?.user) {
        return;
    }

    const getPageParams = Object.assign(
        {
            token: session.user.access_token,
            sorting: {
                field: gridSortingModel.field,
                sort: gridSortingModel.sort,
            },
            search: searchString,
        },
        !filters ? {} : { filters: filters }
    );

    serviceGetPage(getPageParams)
        .then((res) => {
            setResponse(res);
        })
        .catch((error: unknown) => {
            //TODO: generalizar esse error handling e reutilizar
            if (isAxiosError(error)) {
                setResponse(error);
            }
            if (error instanceof Error) {
                setResponse(null);
                console.error(`Erro ao buscar a página. Razão: ${error}`);
            }
        });
};

type Props<
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
> = {
    columns: Array<GridColDef>;
    serviceGetPage: ServiceGetPage<TAppliedFilters, TResponse>;
};

export const Container = <
    TAppliedFilters extends AppliedFilters,
    TResponse extends PageResponses,
>({
    columns,
    serviceGetPage,
}: Props<TAppliedFilters, TResponse>): React.ReactNode => {
    const { data: session } = useSession();
    //TODO: adicionar um type guard aqui para garantir que o context é do tipo CoapsAppliedFilters
    const filtersContext = useContext<AppliedFilters | null>(FiltersContext);
    const filters = filtersContext as TAppliedFilters | null;
    const { gridSortingModel } = useContext<SortingModel>(SortingContext);
    const { searchString } = useContext<SearchModel>(SearchContext);
    const [response, setResponse] = useState<
        AxiosResponse<TResponse> | AxiosError | null
    >(null);

    useEffect(() => {
        fetchPage(
            session,
            gridSortingModel,
            searchString,
            filters,
            serviceGetPage,
            setResponse
        );
    }, [session, filters, gridSortingModel, searchString]);

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

    return <PrintTable {...props} key="print-table-child" />;
};
