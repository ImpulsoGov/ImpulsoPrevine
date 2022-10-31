import { PanelSelector} from "@impulsogov/design-system";
import { useSession } from "next-auth/react"
import { getData } from '../../utils/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { DATA_STUDIO_URL } from "../../constants/dataStudio";



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

const genParam = (token,municipio_uf,equipe)=>{
  let params = {
    "token": token,
    "municipio_uf": municipio_uf,
    "equipe": equipe
  }
  var encodedParams = encodeURIComponent(JSON.stringify(params))
  return encodedParams
}

const urlGenBuscaAtiva = (data_studio,token,municipio_uf,equipe)=>{
  let baseURL = data_studio
  let param = genParam(token,municipio_uf,equipe)
  const link = baseURL  + param 
  console.log(link)
  return link
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
    const labelsBuscaAtiva = [
      [
        ...[session.user?.cargo == "Coordenação APS" || session.user?.cargo == "Impulser" ? {label: "Coordenação APS"}: []],
        ...[session.user?.cargo == "Coordenação de Equipe" || session.user?.cargo == "Impulser" ? {label: "Coordenação de Equipe"}: []],
      ],
      titlesBuscaAtiva.length > 1 &&
      [
        ...(session.user?.cargo) == "Coordenação APS" || session.user?.cargo == "Impulser" ? {label: "Coordenação APS"}: [],
        ...(session.user?.cargo) == "Coordenação de Equipe" || session.user?.cargo == "Impulser" ? {label: "Coordenação APS"}: [],
      ]
    ]
    return (
      <PanelSelector
      links = {[
        [
          urlGenBuscaAtiva(DATA_STUDIO_URL,session?.user?.access_token,session?.user?.municipio,session?.user?.equipe),
          urlGenBuscaAtiva(DATA_STUDIO_URL,session?.user?.access_token,session?.user?.municipio,session?.user?.equipe),
        ], 
        [
          "https://datastudio.google.com/embed/reporting/bf7923fb-24b9-4cbf-81ab-8ba507d13a97/page/NvkxC",
          "https://datastudio.google.com/embed/reporting/bf7923fb-24b9-4cbf-81ab-8ba507d13a97/page/NvkxC"
        ], 
      ]}
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