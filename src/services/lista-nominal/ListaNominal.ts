import axios from "axios";

export type Sorting = {
    campo: string;
    ordem: string;
}[];

const addParams = (url: string, sorting?: Sorting, filters?: Record<string, string | string[]>) => {
    // Adiciona parâmetros de ordenação à URL
    if (sorting && sorting.length > 0) {
        const sortingParams = sorting.map(o => `sorting[${o.campo}]=${o.ordem}`).join('&');
        url += `?${sortingParams}`;
    }
    // Adiciona parâmetros de filtros à URL
    if (filters && Object.values(filters).reduce((acc, curr) => acc + curr.length, 0) !== 0) {
        const filtersParams = Object.entries(filters).map(([campo, valor]) => 
            Array.isArray(valor) ? valor.map(v => `filters[${campo}]=${v}`).join('&') : `filters[${campo}]=${valor}`
        ).join('&');
        url += sorting && sorting.length > 0 ? `&${filtersParams}` : `?${filtersParams}`;
    }
    return url;
};

export type getListDataProps = {
    municipio_id_sus: string;
    token: string;
    list: string;
    sorting?: Sorting;
    filters?:  Record<string, string | string[]>;
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
    const currentURL = new URL(window.location.href);
    let url = `${currentURL.origin}/api/lista-nominal/${list}/${municipio_id_sus}`;
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
