import axios from "axios";
import FormData from "form-data";
import { API_URL_USUARIOS } from "../constants/API_URL";

const instance = axios.create({
    baseURL: `${API_URL_USUARIOS}suporte/ger_usuarios`,
});

export const listarPerfis = async (token) => {
    try {
        const response = await instance.get("/perfis", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error.response.data);
    }
};

export const listarUsuarios = async (token) => {
    try {
        const response = await instance.get("/usuarios-ip", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error.response.data);
    }
};

export const atualizarUsuario = async (id, dados, token) => {
    try {
        const requestData = {
            nome_usuario: dados.nome,
            mail: dados.mail,
            cpf: dados.cpf,
            municipio: dados.municipio,
            municipio_id_sus: dados.municipioIdSus,
            equipe: dados.equipe,
            cargo: dados.cargo,
            telefone: dados.telefone,
            perfil_ativo: dados.perfilAtivo,
        };

        const response = await instance.put(`/usuarios-ip/${id}`, requestData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(JSON.stringify(error.response.data.detail));
    }
};

export const atualizarAutorizacoes = async (
    usuarioId,
    autorizacoesIds,
    token,
) => {
    try {
        const requestData = { perfis_ids: autorizacoesIds };
        const response = await instance.put(
            `/perfil-usuario/${usuarioId}`,
            requestData,
            { headers: { Authorization: `Bearer ${token}` } },
        );

        return response.data;
    } catch (error) {
        throw new Error(JSON.stringify(error.response.data.detail));
    }
};

export const cadastrarUsuario = async (dados, token) => {
    try {
        const requestData = new FormData();

        requestData.append("nome_usuario", dados.nome);
        requestData.append("mail", dados.mail);
        requestData.append("cpf", dados.cpf);
        requestData.append("municipio", dados.municipio);
        requestData.append("municipio_id_sus", dados.municipioIdSus);
        requestData.append("equipe", dados.equipe);
        requestData.append("cargo", dados.cargo);
        requestData.append("telefone", dados.telefone);
        requestData.append("whatsapp", dados.whatsapp);

        const response = await instance.post("/usuarios-ip", requestData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(JSON.stringify(error.response.data.detail));
    }
};
