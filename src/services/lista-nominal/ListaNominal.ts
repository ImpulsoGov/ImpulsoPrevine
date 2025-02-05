import axios from "axios";
import type { AxiosResponse } from "axios";
import type { GridSortDirection } from '@mui/x-data-grid';

export interface SortingItem {
  sortField: string;
  sortOrder: GridSortDirection;
}

export type FilterItem = Record<string, string | string[]>;

export type Pagination = {
  page: number;
  pageSize: number;
}

const buildSortingParams = (sorting: SortingItem[]): string => {
  return `sortBy=${sorting
    .map(item => `${item.sortField}:${item.sortOrder}`)
    .join(',')}`;
};
const buildFilterParams = (filters: FilterItem): string => {
    return Object.entries(filters)
        .flatMap(([fieldName, fieldValue]) => 
            (Array.isArray(fieldValue) ? fieldValue : [fieldValue])
                .map(value => `filters[${fieldName}]=${value}`)
        )
        .join('&');
};

const buildPaginationParams = (pagination: Pagination): string => {
  const { page, pageSize } = pagination;
  return `pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
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
    filters?: FilterItem,
    pagination?: Pagination;
    listName: string,
    ine?: string,
    municipio_id_sus: string,
    search?: string;
  }
): string => {
  let url = baseUrl;
  const { sorting, filters, listName, ine, municipio_id_sus, pagination, search } = params || {};
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
  if (pagination?.page !== undefined && pagination?.pageSize !== undefined) {
    const prefix = url.includes('?') ? '&' : '?';
    url += `${prefix}${buildPaginationParams(pagination)}`;
  }
  if (search && search.length > 0) {
    const prefix = url.includes('?') ? '&' : '?';
    url += `${prefix}search=${encodeURIComponent(search)}`;
  }
  return url;
};  

export type getListDataProps = {
  municipio_id_sus: string;
  token: string;
  listName: string;
  sorting?: SortingItem[];
  filters?: FilterItem;
  ine?: string;
  pagination?: Pagination;
  search?: string;
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
  search
}: getListDataProps): Promise<AxiosResponse<ListDataResponse>> => {
  if (!token) throw new Error('Token de autenticação é obrigatório');
  if (!municipio_id_sus) throw new Error('ID do município é obrigatório');
  if (!listName) throw new Error('Tipo de lista é obrigatório');

  const currentURL = new URL(window.location.href);
  const url = `${currentURL.origin}/api/lista-nominal`;
  const urlWithParams = buildUrlWithParams(url, { sorting, filters, listName, ine, municipio_id_sus, pagination, search });

  return axios.request({
    method: 'get',
    maxBodyLength: Number.POSITIVE_INFINITY,
    url: urlWithParams,
    headers: {
        'Authorization': `Bearer ${token}`
    }
  });
};
