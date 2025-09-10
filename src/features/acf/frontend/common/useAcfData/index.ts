import type { AxiosError } from "axios";
import { isAxiosError, type AxiosResponse } from "axios";
import type { DispatchWithoutAction } from "react";
import { useContext, useEffect, useState } from "react";
import type { AppliedFilters } from "../WithFilters";
import type { AcfResponse, DataResponses } from "@/features/acf/shared/schema";
import { useSession } from "next-auth/react";
import { FiltersContext } from "../WithFilters/context";
import { SearchContext } from "../WithSearch";
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
    const filters = useContext(FiltersContext) as TAppliedFilters | null;
    const { gridSortingModel: sorting } = useContext(SortingContext);
    const { searchString: search } = useContext(SearchContext);
    const [response, setResponse] = useState<
        AxiosResponse<AcfResponse<TResponse>> | null | AxiosError
    >(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        resetPagination?.();
    }, [filters, sorting, search]);

    useEffect(() => {
        setIsLoading(true);
        const getDataParams = {
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
    return { response, isLoading };
};
