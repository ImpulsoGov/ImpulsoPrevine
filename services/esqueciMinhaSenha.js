import axios from "axios";
import { API_URL_USUARIOS } from "../constants/API_URL";
import FormData from "form-data";
import mixpanel from "mixpanel-browser";

const verificarCPF = async(cpf)=>{
  mixpanel.track('button_click', {
    'button_action': 'proximo_inseriu_cpf',
    'login_flow': 'esqueceu_senha'
  });

  let data = new FormData();
  data.append('cpf', cpf.replace(/\D/g, ''));

  let config = {
      method: 'post',
      url: API_URL_USUARIOS + 'suporte/ger_usuarios/validar-cpf',
      data : data
    };
  const res = await axios(config)
  .then(function (response) {
    !response.data.success &&
    mixpanel.track('validation_error', {
      'button_action': "proximo_inseriu_cpf",
      'error_message': response.data.mensagem,
      'login_flow' : "esqueceu_senha",
    });
    return response.data;
  })
  .catch(function (error) {
    return error.response.data
  });

  return res

}

const solicitarNovaSenha = async(cpf)=>{
  mixpanel.track('button_click', {
    'button_action': 'enviar_codigo_telefone',
    'login_flow': 'esqueceu_senha'
  });

  let data = new FormData();
  data.append('cpf', cpf);

  let config = {
      method: 'post',
      url: API_URL_USUARIOS + 'suporte/ger_usuarios/solicitar-nova-senha',
      data : data
    };
  const res = await axios(config)
  .then(function (response) {
    !response.data.success &&
    mixpanel.track('validation_error', {
      'button_action': "proximo_enviar_codigo_telefone",
      'error_message': response.data.mensagem,
      'login_flow' : "esqueceu_senha",
    });
    return response.data;
  })
  .catch(function (error) {
    return error.response.data
  });

  return res

}

const alterarSenha = async(cpf,codigo,nova_senha)=>{
  mixpanel.track('button_click', {
    'button_action': 'proximo_criou_senha',
    'login_flow': 'esqueceu_senha'
  });

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
    !response.data.success &&
    mixpanel.track('validation_error', {
      'button_action': "proximo_criou_senha",
      'error_message': response.data.mensagem,
      'login_flow' : "esqueceu_senha",
    });
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