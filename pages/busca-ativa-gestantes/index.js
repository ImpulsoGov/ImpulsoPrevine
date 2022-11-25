import { PanelSelector} from "@impulsogov/design-system";
import { useSession,signOut } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { getData } from '../../utils/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { DATA_STUDIO_URL_EQUIPE, DATA_STUDIO_URL_COORDENACAO_APS } from "../../constants/dataStudio";
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

const StaticLinksAPS = [
  {
    municipio : "Três Marias - MG",
    painel : "https://datastudio.google.com/embed/reporting/bdcd085d-d6f8-4c3c-99ba-e111c9fb0aba/page/p_kl3q988fyc"
  },
  {
    municipio : "Juquitiba - SP",
    painel : "https://datastudio.google.com/embed/reporting/7d8ee03d-7baf-4cb6-b9aa-53b743486f27/page/p_kl3q988fyc"
  },
  {
    municipio : "Minaçu - GO",
    painel : "https://datastudio.google.com/embed/reporting/f975d9fd-d049-4ef0-b29d-055d21a0eee7/page/p_kl3q988fyc"
  },
  {
    municipio : "Guapó - GO",
    painel : "https://datastudio.google.com/embed/reporting/74a8f252-6070-48a4-ac02-ffc5d9945cec/page/p_kl3q988fyc"
  },
  {
    municipio : "Rio Piracicaba - MG",
    painel : "https://datastudio.google.com/embed/reporting/ed0bbe75-0388-4af2-9b1c-d7c6f2eb19df/page/p_kl3q988fyc"
  },
  {
    municipio : "Xapuri - AC",
    painel : "https://datastudio.google.com/embed/reporting/89d049d7-34aa-47f9-88d5-fb61df3f6164/page/p_kl3q988fyc"
  },
  {
    municipio : "Viçosa - MG",
    painel : "https://datastudio.google.com/embed/reporting/81698d81-bc4e-4c3c-857e-5051f16240d3/page/p_lyb3f8rxyc"
  },
  {
    municipio : "Rio da Conceição - MG",
    painel : "https://datastudio.google.com/embed/reporting/b90349d3-870d-4651-b158-1b6beabb3cdc/page/p_kl3q988fyc"
  },
]

const Index = ({res}) => {
  const { data: session,status } = useSession()
  const [tokenValido, setTokenValido] = useState();
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
    //{label: "Cadastros - Gestantes"},
  ]
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if(session){
    const labelsBuscaAtiva = [[]]
    if(session.user?.cargo == "Coordenação APS" || session.user?.cargo == "Impulser")  labelsBuscaAtiva[0].push({label: "Coordenação APS"})
    if(session.user?.cargo == "Coordenação de Equipe" || session.user?.cargo == "Impulser")  labelsBuscaAtiva[0].push({label: "Coordenação de Equipe"})
    if(titlesBuscaAtiva.length > 1){
      labelsBuscaAtiva.push([])
      if(session.user?.cargo == "Coordenação APS" || session.user?.cargo == "Impulser")  labelsBuscaAtiva[0].push({label: "Coordenação APS"})
      if(session.user?.cargo == "Coordenação de Equipe" || session.user?.cargo == "Impulser")  labelsBuscaAtiva[0].push({label: "Coordenação de Equipe"})
  }
    const links = [[]]
    StaticLinksAPS.forEach(item => {
      if (session.user?.cargo){
        if (item.municipio == session.user?.municipio) links[0].push(item.painel)
      }
    })
    if (session.user?.cargo == "Coordenação de Equipe" || session.user?.cargo == "Impulser") links[0].push(urlGenBuscaAtivaEquipe(DATA_STUDIO_URL_EQUIPE,session?.user?.access_token,session?.user?.municipio,session?.user?.equipe,session?.user?.cargo))
    return (
      <>
      <PanelSelector
        links = {links}
        list={labelsBuscaAtiva}
        titles={titlesBuscaAtiva}
      />
      </>
    )
  }
  return(
    <p>{status}</p>
  )
}

export default Index;
