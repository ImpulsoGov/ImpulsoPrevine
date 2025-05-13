"use client";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { RequestBody } from "../../common/diabetes/schema";

type FilterItem = Record<string, string | string[]>;
type Pagination = {
    page: number;
    pageSize: number;
};
export type GetPageParams = {
    token: string;
    // sorting?: SortingItem[];
    pagination: Pagination;
    filters: FilterItem;
    // search?: string;
};

const buildRequestBody = (filters: FilterItem, pagination: Pagination): RequestBody => {
    return {
        filters: {
            municipalitySusID: filters.municipality_sus_id?,
            teamIne: filters.teamIne,


        },
        pagination: pagination,
    }
}

export const getPage = async ({
    token,
    // sorting,
    filters,
    pagination,
    // search,
}: GetPageParams): Promise<AxiosResponse<Response>> => {
    if (!token) throw new Error("Token de autenticação é obrigatório");
    const currentURL = new URL(window.location.href);
    const url = `${currentURL.origin}/api/lista-nominal/diabetes/query`;
    const body = buildRequestBody(pagination, filters);
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