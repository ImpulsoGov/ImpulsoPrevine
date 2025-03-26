import axios from "axios";
import FormData from "form-data";
import { API_URL } from "../constants/API_URL";

const consultarAvaliacaoConclusaoClient = async (
    usuarioId,
    codigoConteudo,
    token,
) => {
    try {
        const data = new FormData();
        data.append("usuario_id", usuarioId);
        data.append("codigo_conteudo", codigoConteudo);
        const config = {
            method: "post",
            maxBodyLength: Number.POSITIVE_INFINITY,
            url:
                API_URL +
                "impulsoprevine/capacitacao/consulta-avaliacao-conclusao",
            headers: {
                Authorization: "Bearer " + token,
            },
            data: data,
        };
        const res = await axios(config)
            .then((response) => response.data)
            .catch((error) => error.response.data);
        return res;
    } catch (error) {
        return error;
    }
};

const consultarAvaliacaoConclusao = async (
    usuarioId,
    codigoConteudo,
    token,
) => {
    const res = await consultarAvaliacaoConclusaoClient(
        usuarioId,
        codigoConteudo,
        token,
    );
    if (res?.error == null) {
        if (res.data) if (res?.data.length > 0) return res.data;
    }
    return false;
};
const consultarAvaliacaoConclusaoPorUsuarioClient = async (
    usuarioId,
    token,
) => {
    try {
        const data = new FormData();
        data.append("usuario_id", usuarioId);
        const config = {
            method: "post",
            maxBodyLength: Number.POSITIVE_INFINITY,
            url:
                API_URL +
                "impulsoprevine/capacitacao/consulta-avaliacao-conclusao-por-usuario",
            headers: {
                Authorization: "Bearer " + token,
            },
            data: data,
        };
        const res = await axios(config)
            .then((response) => response.data)
            .catch((error) => error.response.data);
        return res;
    } catch (error) {
        return error;
    }
};

const consultarAvaliacaoConclusaoPorUsuario = async (usuarioId, token) => {
    const res = await consultarAvaliacaoConclusaoPorUsuarioClient(
        usuarioId,
        token,
    );
    if (res?.error == null) {
        if (typeof res?.data == "undefined") return res?.error;
        if (res?.data.length >= 0) return res.data;
    }
    return false;
};

async function avaliarConteudoClient(
    usuarioId,
    codigoConteudo,
    avaliacao,
    token,
) {
    const data = new FormData();
    data.append("usuario_id", usuarioId);
    data.append("codigo_conteudo", codigoConteudo);
    data.append("avaliacao", avaliacao);

    const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: API_URL + "impulsoprevine/capacitacao/avaliacao-conteudo",
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    };

    const res = await axios(config)
        .then((response) => response.data)
        .catch((error) => error.response.data);
    return res;
}
async function avaliarConteudo(usuarioId, codigoConteudo, avaliacao, token) {
    const res = await avaliarConteudoClient(
        usuarioId,
        codigoConteudo,
        avaliacao,
        token,
    );
    if (res?.error == null) return res;
    return false;
}
async function concluirConteudoClient(usuarioId, codigoConteudo, token) {
    const data = new FormData();
    data.append("usuario_id", usuarioId);
    data.append("codigo_conteudo", codigoConteudo);
    data.append("conclusao", "True");

    const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: API_URL + "impulsoprevine/capacitacao/conclusao-conteudo",
        headers: {
            Authorization: "Bearer " + token,
        },
        data: data,
    };

    const res = await axios(config)
        .then((response) => response.data)
        .catch((error) => error.response.data);
    return res;
}
async function concluirConteudo(usuarioId, codigoConteudo, token) {
    const res = await concluirConteudoClient(usuarioId, codigoConteudo, token);
    if (res?.error == null) return res;
    return false;
}

export {
    consultarAvaliacaoConclusao,
    concluirConteudo,
    avaliarConteudo,
    consultarAvaliacaoConclusaoPorUsuario,
};
