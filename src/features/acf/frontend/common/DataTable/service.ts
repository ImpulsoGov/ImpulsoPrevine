"use client";
import { acfDashboardMap } from "../AcfDashboard";
import { type AcfDashboardType } from "../AcfDashboard";
import type { GridSortItem } from "@mui/x-data-grid";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { AppliedFilters } from "../WithFilters";
import type { GetDataParams } from "../useAcfData";

//TODO: rever este tipo
type CoordinatorProfile = "coaps" | "coeq";

export type BodyBuilder<
    TAppliedFilters extends AppliedFilters,
    TRequestBody,
> = (
    sorting: GridSortItem | null,
    filters: TAppliedFilters | null,
    search: string | null
) => TRequestBody;

export type GetPage<TAppliedFilters extends AppliedFilters, TResponse> = (
    params: GetDataParams<TAppliedFilters>
) => Promise<AxiosResponse<TResponse>>;

export const getPageBuilder = <
    TRequestBody,
    TResponse,
    TAppliedFilters extends AppliedFilters,
>(
    acfDashboardType: keyof AcfDashboardType,
    coordinatorProfile: CoordinatorProfile,
    bodyBuilder: BodyBuilder<TAppliedFilters, TRequestBody>
): GetPage<TAppliedFilters, TResponse> => {
    return async ({
        page = 0,
        sorting,
        filters,
        search,
        token,
    }: GetDataParams<TAppliedFilters>): Promise<AxiosResponse<TResponse>> => {
        if (!token) throw new Error("Token de autenticação é obrigatório");
        const currentURL = new URL(window.location.href);
        const url = `${currentURL.origin}/api/cofin25/indicadores/${acfDashboardMap[acfDashboardType].toLowerCase()}/${coordinatorProfile}/dados/pagina/${page.toString()}`;
        const body = bodyBuilder(
            sorting || null,
            filters || null,
            search || null
        );

        return axios.request({
            method: "POST",
            maxBodyLength: Number.POSITIVE_INFINITY,
            url: url,
            data: body,
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
    };
};
