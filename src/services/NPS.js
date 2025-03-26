import axios from "axios";
import FormData from "form-data";
import { API_URL } from "../constants/API_URL";

async function NPSConsultaClient(usuarioId, token) {
    const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: API_URL + "suporte/nps/consulta?user_id=" + usuarioId,
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const res = await axios(config)
        .then((response) => response.data)
        .catch((error) => error.response.data);
    return res;
}
async function NPSConsulta(usuarioId, token) {
    const res = await NPSConsultaClient(usuarioId, token);
    if (res.length > 0) return true;
    return false;
}
async function NPSAvaliacaoClient(usuarioId, avaliacao, token) {
    const data = new FormData();
    data.append("user_id", usuarioId);
    data.append("avaliacao", avaliacao);
    const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: API_URL + "suporte/nps/avaliacao",
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    };

    const res = await axios(config)
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            return error.response.data;
        });
    return res;
}
async function NPSAvaliacao(args) {
    const res = await NPSAvaliacaoClient(args.user, args.avaliacao, args.token);
    if (res?.error != null) return res;
    return false;
}

export { NPSConsulta, NPSAvaliacao };
