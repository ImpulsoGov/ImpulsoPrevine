import axios from "axios";
import FormData from "form-data";
import { API_URL } from "../constants/API_URL";

const instance = axios.create({
  baseURL: `${API_URL}suporte/ger_usuarios`,
});

export const listarPerfis = async () => {
  try {
    const response = await instance.get('/perfis');

    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const listarUsuarios = async () => {
  try {
    const response = await instance.get('/usuarios-ip');

    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const atualizarUsuario = async (id, dados) => {
  try {
    const requestData = new FormData();

    requestData.append('nome_usuario', dados.nome);
    requestData.append('mail', dados.mail);
    requestData.append('cpf', dados.cpf);
    requestData.append('municipio', dados.municipio);
    requestData.append('equipe', dados.equipe);
    requestData.append('cargo', dados.cargo);
    requestData.append('telefone', dados.telefone);

    const response = await instance.put(`/usuarios-ip/${id}`, requestData);

    return response.data;
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data.detail));
  }
};

export const atualizarAutorizacoes = async (usuarioId, autorizacoesIds) => {
  try {
    const requestData = { perfis_ids: autorizacoesIds };
    const response = await instance.put(
      `/perfil-usuario/${usuarioId}`,
      requestData
    );

    return response.data;
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data.detail));
  }
};

export const cadastrarUsuario = async (dados) => {
  try {
    const requestData = new FormData();

    requestData.append('nome_usuario', dados.nome);
    requestData.append('mail', dados.mail);
    requestData.append('cpf', dados.cpf);
    requestData.append('municipio', dados.municipio);
    requestData.append('equipe', dados.equipe);
    requestData.append('cargo', dados.cargo);
    requestData.append('telefone', dados.telefone);
    requestData.append('whatsapp', dados.whatsapp);

    const response = await instance.post('/usuarios-ip', requestData);

    return response.data;
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data.detail));
  }
};
