import axios from "axios";
import { baseURL } from "@/utils/baseURL";

export interface SortingItem {
    campo: string;
    ordem: 'asc' | 'desc';
  }

export interface FilterItem {
    campo: string;
    valor: string[];
}

const buildSortingParams = (sorting: SortingItem[]): string => {
    return sorting
      .map(item => `sortBy[${item.campo}]=${item.ordem}`)
      .join('&');
};
const buildFilterParams = (filters: FilterItem[]): string => {
    return filters
      .map(filter => 
        filter.valor
          .map(value => `filters[${filter.campo}]=${value}`)
          .join('&')
      )
      .join('&');
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
      sorting?: SortingItem[],
      filters?: FilterItem[],
      listName: string,
      ine?: string,
      municipio_id_sus: string
    }
  ): string => {
    let url = baseUrl;
    const { sorting, filters, listName, ine, municipio_id_sus } = params || {};
    if (listName) {
      url += `/${listName}`;
    }
    if (municipio_id_sus) {
      url += `/${municipio_id_sus}`;
    }
    if (ine) {
      url += `/${ine}`;
    }
    if (sorting?.length) {
      url += `?${buildSortingParams(sorting)}`;
    }
    if (filters?.length) {
      const prefix = url.includes('?') ? '&' : '?';
      url += `${prefix}${buildFilterParams(filters)}`;
    }
    return url;
  };  

export type getListDataProps = {
    municipio_id_sus: string;
    token: string;
    listName: string;
    sorting?: SortingItem[];
    filters?: FilterItem[];
    ine?: string;
};

export const getListData = async ({
    municipio_id_sus,
    token,
    listName,
    sorting,
    filters,
    ine
}: getListDataProps) => {
    const url = `${baseURL()}/lista-nominal`;
    const urlWithParams = buildUrlWithParams(url, { sorting, filters, listName, ine, municipio_id_sus });
    return axios.request({
      method: 'get',
      maxBodyLength: Number.POSITIVE_INFINITY,
      url: urlWithParams,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
};