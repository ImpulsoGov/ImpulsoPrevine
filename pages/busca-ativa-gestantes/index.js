import { PanelSelector} from "@impulsogov/design-system";
import { useSession } from "next-auth/react"
import { getData } from '../../utils/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { DATA_STUDIO_URL_EQUIPE, DATA_STUDIO_URL_COORDENACAO_APS } from "../../constants/dataStudio";



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

const genParamCoordenacaoAPS = (token,municipio_uf)=>{
  let params = {
    "token": token,
    "municipio_uf": municipio_uf,
  }
  var encodedParams = encodeURIComponent(JSON.stringify(params))
  return encodedParams
}


const urlGenBuscaAtivaEquipe = (data_studio,token,municipio_uf,equipe,cargo)=>{
  if (cargo == "Coordenação de Equipe" || cargo == "Impulser"){
    let baseURL = data_studio
    let param = genParamEquipe(token,municipio_uf,equipe)
    const link = baseURL  + param 
    console.log(link)
    return link
  }else{
    return ""
  }
}

  const urlGenBuscaAtivaCoordenacaoAPS = (data_studio,token,municipio_uf,cargo)=>{
    if (cargo == "Coordenação APS" || cargo == "Impulser"){
      let baseURL = data_studio
      let param = genParamCoordenacaoAPS(token,municipio_uf)
      const link = baseURL  + param 
      console.log(link)
      return link
    }else{
      return ""
    }
  }


const Index = ({res}) => {
  const { data: session,status } = useSession()

  const titlesBuscaAtiva = [
    {
      label: "Indicadores Gestantes",
    },
    //{label: "Cadastros - Gestantes"},
  ]
  
  

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
    if (session.user?.cargo == "Coordenação APS" || session.user?.cargo == "Impulser") links[0].push(urlGenBuscaAtivaCoordenacaoAPS(DATA_STUDIO_URL_COORDENACAO_APS,session?.user?.access_token,session?.user?.municipio,session?.user?.cargo))
    if (session.user?.cargo == "Coordenação de Equipe" || session.user?.cargo == "Impulser") links[0].push(urlGenBuscaAtivaEquipe(DATA_STUDIO_URL_EQUIPE,session?.user?.access_token,session?.user?.municipio,session?.user?.equipe,session?.user?.cargo))
    return (
      <PanelSelector
        links = {links}
        list={labelsBuscaAtiva}
        titles={titlesBuscaAtiva}
      />
    )
  }
  return(
    <p>{status}</p>
  )
  
    
}

export default Index;