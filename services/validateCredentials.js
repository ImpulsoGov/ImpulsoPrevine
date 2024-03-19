import axios from "axios";
import FormData from "form-data";
import { API_URL_USUARIOS } from "../constants/API_URL";
import mixpanel from "mixpanel-browser";


const validateCredentials = async (mail, senha) => {
  mixpanel.track('button_click', {
    'button_action': 'entrar_area_restitra_apos_senha',
  });

  let data = new FormData();
  data.append('username', mail);
  data.append('password', senha);

  var config = {
    method: 'post',
    url: API_URL_USUARIOS + 'suporte/usuarios/token',
    data: data
  };

  const res = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      mixpanel.track('validation_error', {
        'button_action': "entrar_area_restitra",
        'error_message': error.response.data,
        'login_flow' : "login",
      });
      return error.response.data
    });

  return res
}

const validacao = (setResposta, validarCredencial, entrar, mail, senha, setEsperandoResposta) => {
  const res = async () => await validarCredencial(mail, senha)
  if (mail.length < 1 || senha.length < 1) {
    const msg_campo_vazio = "Preencha todos os campos"
    setResposta(msg_campo_vazio)
    return msg_campo_vazio
  }else{
    res().then((response)=>{
      if (typeof(response["access_token"]) !== "undefined"){
        entrar('credentials', { redirect: true,username:mail, password: senha })
      }else{
        setResposta(response["detail"])
        setEsperandoResposta(false);
      }
      return res
    })
  }
}

export { validateCredentials, validacao }
