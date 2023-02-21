import { PanelSelector} from "@impulsogov/design-system";
import { useSession,signOut } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData } from '../../services/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { DATA_STUDIO_URL_EQUIPE, DATA_STUDIO_URL_COORDENACAO_APS, DATA_STUDIO_URL_CADASTROS_EQUIPE, DATA_STUDIO_URL_CADASTROS_COORDENACAO_APS } from "../../constants/dataStudio";
import { validatetoken} from "../../services/validateToken"

export async function getServerSideProps({req}) {
  let redirect 
  const userIsActive = req.cookies['next-auth.session-token']
  const userIsActiveSecure = req.cookies['__Secure-next-auth.session-token']
  if(userIsActive){
    redirect=true
  }else{
      if(userIsActiveSecure){redirect=true}else{redirect=false}
  }
  if(!redirect) {
    return {
      redirect: {
        destination: "/",
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      }, 
    }
  }
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
        console.log("tokenValido",tokenValido)
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
      label: "Indicadores Gestantes",
    },
  ]

  if(session){
    const labelsBuscaAtiva = [[],[]]
    if(session.user?.cargo == "Coordenação APS" || session.user?.cargo == "Impulser")  labelsBuscaAtiva[0].push({label: "Coordenação APS"})
    if(session.user?.cargo == "Coordenação de Equipe" || session.user?.cargo == "Impulser")  labelsBuscaAtiva[0].push({label: "Coordenação de Equipe"})
    const links = [[],[]]
    if (session.user?.cargo == "Coordenação APS" || session.user?.cargo == "Impulser") links[0].push(urlGenBuscaAtivaCoordenacaoAPS(DATA_STUDIO_URL_COORDENACAO_APS,session?.user?.access_token,session?.user?.municipio,session?.user?.cargo))
    if (session.user?.cargo == "Coordenação de Equipe" || session.user?.cargo == "Impulser") links[0].push(urlGenBuscaAtivaEquipe(DATA_STUDIO_URL_EQUIPE,session?.user?.access_token,session?.user?.municipio,session?.user?.equipe,session?.user?.cargo))
    return (
      <>
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