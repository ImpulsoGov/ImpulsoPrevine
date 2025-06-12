"use client";
import type * as schema from "@/features/acf/diabetes/common/schema";
import type { GridSortItem } from "@mui/x-data-grid";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { SelectedFilterValuesCoeq } from "./model";

function toRequestFilters(
    filters: SelectedFilterValuesCoeq
): schema.CoeqFilters {
    return {
        ...filters,
        conditionIdentifiedBy:
            filters.conditionIdentifiedBy === ""
                ? []
                : [filters.conditionIdentifiedBy],
    };
}

export type GetPageParams = {
    token: string;
    page: number;
    sorting: GridSortItem;
    filters?: SelectedFilterValuesCoeq;
    search?: string;
};

export const getCoeqPage = async ({
    token,
    page,
    sorting,
    filters,
    search,
}: GetPageParams): Promise<AxiosResponse<schema.CoeqPageResponse>> => {
    if (!token) throw new Error("Token de autenticação é obrigatório");
    const currentURL = new URL(window.location.href);
    const url = `${currentURL.origin}/api/lista-nominal/diabetes/pages/${page.toString()}`;
    const body = Object.assign(
        {
            sorting: sorting,
            search: search,
        },
        !filters ? {} : { filters: toRequestFilters(filters) }
    ) as schema.CoeqPageRequestBody;

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
