import { useState,useEffect } from 'react'
import { getData,getDataCapacitacao } from '../../services/cms'
import { LAYOUT,CAPACITACAO } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { ModulosTrilha } from '@impulsogov/design-system'
import { conteudosDataTransform, modulosDataTransform } from '../../helpers/modulosDataTransform'
import { useRouter } from 'next/router';


export async function getServerSideProps({req}) {
  const trilhaID = req?.url?.split('=').length == 1 ? '' : req?.url.split('=')[1].split('&')[0]
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
      req?.url && await getDataCapacitacao(CAPACITACAO(trilhaID))
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
  const modulo = conteudosDataTransform(res[1].trilhas[0].conteudo,router.query?.trilhaID,session?.user?.id,session?.user?.access_token)
  console.log(modulo)
  return(
      <>
        {
          res[1]?.trilhas.length>0 && modulo &&
            <ModulosTrilha
              tituloTrilha= {res[1].trilhas[0].titulo}
              botaoVoltar= {{label: "VOLTAR",url:"/capacitacoes"}}
              botaoWhatsapp= {{label: "ENTRAR NO GRUPO DO WHATSAPP",url:"/grupo-whatsapp"}}
              modulos={modulosDataTransform(res[1].trilhas[0].conteudo)}
              modulo={modulo}
              ultimoModulo = {router.query?.modulo ? router.query?.modulo : 1}
              mobile= {width < 1023}
            />
        }
      </>
  )
}

export default Index;
