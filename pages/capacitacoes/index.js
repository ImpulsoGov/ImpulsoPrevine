import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT,CONTEUDOS_TRILHAS } from '../../utils/QUERYS'
import { useSession, getSession } from "next-auth/react"
import { TituloTexto, CardTrilha } from '@impulsogov/design-system'
import { progresso } from '../../helpers/modulosDataTransform'
import { useEffect, useState } from 'react'
import { redirectHomeTrilha } from '../../helpers/redirectHome'
import { acessoTrilhasClient } from '../../services/acessoTrilha'
import { generatePDF } from '../../helpers/generatePDF'

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
        ProgressoClient().then((res)=>{
            setData(res)
        })
    },[session]) 
    useEffect(()=>{
        session && 
        TrilhasLiberadasClient().then((res)=>setTrilhasLiberadas(res))
    },[session]) 
    return(
        <>
            <TituloTexto
                titulo="Trilhas de Capacitação"
                texto="Nossas trilhas de capacitação possuem materiais teóricos e práticos para ajudar profissionais da APS no processo de educação continuada em saúde. Comece já!"
                imagem = {{posicao: null,url: ''}}
            />
            {
                data && TrilhasLiberadas &&
                <div 
                    style={
                        window.screen.width >= 1024 ?
                        {
                            display : "flex",
                            gap : "30px",
                            marginLeft : "80px",
                            marginRight : "80px",
                            marginBottom : "30px"
                        }:
                        {
                            display : "flex",
                            flexDirection : "column",
                            gap : "15px",
                        }
                }>
                    {
                        data.map((trilha,index)=>{
                            const GerarCertificado = () => {
                                const carga_horaria = '10';
                                generatePDF(trilha.titulo, session?.user?.nome, carga_horaria);
                            }
                        
                            return TrilhasLiberadas?.some(trilhaLiberada=>trilhaLiberada.trilha_id==trilha.TrilhaID) &&
                                <>
                                <CardTrilha
                                    titulo={trilha?.titulo}
                                    progressao={trilha.progresso }
                                    linkTrilha={trilha.progresso>0 ? `/capacitacao?trilhaID=${trilha.TrilhaID}` : `/conteudo-programatico?trilha=${trilha.TrilhaID}&inicio=1`}
                                    Certificado= {GerarCertificado} 
                                    certificadoLiberado= {trilha.progresso>50}
                                    key={index}
                                />
                                </>
                        })
                    }
                </div>
            }
        </>
    )
}

export default Index;
