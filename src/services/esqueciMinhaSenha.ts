import axios from "axios";
import { API_URL_USUARIOS } from "../constants/API_URL";
import FormData from "form-data";
import mixpanel from "mixpanel-browser";

export const verificarCPF = async(cpf : string)=>{
  mixpanel.track('button_click', {
    'button_action': 'proximo_inseriu_cpf',
    'login_flow': 'esqueceu_senha'
  });

  const data = new FormData();
  data.append('cpf', cpf.replace(/\D/g, ''));

  const config = {
      method: 'post',
      url: API_URL_USUARIOS + 'suporte/ger_usuarios/validar-cpf',
      data : data
    };
  const res = await axios(config)
  .then(function (response) {
    if(!response.data.success){
    mixpanel.track('validation_error', {
      'button_action': "proximo_inseriu_cpf",
      'error_message': response.data.mensagem,
      'login_flow' : "esqueceu_senha",
    })};
    return response.data;
  })
  .catch(function (error) {
    return error.response.data
  });

  return res

}

export const solicitarNovaSenha = async(cpf : string)=>{
  mixpanel.track('button_click', {
    'button_action': 'enviar_codigo_telefone',
    'login_flow': 'esqueceu_senha'
  });

  const data = new FormData();
  data.append('cpf', cpf);

  const config = {
      method: 'post',
      url: API_URL_USUARIOS + 'suporte/ger_usuarios/solicitar-nova-senha',
      data : data
    };
  const res = await axios(config)
  .then(function (response) {
    if(!response.data.success){
    mixpanel.track('validation_error', {
      'button_action': "proximo_enviar_codigo_telefone",
      'error_message': response.data.mensagem,
      'login_flow' : "esqueceu_senha",
    })};
    return response.data;
  })
  .catch(function (error) {
    return error.response.data
  });

  return res

}

export const alterarSenha = async(cpf : string,codigo : string,nova_senha : string)=>{
  mixpanel.track('button_click', {
    'button_action': 'proximo_criou_senha',
    'login_flow': 'esqueceu_senha'
  });

  const data = new FormData();
  data.append('cpf', cpf);
  data.append('codigo', codigo);
  data.append('nova_senha', nova_senha);

  const config = {
    method: 'post',
    url: API_URL_USUARIOS + 'suporte/ger_usuarios/alterar-senha',
    data : data
  };

  const res = await axios(config)
  .then(function (response) {
    if(!response.data.success){
    mixpanel.track('validation_error', {
      'button_action': "proximo_criou_senha",
      'error_message': response.data.mensagem,
      'login_flow' : "esqueceu_senha",
    })};
    return response.data;
  })
  .catch(function (error) {
    return error.response.data;
  });

  return res

}

export const validarCodigo = async(cpf : string,codigo : string)=>{
  const data = new FormData();
  data.append('cpf', cpf);
  data.append('codigo', codigo);

  const config = {
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