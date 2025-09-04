import { type AxiosResponse } from "axios";
import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect, useState } from "react";
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

type FetchDataParams<
    TAppliedFilters extends AppliedFilters,
    TResponse extends DataResponses,
> = GetDataParams<TAppliedFilters> & {
    serviceGetData: ServiceGetData<TAppliedFilters, TResponse>;
    setResponse: Dispatch<
        SetStateAction<AxiosResponse<AcfResponse<TResponse>> | null>
    >;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const fetchData = <
    TAppliedFilters extends AppliedFilters,
    TResponse extends DataResponses,
>({
    serviceGetData,
    setResponse,
    setIsLoading,
    ...getDataParams
}: FetchDataParams<TAppliedFilters, TResponse>): void => {
    setIsLoading(true);

    serviceGetData(getDataParams)
        .then((res) => {
            setResponse(res);
            setIsLoading(false);
        })
        .catch((error: unknown) => {
            //TODO: generalizar esse error handling e reutilizar
            setIsLoading(false);
            setResponse(null);
            console.error(`Erro ao buscar a página. Razão: ${String(error)}`);
        });
};

type Props<
    TAppliedFilters extends AppliedFilters,
    TResponse extends DataResponses,
> = {
    serviceGetData: ServiceGetData<TAppliedFilters, TResponse>;
    page?: number;
};

export const useAcfData = <
    TResponse extends DataResponses,
    TAppliedFilters extends AppliedFilters,
>({
    serviceGetData,
    page,
}: Props<TAppliedFilters, TResponse>): {
    response: AxiosResponse<AcfResponse<TResponse>> | null;
    isLoading: boolean;
} => {
    const { data: session } = useSession();
    const filtersContext = useContext<AppliedFilters | null>(FiltersContext);
    const filters = filtersContext as TAppliedFilters | null;
    const { gridSortingModel: sorting } =
        useContext<SortingModel>(SortingContext);
    const { searchString: search } = useContext<SearchModel>(SearchContext);
    const [response, setResponse] = useState<AxiosResponse<
        AcfResponse<TResponse>
    > | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getDataParams: GetDataParams<TAppliedFilters> = {
        token: session?.user.access_token || "",
        sorting,
        search,
        page,
        filters: filters || undefined,
    };

    useEffect(() => {
        fetchData({
            ...getDataParams,
            serviceGetData,
            setResponse,
            setIsLoading,
        });
    }, [session, filters, sorting, search, page]);

    return { response, isLoading };
};
