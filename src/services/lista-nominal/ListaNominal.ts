import type { DiabetesAcfItem } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/table/modules/diabetes/DiabetesAcfItem.model";
import type { GridSortDirection } from "@mui/x-data-grid";
import axios from "axios";
import type { AxiosResponse } from "axios";

export interface SortingItem {
    sortField: string;
    sortOrder: GridSortDirection;
}

export type FilterItem = Record<string, string | string[]>;

export type Pagination = {
    page: number;
    pageSize: number;
};

const buildSortingParams = (sorting: SortingItem[]): string => {
    return `sortBy=${sorting
        .map((item) => `${item.sortField}:${item.sortOrder}`)
        .join(",")}`;
};
const buildFilterParams = (filters?: FilterItem): string => {
    if (!filters) return "";
    let filterParams = "filters=";
    for (const [key, value] of Object.entries(filters)) {
        if (Array.isArray(value) && value.length > 0) {
            filterParams += `${key}:${value.join(",")};`; // Usa .join(",") para evitar a última vírgula
        } else if (typeof value === "string" && value.length > 0) {
            filterParams += `${key}:${value};`;
        }
    }
    return filterParams;
};

const buildPaginationParams = (pagination: Pagination): string => {
    const { page, pageSize } = pagination;
    return `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
};
export const isFilterApplied = (filters: FilterItem | undefined): boolean => {
    if (!filters) return false;
    const filterApplied = Object.values(filters).map(
        (value: string | string[]) => {
            if (Array.isArray(value) && value.length > 0) return true;
            if (typeof value === "string" && value.length > 0) return true;
            return false;
        },
    );
    return filterApplied.some((value) => value);
};

/**
 * Adds sorting and filtering parameters to a URL
 * @param baseUrl - Base URL to add parameters to
 * @param params - Object containing sorting, filter parameters, listName, ine, and municipio_id_sus
 * @returns URL with added query parameters
 */
export const buildUrlWithParams = (
    baseUrl: string,
    params?: {
        sorting?: SortingItem[];
        filters?: FilterItem;
        pagination?: Pagination;
        listName: string;
        search?: string;
    },
): string => {
    let url = baseUrl;
    const { sorting, filters, listName, pagination, search } = params || {};

    if (listName) url += `/${listName}`;

    if (sorting?.length) url += `?${buildSortingParams(sorting)}`;

    if (isFilterApplied(filters)) {
        const prefix = url.includes("?") ? "&" : "?";
        url += `${prefix}${buildFilterParams(filters)}`;
    }
    if (pagination?.page !== undefined && pagination?.pageSize !== undefined) {
        const prefix = url.includes("?") ? "&" : "?";
        url += `${prefix}${buildPaginationParams(pagination)}`;
    }
    if (search && search.length > 0) {
        const prefix = url.includes("?") ? "&" : "?";
        url += `${prefix}search=${encodeURIComponent(search)}`;
    }
    return url;
};

export type GetListDataProps = {
    token: string;
    listName: string;
    sorting?: SortingItem[];
    filters?: FilterItem;
    pagination?: Pagination;
    search?: string;
};

export type ListDataResponse = {
    data: DiabetesAcfItem[];
    totalRows: number;
};

export const getListData = async ({
    token,
    listName,
    // sorting,
    // filters,
    // pagination,
    // search,
}: GetListDataProps): Promise<AxiosResponse<ListDataResponse>> => {
    if (!token) throw new Error("Token de autenticação é obrigatório");
    if (!listName) throw new Error("Tipo de lista é obrigatório");

    const currentURL = new URL(window.location.href);
    const url = `${currentURL.origin}/api/lista-nominal/${listName}`;
    // const urlWithParams = buildUrlWithParams(url, {
    //     sorting,
    //     filters,
    //     listName,
    //     pagination,
    //     search,
    // });

    return axios.request({
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};
