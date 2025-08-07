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
    TSchema,
> = (
    sorting: TSchema | null,
    filters: TAppliedFilters | null,
    search: string | null
) => TRequestBody;

export type GetPageParams<TAppliedFilters extends AppliedFilters, TSchema> = {
    token: string;
    page: number;
    sorting?: TSchema;
    filters?: TAppliedFilters;
    search?: string;
};

export type GetPage<
    TAppliedFilters extends AppliedFilters,
    TResponse,
    TSchema,
> = (
    params: GetPageParams<TAppliedFilters, TSchema>
) => Promise<AxiosResponse<TResponse>>;

export const getPageBuilder = <
    TRequestBody,
    TResponse,
    TAppliedFilters extends AppliedFilters,
    TSchema,
>(
    acfDashboardType: AcfDashboardType,
    coordinatorProfile: CoordinatorProfile,
    bodyBuilder: BodyBuilder<TAppliedFilters, TRequestBody, TSchema>
): GetPage<TAppliedFilters, TResponse, TSchema> => {
    return async ({
        page,
        sorting,
        filters,
        search,
        token,
    }: GetPageParams<TAppliedFilters, TSchema>): Promise<
        AxiosResponse<TResponse>
    > => {
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
