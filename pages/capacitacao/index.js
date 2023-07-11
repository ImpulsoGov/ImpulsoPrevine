import { useState,useEffect } from 'react'
import { getData,getDataCapacitacao } from '../../services/cms'
import { LAYOUT,CAPACITACAO } from '../../utils/QUERYS'
import { useSession,getSession } from "next-auth/react"
import { ModulosTrilha } from '@impulsogov/design-system'
import { conteudosDataTransform, modulosDataTransform } from '../../helpers/modulosDataTransform'
import { useRouter } from 'next/router';
import { redirectHomeTrilha } from '../../helpers/redirectHome'

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const redirect = redirectHomeTrilha(ctx,session)
  if(redirect) return redirect
  const trilhaID = ctx?.req?.url?.split('=').length == 1 ? '' : ctx?.req?.url.split('=')[1].split('&')[0]
  const capacitacaoDataCMS = ctx?.req?.url && await getDataCapacitacao(CAPACITACAO(trilhaID))
  const conteudosData = await conteudosDataTransform(capacitacaoDataCMS.trilhas[0].conteudo,trilhaID,session?.user?.id,session?.user?.access_token)
  const res = [
      await getData(LAYOUT),
      capacitacaoDataCMS,
      conteudosData,
      trilhaID
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
  const modulos = async()=> session && await modulosDataTransform(res[1].trilhas,res[3],session?.user?.id,session?.user?.access_token)
  useEffect(()=>{modulos().then((res)=>setData(res))},[session]) 
return(
      <>
        {
          res[1]?.trilhas.length>0 && session && data &&
            <ModulosTrilha
              tituloTrilha= {res[1].trilhas[0].titulo}
              botaoVoltar= {{label: "VOLTAR",url:"/capacitacoes"}}
              botaoWhatsapp= {{label: "ENTRAR NO GRUPO DO WHATSAPP",url:"https://chat.whatsapp.com/IFHycLwyfwwCLlRrNZ9bsp"}}
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
