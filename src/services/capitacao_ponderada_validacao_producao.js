import axios from "axios";
import { API_URL_DADOS_PUBLICOS } from "../constants/API_URL";

const ValidacaoProducao = async (municipioUf) => {
    const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url:
            API_URL_DADOS_PUBLICOS +
            `impulsoprevine/capitacao-ponderada/validacao-producao?municipio_uf=${municipioUf}`,
    };
    const res = await axios(config)
        .then((response) => response.data)
        .catch((error) => error.response.data);
    return res;
};

export { ValidacaoProducao };
