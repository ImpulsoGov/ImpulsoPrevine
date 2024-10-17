import axios from "axios";
import { API_URL_USUARIOS } from "../../constants/API_URL";

const CadastrarUsuario = async (formData, token) => {
  let config = {
    method: 'post',
    url: API_URL_USUARIOS + 'suporte/usuarios/cadastro-lote-sem-ativacao',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    data: formData
  };
  const res = axios.request(config)
    .then((response) => {
      return {
        usuario: formData.get('nome'),
        success: !response?.data?.error,
        mensagem: response?.data?.mensagem ? response?.data?.mensagem : "Cadastro realizado com sucesso"
      };
    })
    .catch((error) => {
      return {
        usuario: formData.get('nome'),
        success: false,
        mensagem: error.response.data.detail
          ? JSON.stringify(error.response.data.detail)
          : JSON.stringify(error.response.data)
      };
    });

  return res;
};

export { CadastrarUsuario };
