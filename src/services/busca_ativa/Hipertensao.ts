import axios from "axios";
import { API_URL_DADOS_NOMINAIS } from "@constants/API_URL";
import type { TabelaResponse } from "@services/busca_ativa/Cito";

const tabelaHipertensaoEquipe = async (
    municipioIdSus: string, 
    equipe: string, 
    token: string
): Promise<TabelaResponse> => {
    const config = {
        method: "get",
        url: `${API_URL_DADOS_NOMINAIS}impulsoprevine/busca-ativa/hipertensao-por-equipe?municipio_id_sus=${municipioIdSus}&equipe=${equipe}`,
        headers: {
            authorization: `Bearer ${token}`,
        },
    };

    const res = axios
        .request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });

    return res;
};

const tabelaHipertensaoAPS = async (
    municipioIdSus: string, 
    token: string
): Promise<TabelaResponse> => {
    const config = {
        method: "get",
        url: `${API_URL_DADOS_NOMINAIS}impulsoprevine/busca-ativa/hipertensao-por-municipio?municipio_id_sus=${municipioIdSus}`,
        headers: {
            authorization: `Bearer ${token}`,
        },
    };

    const res = axios
        .request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });

    return res;
};

export { tabelaHipertensaoAPS, tabelaHipertensaoEquipe };
