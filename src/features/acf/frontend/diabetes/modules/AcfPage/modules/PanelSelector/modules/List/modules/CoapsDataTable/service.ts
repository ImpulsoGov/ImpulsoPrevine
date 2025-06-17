"use client";
import type * as schema from "@/features/acf/shared/diabetes/schema";
import type { GridSortItem } from "@mui/x-data-grid";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { AppliedFiltersCoaps } from "./model";

const toRequestFilters = (
    filters: AppliedFiltersCoaps
): schema.CoapsFilters => {
    return {
        ...filters,
        conditionIdentifiedBy:
            filters.conditionIdentifiedBy === ""
                ? []
                : [filters.conditionIdentifiedBy],
    };
};

export type GetPageParams = {
    token: string;
    page: number;
    sorting: GridSortItem;
    filters?: AppliedFiltersCoaps;
    search?: string;
};

export const getCoapsPage = async ({
    token,
    page,
    sorting,
    filters,
    search,
}: GetPageParams): Promise<AxiosResponse<schema.PageResponse>> => {
    if (!token) throw new Error("Token de autenticação é obrigatório");
    const currentURL = new URL(window.location.href);
    const url = `${currentURL.origin}/api/lista-nominal/diabetes/pages/coaps/${page.toString()}`;
    const body = Object.assign(
        {
            sorting: sorting,
            search: search,
        },
        !filters ? {} : { filters: toRequestFilters(filters) }
    ) as schema.CoapsPageRequestBody;

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
