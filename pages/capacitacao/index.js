import { useState,useEffect } from 'react'
import { getData,getDataCapacitacao } from '../../services/cms'
import { LAYOUT,CAPACITACAO } from '../../utils/QUERYS'
import { useSession,getSession } from "next-auth/react"
import { ModulosTrilha } from '@impulsogov/design-system'
import { conteudosDataTransform, modulosDataTransform } from '../../helpers/modulosDataTransform'
import { useRouter } from 'next/router';


export async function getServerSideProps(ctx) {
  const trilhaID = ctx?.req?.url?.split('=').length == 1 ? '' : ctx?.req?.url.split('=')[1].split('&')[0]
  const session = await getSession(ctx)
  let redirect 
  const userIsActive = ctx?.req.cookies['next-auth.session-token']
  const userIsActiveSecure = ctx?.req.cookies['__Secure-next-auth.session-token']
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
  const capacitacaoDataCMS = ctx?.req?.url && await getDataCapacitacao(CAPACITACAO(trilhaID))
  const conteudosData = await conteudosDataTransform(capacitacaoDataCMS.trilhas[0].conteudo,trilhaID,session?.user?.id,session?.user?.access_token)
  const res = [
      await getData(LAYOUT),
      capacitacaoDataCMS,
      conteudosData
  ]
  return {
      props: {
      res : res
      }
  }
}

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth ] = useState(undefined);
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
  
        window.addEventListener('resize', handleWindowResize);
        handleWindowResize()
        return () => window.removeEventListener('resize', handleWindowResize);
      
    },[]);
    return windowWidth;
  };
  

const Index = ({res}) => {
  const { data: session,status } = useSession()
  let width = useWindowWidth()
  const router = useRouter()
  const [data,setData] = useState(false)
  const modulos = async()=> session && await modulosDataTransform(res[1].trilhas,session?.user?.id,session?.user?.access_token)
  useEffect(()=>{modulos().then((res)=>setData(res))},[]) 
return(
      <>
        {
          res[1]?.trilhas.length>0 && session && data &&
            <ModulosTrilha
              tituloTrilha= {res[1].trilhas[0].titulo}
              botaoVoltar= {{label: "VOLTAR",url:"/capacitacoes"}}
              botaoWhatsapp= {{label: "ENTRAR NO GRUPO DO WHATSAPP",url:"https://impulso-previne-capacitacao.vercel.app/"}}
              modulos={data}
              modulo={res[2][0]}
              ultimoModulo = {router.query?.modulo ? router.query?.modulo : res[2][1]}
              mobile= {width < 1023}
              checkSobre={res[2][2]}
            />
        }
      </>
  )
}

export default Index;
