import axios from "axios";
import { API_URL_USUARIOS } from "../constants/API_URL";
import FormData from "form-data";

const verificarCPF = async(cpf)=>{
  let data = new FormData();
  data.append('cpf', cpf.replace(/\D/g, ''));

  let config = {
      method: 'post',
      url: API_URL_USUARIOS + 'suporte/ger_usuarios/validar-cpf',
      data : data
    };
  const res = await axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data
  });

  return res

}

const solicitarNovaSenha = async(cpf)=>{
  let data = new FormData();
  data.append('cpf', cpf);

  let config = {
      method: 'post',
      url: API_URL_USUARIOS + 'suporte/ger_usuarios/solicitar-nova-senha',
      data : data
    };
  const res = await axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data
  });

  return res

}

const alterarSenha = async(cpf,codigo,nova_senha)=>{
  let data = new FormData();
  data.append('cpf', cpf);
  data.append('codigo', codigo);
  data.append('nova_senha', nova_senha);

  let config = {
    method: 'post',
    url: API_URL_USUARIOS + 'suporte/ger_usuarios/alterar-senha',
    data : data
  };

  const res = await axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data;
  });

  return res

}

const validarCodigo = async(cpf,codigo)=>{
  let data = new FormData();
  data.append('cpf', cpf);
  data.append('codigo', codigo);

  let config = {
      method: 'post',
      url: API_URL_USUARIOS + 'suporte/ger_usuarios/validar-codigo',
      data : data
    };
  const res = await axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data
  });

  return res

}


export {solicitarNovaSenha,alterarSenha,validarCodigo, verificarCPF}