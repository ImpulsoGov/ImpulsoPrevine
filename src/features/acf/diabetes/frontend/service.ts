"use client";
import type * as schema from "@/features/acf/diabetes/common/schema";
import type { GridSortItem } from "@mui/x-data-grid";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { FiltersUi, SelectedFilterValuesCoeq } from "./model";

//TODO: Este arquivo deveria estar colocalizado com a DataTable
export type GetPageParams = {
    token: string;
    page: number;
    sorting: GridSortItem;
    filters: SelectedFilterValuesCoeq;
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
    //TODO: Ver o erro que tá rolando aqui no conditionIdentifiedBy
    const filtersRequest: FiltersUi = {
        ...filters,
        conditionIdentifiedBy:
            filters.conditionIdentifiedBy === ""
                ? []
                : [filters.conditionIdentifiedBy],
    };
    const body = {
        filters: filtersRequest,
        sorting: sorting,
        search: search,
    } as schema.CoeqPageRequestBody;
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
