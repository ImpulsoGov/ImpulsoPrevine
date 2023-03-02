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
    const ProgressoClient = async()=> await progresso(res[1].trilhas,session?.user?.id,session?.user?.access_token)
    useEffect(()=>{
        session && res &&
        ProgressoClient().then((res)=>setData(res))
    },[session]) 
    return(
        <>
            <TituloTexto
                titulo="Trilhas de Capacitação"
                texto="Nossas trilhas de capacitação possuem materiais teóricos e práticos para ajudar profissionais da APS no processo de educação continuada em saúde. Comece já!"
                imagem = {{posicao: null,url: ''}}
            />
            {
                data &&
                <CardTrilha
                    titulo="Hipertensão e Diabetes"
                    progressao={data[0].progresso }
                    linkTrilha={data[0].progresso>0 ? "/capacitacao?trilhaID="+res[1].trilhas[0].id : 'conteudo-programatico'}
                />
            }
        </>
    )
}

export default Index;
