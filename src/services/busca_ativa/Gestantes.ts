import axios from "axios";
import { API_URL_DADOS_NOMINAIS } from "@constants/API_URL";
import type { TabelaResponse } from "@services/busca_ativa/Cito";

const tabelaGestantesEquipe = async (
    municipioIdSus: string,
    equipe: string,
    token: string
): Promise<TabelaResponse> => {
    const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `${API_URL_DADOS_NOMINAIS}impulsoprevine/busca-ativa/gestantes?municipio_id_sus=${municipioIdSus}&equipe=${equipe}`,
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
const tabelaGestantesAPS = async (
    municipioIdSus: string,
    token: string
): Promise<TabelaResponse> => {
    const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: `${API_URL_DADOS_NOMINAIS}impulsoprevine/busca-ativa/gestantes-coordenacao?municipio_id_sus=${municipioIdSus}`,
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

export { tabelaGestantesAPS, tabelaGestantesEquipe };
