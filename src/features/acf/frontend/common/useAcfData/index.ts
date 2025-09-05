import type { AxiosError } from "axios";
import { isAxiosError, type AxiosResponse } from "axios";
import type { DispatchWithoutAction } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import type { AppliedFilters } from "../WithFilters";
import type { AcfResponse, DataResponses } from "@/features/acf/shared/schema";
import { useSession } from "next-auth/react";
import { FiltersContext } from "../WithFilters/context";
import type { SearchModel } from "../WithSearch";
import { SearchContext } from "../WithSearch";
import type { SortingModel } from "../WithSorting";
import { SortingContext } from "../WithSorting";
import type { GridSortItem } from "@mui/x-data-grid";

export type GetDataParams<TAppliedFilters extends AppliedFilters> = {
    token: string;
    sorting?: GridSortItem;
    filters?: TAppliedFilters;
    search?: string;
    page?: number;
};

export type ServiceGetData<
    TAppliedFilters extends AppliedFilters,
    TResponse extends DataResponses,
> = (
    params: GetDataParams<TAppliedFilters>
) => Promise<AxiosResponse<AcfResponse<TResponse>>>;

type Props<
    TAppliedFilters extends AppliedFilters,
    TResponse extends DataResponses,
> = {
    serviceGetData: ServiceGetData<TAppliedFilters, TResponse>;
    page?: number;
    resetPagination?: DispatchWithoutAction;
};

export const useAcfData = <
    TResponse extends DataResponses,
    TAppliedFilters extends AppliedFilters,
>({
    serviceGetData,
    page,
    resetPagination,
}: Props<TAppliedFilters, TResponse>): {
    response: AxiosResponse<AcfResponse<TResponse>> | null | AxiosError;
    isLoading: boolean;
} => {
    const { data: session } = useSession();
    const filtersContext = useContext<AppliedFilters | null>(FiltersContext);
    const filters = filtersContext as TAppliedFilters | null;
    const { gridSortingModel: sorting } =
        useContext<SortingModel>(SortingContext);
    const { searchString: search } = useContext<SearchModel>(SearchContext);
    const [response, setResponse] = useState<
        AxiosResponse<AcfResponse<TResponse>> | null | AxiosError
    >(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const shouldSkipNextFetchRef = useRef(false);

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
        setIsLoading(true);
        const getDataParams: GetDataParams<TAppliedFilters> = {
            token: session?.user.access_token || "",
            sorting,
            search,
            page,
            filters: filters || undefined,
        };
        serviceGetData(getDataParams)
            .then((res) => {
                setResponse(res);
                setIsLoading(false);
            })
            .catch((error: unknown) => {
                //TODO: generalizar esse error handling e reutilizar
                setIsLoading(false);
                if (isAxiosError(error)) {
                    setResponse(error);
                } else {
                    setResponse(null);
                }
                console.error(
                    `Erro ao buscar a página. Razão: ${String(error)}`
                );
            });
    }, [session, filters, sorting, search, page]);

    useEffect(() => {
        shouldSkipNextFetchRef.current = true;
        resetPagination?.();
    }, [filters, sorting, search]);
    return { response, isLoading };
};
