"use client";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { FiltersUi, SelectedValues } from "./model";
import type * as schema from "@/features/acf/diabetes/common/schema";
import type { GridSortItem } from "@mui/x-data-grid";

export type GetPageParams = {
    token: string;
    page: number;
    sorting: GridSortItem;
    filters: SelectedValues;
    // search?: string;
};

export const getPage = async ({
    token,
    page,
    sorting,
    filters,
    // search,
}: GetPageParams): Promise<AxiosResponse<schema.Response>> => {
    if (!token) throw new Error("Token de autenticação é obrigatório");
    const currentURL = new URL(window.location.href);
    const url = `${currentURL.origin}/api/lista-nominal/diabetes/pages/${page.toString()}`;
    const filtersRequest: FiltersUi = {
        ...filters,
        conditionIdentifiedBy:
            filters.conditionIdentifiedBy.length === 0
                ? []
                : [filters.conditionIdentifiedBy],
    };
    const body = { filters: filtersRequest, sorting: sorting };
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
