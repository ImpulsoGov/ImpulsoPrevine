import axios from "axios";
import { baseURL } from "@/utils/baseURL";
import type { AxiosResponse } from "axios";
import type { GridSortDirection } from '@mui/x-data-grid';

export interface SortingItem {
  sortField: string;
  sortOrder: GridSortDirection;
}

export interface FilterItem {
  fieldName: string;
  fieldValue: string[];
}

export type Pagination = {
  page: number;
  pageSize: number;
}

const buildSortingParams = (sorting: SortingItem[]): string => {
  return sorting
    .map(item => `sortBy=${item.sortField}:${item.sortOrder}`)
    .join('&');
};
const buildFilterParams = (filters: FilterItem[]): string => {
  return filters
    .map(filter => 
      filter.fieldValue
        .map(value => `filters[${filter.fieldName}]=${value}`)
        .join('&')
    )
    .join('&');
};

const buildPaginationParam = (pagination: Pagination): string => {
  return `paginacao[pagina]=${pagination.page}&paginacao[tamanho]=${pagination.pageSize}`;
}

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
    pagination?: Pagination;
    listName: string,
    ine?: string,
    municipio_id_sus: string
  }
): string => {
  let url = baseUrl;
  const { sorting, filters, listName, ine, municipio_id_sus, pagination } = params || {};
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
  if (pagination?.page && pagination?.pageSize) {
    const prefix = url.includes('?') ? '&' : '?';
    url += `${prefix}${buildPaginationParam(pagination)}`;
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
  pagination?: Pagination;
};

export type ListDataResponse = {
  data: Record<string, string | number | Date>[];
  totalRows: number;
}

export const getListData = async ({
  municipio_id_sus,
  token,
  listName,
  sorting,
  filters,
  ine,
  pagination,
}: getListDataProps): Promise<AxiosResponse<ListDataResponse>> => {
  if (!token) throw new Error('Token de autenticação é obrigatório');
  if (!municipio_id_sus) throw new Error('ID do município é obrigatório');
  if (!listName) throw new Error('Tipo de lista é obrigatório');

  const url = `${baseURL()}/lista-nominal`;
  const urlWithParams = buildUrlWithParams(url, { sorting, filters, listName, ine, municipio_id_sus, pagination });
  return axios.request({
    method: 'get',
    maxBodyLength: Number.POSITIVE_INFINITY,
    url: urlWithParams,
    headers: {
        'Authorization': `Bearer ${token}`
    }
  });
};
