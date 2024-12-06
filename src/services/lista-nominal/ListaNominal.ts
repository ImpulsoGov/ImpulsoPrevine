import axios from "axios";
import { baseURL } from "@/utils/baseURL";

export type Ordenacao = {
    campo: string;
    ordem: string;
}[];

export type Filtros = {
    campo: string;
    valor: string[];
}[];

const addParams = (url: string, ordenacao?: Ordenacao, filtros?: Filtros) => {
    // Adiciona parâmetros de ordenação à URL
    if (ordenacao && ordenacao.length > 0) {
        const ordenacaoParams = ordenacao.map(o => `ordenacao[${o.campo}]=${o.ordem}`).join('&');
        url += `?${ordenacaoParams}`;
    }
    // Adiciona parâmetros de filtros à URL
    if (filtros && filtros.length > 0) {
        const filtrosParams = filtros.map(f => f.valor.map(v => `filtros[${f.campo}]=${v}`).join('&')).join('&');
        url += ordenacao && ordenacao.length > 0 ? `&${filtrosParams}` : `?${filtrosParams}`;
    }
    return url;
};

type DadosProps = {
    municipio_id_sus: string;
    token: string;
    lista: string;
    ordenacao?: Ordenacao;
    filtros?: Filtros;
    equipe?: string;
};

export const buscarDadosLista = async ({
    municipio_id_sus,
    token,
    lista,
    ordenacao,
    filtros,
    equipe
}: DadosProps) => {
    let url = `${baseURL()}/lista-nominal/${lista}/${municipio_id_sus}`;
    if (equipe) url += `/${equipe}`;
    const urlWithParams = addParams(url, ordenacao, filtros);
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
