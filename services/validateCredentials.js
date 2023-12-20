import axios from "axios";
import FormData from "form-data";
import { API_URL_USUARIOS } from "../constants/API_URL";


const validateCredentials = async (mail, senha) => {
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
      console.log(error)
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
<<<<<<< HEAD
  }else{
    res().then((response)=>{
      if (typeof(response["access_token"]) !== "undefined"){
        entrar('credentials', { redirect: true,username:mail, password: senha })
      }else{
=======
  } else {
    res().then((response) => {
      console.log(response)
      if (typeof (response["access_token"]) !== "undefined") {
        entrar('credentials', { redirect: true, username: mail, password: senha })
      } else {
>>>>>>> 2f1afba7ed2abb463ebf29936a5572b50a903e26
        setResposta(response["detail"])
        setEsperandoResposta(false);
      }
      return res
    })
  }
}

export { validateCredentials, validacao }
