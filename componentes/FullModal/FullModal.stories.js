import React from 'react'
import { FullModal } from './index'
import { Cadastro } from '../Cadastro'
import { Login } from '../Login'
import { CriarSenha } from '../CriarSenha'

export default {
    title: "Componentes/FullModal",
    component: FullModal,
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


const cadastro = <Cadastro
                    titulo= "Cadastro do município"
                    campos={[
                            {label:"Nome Completo"},
                            {label:"Municipio"},
                            {label:"Cargo"},
                            {label:"E-mail"},
                            {label:"(DDD) Telefone"},
                        ]}
                        button = {{label:"Próximo",link:""}}
                        submitCadastro ={submit_cadastro}
                        submitCadastroIP = {submit_cadastro_ip}
        
                />

const senha = <CriarSenha
                titulo= "Crie sua senha"
                campos={{
                    senha:"Crie sua senha",
                    ConfirmarSenha:"Digite sua senha novamente",
                }}
                button = {{label:"enviar",link:""}}
                />              

const login = <Login
                titulo= "Faça o login para ver o painel de busca ativa"
                campos={[
                    {label:"E-mail"},
                    {label:"Senha"},
                ]}
                button = {{label:"entrar",link:""}}
            />                

const children = [cadastro, senha]

export const CadastroMunicipio = () => {
    return <FullModal
                logo="https://media.graphassets.com/b8gtgIBS0ylOa0zlD9wT?_gl=1*hmdi2k*_ga*MzY0MzkwNjMwLjE2NTg1OTU1NjU.*_ga_G6FYGSYGZ4*MTY2NDg5MTgyMC43Ny4xLjE2NjQ4OTcyODQuMjkuMC4w"
                back="https://media.graphassets.com/mRR3uFHeQeW8SG0qYSIY?_gl=1*15r7evo*_ga*MzY0MzkwNjMwLjE2NTg1OTU1NjU.*_ga_G6FYGSYGZ4*MTY2NDg5MTgyMC43Ny4xLjE2NjQ4OTcyODQuMjkuMC4w"
                backLink="/"
                children={children}
            />
}

export const ControleAcesso= () => {
    return <FullModal
                logo="https://media.graphassets.com/b8gtgIBS0ylOa0zlD9wT?_gl=1*hmdi2k*_ga*MzY0MzkwNjMwLjE2NTg1OTU1NjU.*_ga_G6FYGSYGZ4*MTY2NDg5MTgyMC43Ny4xLjE2NjQ4OTcyODQuMjkuMC4w"
                back="https://media.graphassets.com/mRR3uFHeQeW8SG0qYSIY?_gl=1*15r7evo*_ga*MzY0MzkwNjMwLjE2NTg1OTU1NjU.*_ga_G6FYGSYGZ4*MTY2NDg5MTgyMC43Ny4xLjE2NjQ4OTcyODQuMjkuMC4w"
                backLink="/"
                children={[login]}
            />
}

export const CriarPrimeiraSenha= () => {
    return <FullModal
                logo="https://media.graphassets.com/b8gtgIBS0ylOa0zlD9wT?_gl=1*hmdi2k*_ga*MzY0MzkwNjMwLjE2NTg1OTU1NjU.*_ga_G6FYGSYGZ4*MTY2NDg5MTgyMC43Ny4xLjE2NjQ4OTcyODQuMjkuMC4w"
                back="https://media.graphassets.com/mRR3uFHeQeW8SG0qYSIY?_gl=1*15r7evo*_ga*MzY0MzkwNjMwLjE2NTg1OTU1NjU.*_ga_G6FYGSYGZ4*MTY2NDg5MTgyMC43Ny4xLjE2NjQ4OTcyODQuMjkuMC4w"
                backLink="/"
                children={[children[0]]}
            />
}