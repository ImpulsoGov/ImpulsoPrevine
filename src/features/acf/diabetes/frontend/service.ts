"use client";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Filters, FiltersUI } from "../common/model";
import type * as schema from "@/features/acf/diabetes/common/schema";

export type GetPageParams = {
    token: string;
    page: number;
    // sorting?: SortingItem[];
    filters: FiltersUI;
    // search?: string;
};


export const getPage = async ({
    token,
    page, 
    // sorting,
    filters,
    // search,
}: GetPageParams): Promise<AxiosResponse<schema.Response>> => {
    if (!token) throw new Error("Token de autenticação é obrigatório");
    const currentURL = new URL(window.location.href);
    const url = `${currentURL.origin}/api/lista-nominal/diabetes/pages/${page}`;
    console.log("filters", filters);
    const filtersRequest: Filters = {
        ...filters,
        conditionIdentifiedBy : filters.conditionIdentifiedBy.length === 0 ? [] : [filters.conditionIdentifiedBy]
    }
    const body = {filters: filtersRequest}
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