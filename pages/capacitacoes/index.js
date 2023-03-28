import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT,CONTEUDOS_TRILHAS } from '../../utils/QUERYS'
import { useSession, getSession } from "next-auth/react"
import { TituloTexto, CardTrilha } from '@impulsogov/design-system'
import { progresso } from '../../helpers/modulosDataTransform'
import { useEffect, useState } from 'react'
import { redirectHomeTrilha } from '../../helpers/redirectHome'


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
    const [certificado,setCertificado] = useState(false)
    const ProgressoClient = async()=> await progresso(res[1].trilhas,session?.user?.id,session?.user?.access_token)
    useEffect(()=>{
        session && res &&
        ProgressoClient().then((res)=>setData(res[0]),setCertificado(res[1]))
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
                    linkCertificado= {data[0].progresso>50 ? "https://forms.gle/osZtTZLmB6zSP7fQA" : "/"} 
                    certificadoLiberado= {data[0].progresso>50 ? true : false}
            />
            }
        </>
    )
}

export default Index;
