import { PanelSelector, CardAlert, TituloTexto, ButtonLight} from "@impulsogov/design-system";
import { useSession,signOut, getSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { DATA_STUDIO_URL_EQUIPE, DATA_STUDIO_URL_COORDENACAO_APS, DATA_STUDIO_URL_CADASTROS_EQUIPE, DATA_STUDIO_URL_CADASTROS_COORDENACAO_APS } from "../../../constants/dataStudio";
import { validatetoken} from "../../../services/validateToken"
import style from "../../duvidas/Duvidas.module.css"
import { redirectHome } from "../../../helpers/redirectHome";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const redirect = redirectHome(ctx,session)
  if(redirect) return redirect
  const res = [
    await getData(LAYOUT),
  ]
  return {
    props: {
      res : res
    }
  }
}
const genParamEquipe = (token,municipio_uf,equipe)=>{
  let params = {
    "token": token,
    "municipio_uf": municipio_uf,
    "equipe": equipe
  }
  var encodedParams = encodeURIComponent(JSON.stringify(params))
  return encodedParams
}

const urlGenBuscaAtivaEquipe = (data_studio,token,municipio_uf,equipe,cargo)=>{
  if (cargo == "Coordenação de Equipe" || cargo == "Impulser"){
    let baseURL = data_studio
    let param = genParamEquipe(token,municipio_uf,equipe)
    const link = baseURL  + param 
    return link
  }else{
    return ""
  }
}

const genParamCoordenacaoAPS = (token,municipio_uf)=>{
  let params = {
    "token": token,
    "municipio_uf": municipio_uf,
  }
  var encodedParams = encodeURIComponent(JSON.stringify(params))
  return encodedParams
}

const urlGenBuscaAtivaCoordenacaoAPS = (data_studio,token,municipio_uf,cargo)=>{
  if (cargo == "Coordenação APS" || cargo == "Impulser"){
    let baseURL = data_studio
    let param = genParamCoordenacaoAPS(token,municipio_uf)
    const link = baseURL  + param 
    return link
  }else{
    return ""
  }
}

const Index = ({res}) => {
  const { data: session,status } = useSession()
  const [tokenValido, setTokenValido] = useState();
  const router = useRouter()
  const panel = router.query?.painel
  const initialTitle = router.query?.initialTitle
  useEffect(()=>{
    if(session){
      validatetoken(session?.user?.access_token)
      .then(response=>{
        setTokenValido(response)
      }).catch(error=>{
        setTokenValido(false)
      })
      }
  })
  useEffect(()=>{
    if(session && session?.user?.access_token){
      if(tokenValido!=true && tokenValido!==undefined) signOut()
    }
  },[tokenValido])
  const titlesBuscaAtiva = [
    {
      label: "Indicadores Diabéticos",
    },
  ]

  if(session){
    const labelsBuscaAtiva = [[],[]]
    if(session.user.perfis.includes(8) || session.user.perfis.includes(5))  labelsBuscaAtiva[0].push({label: "Coordenação APS"})
    if(session.user.perfis.includes(9) || session.user.perfis.includes(5))  labelsBuscaAtiva[0].push({label: "Coordenação de Equipe"})
    const links = [[],[],[]]
    if (session.user.perfis.includes(8) || session.user.perfis.includes(5)) links[0].push(urlGenBuscaAtivaCoordenacaoAPS(DATA_STUDIO_URL_COORDENACAO_APS,session?.user?.access_token,session?.user?.municipio,session?.user?.cargo))
    if (session.user.perfis.includes(9) || session.user.perfis.includes(5)) links[0].push(urlGenBuscaAtivaEquipe(DATA_STUDIO_URL_EQUIPE,session?.user?.access_token,session?.user?.municipio,session?.user?.equipe,session?.user?.cargo))
   
    if (session.user.perfis.includes(8) || session.user.perfis.includes(5)) links[1].push(urlGenBuscaAtivaCoordenacaoAPS(DATA_STUDIO_URL_COORDENACAO_APS,session?.user?.access_token,session?.user?.municipio,session?.user?.cargo))
    if (session.user.perfis.includes(9) || session.user.perfis.includes(5)) links[1].push(urlGenBuscaAtivaEquipe(DATA_STUDIO_URL_EQUIPE,session?.user?.access_token,session?.user?.municipio,session?.user?.equipe,session?.user?.cargo))
   
    if (session.user.perfis.includes(8) || session.user.perfis.includes(5)) links[2].push(urlGenBuscaAtivaCoordenacaoAPS(DATA_STUDIO_URL_COORDENACAO_APS,session?.user?.access_token,session?.user?.municipio,session?.user?.cargo))
    if (session.user.perfis.includes(9) || session.user.perfis.includes(5)) links[2].push(urlGenBuscaAtivaEquipe(DATA_STUDIO_URL_EQUIPE,session?.user?.access_token,session?.user?.municipio,session?.user?.equipe,session?.user?.cargo))

    return (
      <>
        <div className={style.BotaoVoltar}>
        <ButtonLight icone={{posicao: 'right',
          url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
          label="VOLTAR" link="/inicio"/>
        </div>
        <TituloTexto
                titulo="Lista Nominal Diabéticos"
                texto="Oferecemos três listas nominais para monitoramento dos seguintes grupos: gestantes, pessoas com hipertensão e pessoas com diabetes. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos."
                imagem = {{posicao: null,url: ''}}
        />
        <CardAlert
              destaque="IMPORTANTE: "
              msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
          />  
        <PanelSelector
          links = {links}
          list={labelsBuscaAtiva}
          titles={titlesBuscaAtiva}
          panel={Number(panel)}
          initialTitle={Number(initialTitle)}
        />
      </>
    )
  }
  return(
    <p>{status}</p>
  )
}

export default Index;