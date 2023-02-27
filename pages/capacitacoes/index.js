import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT,CONTEUDOS_TRILHAS } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { TituloTexto, CardTrilha } from '@impulsogov/design-system'
import { progresso } from '../../helpers/modulosDataTransform'
import { useEffect, useState } from 'react'


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
        await getDataCapacitacao(CONTEUDOS_TRILHAS)
    ]
    return {
        props: {
        res : res
        }
    }
}


const Index = ({res}) => {
    const { data: session,status } = useSession()
    const [data,setData] = useState(false)
    const ProgressoClient = async()=> session && await progresso(res[1].trilhas,session?.user?.id,session?.user?.access_token)
    useEffect(()=>{ProgressoClient().then((res)=>setData(res))},[]) 
    return(
        <>
            <TituloTexto
                titulo="Trilhas de Capacitação"
                texto="Você está na área logada da Coordenação da APS do seu município. Aqui você vai encontrar um painel de cadastros duplicados, listas nominais para monitoramento, referentes a cada um dos indicadores do Previne Brasil."
                imagem = {{posicao: null,url: ''}}
            />
            {
                data &&
                <CardTrilha
                    titulo="Hipertensão e Diabetes"
                    progressao={data[0].progresso }
                    linkTrilha={"/capacitacao?trilhaID="+res[1].trilhas[0].id}
                    linkSobre="/conteudo-programatico"
                />
            }
        </>
    )
}

export default Index;