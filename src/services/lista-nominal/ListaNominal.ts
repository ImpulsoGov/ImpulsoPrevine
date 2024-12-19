import { getParamPrefix } from "@/utils/urlParams";
import axios from "axios";
import { baseURL } from "@/utils/baseURL";

export type Sorting = {
    field?: string;
    sort?: 'asc' | 'desc' | null;
}[];

export type Filters = {
    campo: string;
    valor: string[];
}[];

    let finalUrl = url;
    // Adiciona parâmetros de ordenação à URL
    if (sorting && sorting.length > 0) {
        const sortingParams = sorting.map(o => `ordenacao=${o.field}:${o.sort}`).join('&');
        finalUrl += `${getParamPrefix(finalUrl)}${sortingParams}`;
    }
    // Adiciona parâmetros de filtros à URL
    if (filters && filters.length > 0) {
        const filtersParams = filters.map(f => f.valor.map(v => `filtros[${f.campo}]=${v}`).join('&')).join('&');
        finalUrl += `${getParamPrefix(finalUrl)}${filtersParams}`;
    }
    return finalUrl;
};

export type getListDataProps = {
    municipio_id_sus: string;
    token: string;
    list: string;
    sorting?: Sorting;
    filters?: Filters;
    ine?: string;
};

export const getListData = async ({
    municipio_id_sus,
    token,
    list,
    sorting,
    filters,
    ine
}: getListDataProps) => {
    let url = `${baseURL()}/lista-nominal/${list}/${municipio_id_sus}`;
    if (ine) url += `/${ine}`;
    const urlWithParams = addParams(url, sorting, filters);
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: urlWithParams,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    return axios.request(config);
};
