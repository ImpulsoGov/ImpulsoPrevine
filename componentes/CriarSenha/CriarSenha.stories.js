import React from 'react'
import { CriarSenha } from './index'

export default {
    title: "Componentes/CriarSenha",
    component: CriarSenha,
}
import axios from 'axios'
import FormData from "form-data";


const submit_cadastro = async (nome, mail,senha,cpf)=>{
  let data = new FormData();
  data.append('nome', nome);
  data.append('mail', mail);
  data.append('senha', senha);
  data.append('cpf', cpf);
  const config = {
    method: 'post',
    url: 'http://localhost:8000/suporte/usuarios/cadastro',
    headers: { 
      ...data.getHeaders()
    },
    data : data
  };
  
  return await axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

const submit_cadastro_ip = async(municipio,cargo,telefone,whatsapp,mail)=>{
  var data = new FormData();
  data.append('municipio', municipio);
  data.append('cargo', cargo);
  data.append('telefone', telefone);
  data.append('whatsapp', whatsapp);
  data.append('mail', mail);
  
  var config = {
    method: 'post',
    url: 'http://localhost:8000/suporte/usuarios/cadastro-ip',
    headers: { 
      ...data.getHeaders()
    },
    data : data
  };
  
  return await axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
  }



export const Default = () => {
    return <CriarSenha
                titulo= "Crie sua senha"
                campos={{
                    senha:"Crie sua senha",
                    ConfirmarSenha:"Digite sua senha novamente",
                }}
                button = {{label:"ENVIAR",link:""}}
                submitCadastro ={submit_cadastro}
                submitCadastroIP = {submit_cadastro_ip}
            
            />
}