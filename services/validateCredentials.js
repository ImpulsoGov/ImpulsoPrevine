import axios from "axios";
import FormData from "form-data";
import { API_URL } from "../constants/API_URL";


const validateCredentials = async(mail,senha)=>{
    let data = new FormData();
    data.append('username', mail);
    data.append('password', senha);
    
    var config = {
        method: 'post',
        url: API_URL + 'suporte/usuarios/token',
        data : data
    };
    
    const res = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data
    });

    console.log(res)
    return res
}

const validacao = (setResposta,validarCredencial,entrar,mail,senha)=>{
  const res = async()=> await validarCredencial(mail,senha)
  res().then((response)=>{
    console.log(response)
    if (typeof(response["access_token"]) !== "undefined"){
        entrar('credentials', { redirect: true,username:mail, password: senha })
    }else{
        setResposta(response["detail"])
    }
    return res
  })
}

export {validateCredentials,validacao}
