"use client";
import type { AcfDashboardType } from "../DashboardType";
import type { GridSortItem } from "@mui/x-data-grid";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { AppliedFilters } from "../WithFilters";

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

export type GetPageParams<TAppliedFilters extends AppliedFilters> = {
    token: string;
    page: number;
    sorting?: GridSortItem;
    filters?: TAppliedFilters;
    search?: string;
};

export type GetPage<TAppliedFilters extends AppliedFilters, TResponse> = (
    params: GetPageParams<TAppliedFilters>
) => Promise<AxiosResponse<TResponse>>;

export const getPageBuilder = <
    TRequestBody,
    TResponse,
    TAppliedFilters extends AppliedFilters,
>(
    acfDashboardType: AcfDashboardType,
    coordinatorProfile: CoordinatorProfile,
    bodyBuilder: BodyBuilder<TAppliedFilters, TRequestBody>
): GetPage<TAppliedFilters, TResponse> => {
    return async ({
        page,
        sorting,
        filters,
        search,
        token,
    }: GetPageParams<TAppliedFilters>): Promise<AxiosResponse<TResponse>> => {
        if (!token) throw new Error("Token de autenticação é obrigatório");
        const currentURL = new URL(window.location.href);
        const url = `${currentURL.origin}/api/lista-nominal/${acfDashboardType.toLowerCase()}/pages/${coordinatorProfile}/${page.toString()}`;
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
