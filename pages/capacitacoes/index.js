import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT,CONTEUDOS_TRILHAS } from '../../utils/QUERYS'
import { useSession, getSession } from "next-auth/react"
import { TituloTexto, CardTrilha } from '@impulsogov/design-system'
import { progresso } from '../../helpers/modulosDataTransform'
import { useEffect, useState } from 'react'
import { redirectHomeTrilha } from '../../helpers/redirectHome'
import { acessoTrilhasClient } from '../../services/acessoTrilha'

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    const redirect = redirectHomeTrilha(ctx,session)
    if(redirect) return redirect
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
    const [TrilhasLiberadas,setTrilhasLiberadas] = useState([])
    const ProgressoClient = async()=> await progresso(res[1].trilhas,session?.user?.id,session?.user?.access_token)
    const TrilhasLiberadasClient = async()=> await acessoTrilhasClient(session?.user?.id,session?.user?.access_token)
    useEffect(()=>{
        session && res &&
        ProgressoClient().then((res)=>setData(res))
    },[session]) 
    useEffect(()=>{
        session && 
        TrilhasLiberadasClient().then((res)=>setTrilhasLiberadas(res))
    },[session]) 

    console.log(data)
    return(
        <>
            <TituloTexto
                titulo="Trilhas de Capacitação"
                texto="Nossas trilhas de capacitação possuem materiais teóricos e práticos para ajudar profissionais da APS no processo de educação continuada em saúde. Comece já!"
                imagem = {{posicao: null,url: ''}}
            />
            {
                data && TrilhasLiberadas &&
                data.map((trilha,index)=>
                    TrilhasLiberadas.some(trilhaLiberada=>trilhaLiberada.trilha_id==trilha.TrilhaID) &&
                        <CardTrilha
                            titulo={trilha.titulo}
                            progressao={trilha.progresso }
                            linkTrilha={trilha.progresso>0 ? "/capacitacao?trilhaID="+trilha.TrilhaID : 'conteudo-programatico'}
                            linkCertificado= {trilha.progresso>50 ? "https://forms.gle/osZtTZLmB6zSP7fQA" : "/"} 
                            certificadoLiberado= {trilha.progresso>50 ? true : false}
                            key={index}
                        />
                )
            }
        </>
    )
}

export default Index;
