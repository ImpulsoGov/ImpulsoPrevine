import { PanelSelector} from "@impulsogov/design-system";
import { useSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { getData } from '../../utils/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { DATA_STUDIO_URL_EQUIPE, DATA_STUDIO_URL_COORDENACAO_APS } from "../../constants/dataStudio";
import { validatetoken} from "../../services/validateToken"
// IMPORTS PARA BANNER TEMPORÁRIO
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

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
    painel : "https://datastudio.google.com/embed/reporting/debb95fc-aa06-4a9e-a33e-046954d02ac8/page/p_kl3q988fyc"
  },
  {
    municipio : "Juquitiba - SP",
    painel : "https://datastudio.google.com/embed/reporting/5862cd94-9d64-42d8-900b-be12ee896733/page/p_kl3q988fyc"
  },
  {
    municipio : "Minaçu - GO",
    painel : "https://datastudio.google.com/embed/reporting/e7908f33-f4b3-4f8a-a1d6-41f08b00706e/page/p_kl3q988fyc"
  },
  {
    municipio : "Guapó - GO",
    painel : "https://datastudio.google.com/embed/reporting/7f3a4af5-2c81-4c84-b5da-793f4759231a/page/p_kl3q988fyc"
  },
  {
    municipio : "Rio Piracicaba - MG",
    painel : "https://datastudio.google.com/embed/reporting/0c705ca9-5e14-46e1-9291-e459714b60d3/page/p_0txoctrxyc"
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dificuldades no carregamento do painel</Modal.Title>
        </Modal.Header>
        <Modal.Body><p>Infelizmente estamos enfretando problemas no sistema. 
          Se seu painel não recarregar por favor faça logout e entre novamente.
          <br></br>Se o problema persistir não hesite em nos contactar.
          <br></br>Estamos trabalhando em consertar o mais rápido possível. Agradecemos a compreensão.</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" href="https://forms.gle/edB3WsYYtJq9Afq39">
            Entrar em contato
          </Button>
        </Modal.Footer>
      </Modal>
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
