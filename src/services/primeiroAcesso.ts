import axios from "axios";
import { API_URL_USUARIOS } from "../constants/API_URL";
import FormData from "form-data";
import mixpanel from "mixpanel-browser";

const verificarCPFPrimeiroAcesso = async(cpf : string)=>{
  mixpanel.track('button_click', {
    'button_action': 'proximo_inseriu_cpf',
    'login_flow': 'primeiro_acesso'
  });

  const data = new FormData();
  data.append('cpf', cpf.replace(/\D/g, ''));
  
  const config = {
    method: 'post',
    url: API_URL_USUARIOS + 'suporte/ger_usuarios/validar-cpf-primeiro-acesso',
    data : data
  };

  const res = await axios(config)
  .then(function (response) {
    if(!response.data.success){
    mixpanel.track('validation_error', {
      'button_action': "proximo_inseriu_cpf",
      'error_message': response.data.mensagem,
      'login_flow' : "primeiro_acesso",
    })};
    return response.data;
  })
  .catch(function (error) {  
    return error.response.data
  });
  return res
}    

const primeiroAcesso = async(cpf: string)=>{
  mixpanel.track('button_click', {
    'button_action': 'enviar_codigo_telefone',
    'login_flow': 'primeiro_acesso'
  });

  const data = new FormData();
  data.append('cpf', cpf.replace(/\D/g, ''));
  
  const config = {
    method: 'post',
    url: API_URL_USUARIOS + 'suporte/ger_usuarios/primeiro-acesso',
    data : data
  };
  
  const res = await axios(config)
  .then(function (response) {
    if(!response.data.success){
    mixpanel.track('validation_error', {
      'button_action': "proximo_inseriu_codigo_telefone",
      'error_message': response.data.mensagem,
      'login_flow' : "primeiro_acesso",
    })};
    return response.data;
  })
  .catch(function (error) {
      return error.response.data
  });
  return res
}    
  
  const criarSenha = async(cpf : string,codigo : string,nova_senha : string)=>{
    mixpanel.track('button_click', {
      'button_action': 'proximo_criou_senha',
      'login_flow': 'primeiro_acesso'
    });

    const data = new FormData();
    data.append('cpf', cpf);
    data.append('codigo', codigo);
    data.append('nova_senha', nova_senha);
  
    const config = {
      method: 'post',
      url: API_URL_USUARIOS + 'suporte/ger_usuarios/criar-senha',
      data : data
    };
  
    const res = await axios(config)
    .then(function (response) {
      if(response.data.success){
      mixpanel.track('validation_error', {
        'button_action': "proximo_criou_senha",
        'error_message': response.data.mensagem,
        'login_flow' : "primeiro_acesso",
      })};
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
  
    return res
  
  }
  
export { verificarCPFPrimeiroAcesso,primeiroAcesso,criarSenha}