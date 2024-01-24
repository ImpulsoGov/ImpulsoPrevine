import axios from "axios";
import { API_URL } from "../../constants/API_URL";

const CadastrarUsuario = async (formData, token) => {
  let config = {
    method: 'post',
    url: API_URL + 'suporte/usuarios/cadastro-lote-sem-ativacao',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    data: formData
  };
  const res = axios.request(config)
    .then((response) => {
      return { usuario: formData.get('nome'), success: response?.data?.error, erro: response?.data?.mensagem ? response?.data?.mensagem : "Cadastro realizado com sucesso" };
    })
    .catch((error) => {
      return { success: false, error: error.response.data };
    });

  return res;
};

export { CadastrarUsuario };
