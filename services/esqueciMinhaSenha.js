import axios from "axios";
import { API_URL_USUARIOS } from "../constants/API_URL";
import FormData from "form-data";

const solicitarNovaSenhaClient = async(mail)=>{
  let data = new FormData();
  data.append('mail', mail);

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

const alterarSenhaClient = async(mail,codigo,nova_senha)=>{
  let data = new FormData();
  data.append('mail', mail);
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

const validarCodigoClient = async(mail,codigo)=>{
  let data = new FormData();
  data.append('mail', mail);
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


const solicitarNovaSenha = async(mail)=>{
  const res = await solicitarNovaSenhaClient(mail)
    if (res?.success == true) return true
    return false
}

const validarCodigo = async(mail,codigo)=>{
  const res = await validarCodigoClient(mail,codigo)
    if (res == true) return true
    return false
}

const alterarSenha = async(mail,codigo,nova_senha)=>{
  const res = await alterarSenhaClient(mail,codigo,nova_senha)
    if (res?.success == true) return true
    return false
}

export {solicitarNovaSenha,alterarSenha,validarCodigo}