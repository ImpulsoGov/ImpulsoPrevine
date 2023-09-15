import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT, CONTEUDOS_TRILHAS } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { Greeting, CardTrilha, CardLargeGrid, CardLarge } from '@impulsogov/design-system'
import { progresso } from '../../helpers/modulosDataTransform'
import { acessoTrilhasClient } from '../../services/acessoTrilha'
import { useEffect, useState, useRef } from 'react'
import { redirectHomeNotLooged } from '../../helpers/redirectHome'
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    const redirect = redirectHomeNotLooged(ctx,session)
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
        ProgressoClient().then((response)=>{
        setData(response)
    })},[session]) 
    useEffect(()=>{
        session && 
        TrilhasLiberadasClient().then((res)=>setTrilhasLiberadas(res))
    },[session]) 
    const cargo_transform = (cargo)=>{
        if (cargo == "Coordenação de APS") return "coordenador(a) da APS"
        if (cargo == "Coordenação de Equipe") return "coordenador(a) de equipe"
        if (cargo == "Impulser") return cargo
    }
    const cargo = cargo_transform(session?.user?.cargo)
    if (session){
        return(
            <>
                <Greeting
                    cargo = {cargo}
                    greeting = "Bem vindo(a)"
                    municipio_uf = {session?.user.municipio}
                    nome_usuario = {session?.user.nome}
                    texto = ""
                />
                <div 
                    style={
                        window.screen.width >= 1024 ?
                        {
                            display : "grid",
                            gridTemplateColumns : "auto auto",
                            columnGap : "24px",
                            gridRowGap : "24px",
                            marginLeft : "80px",
                            marginRight : "45px",
                            marginBottom : "20px"
                        }:
                        {
                            display : "flex",
                            flexDirection : "column",
                            gap : "15px",
                            marginLeft : "15px"
                        }
                }>

                    {
                        data && session?.user.perfis.includes(7) && TrilhasLiberadas && Array.isArray(TrilhasLiberadas) &&
                        data.map((trilha,index)=>{
                            return TrilhasLiberadas?.some(trilhaLiberada=>trilhaLiberada.trilha_id==trilha.TrilhaID) &&
                                <CardTrilha
                                    titulo={trilha?.titulo}
                                    progressao={trilha.progresso }
                                    linkTrilha={trilha.progresso>0 ? `/capacitacao?trilhaID=${trilha.TrilhaID}` : `/conteudo-programatico?trilha=${trilha.TrilhaID}&inicio=1`}
                                    linkCertificado= {trilha.progresso>50 ? "https://forms.gle/osZtTZLmB6zSP7fQA" : "/"} 
                                    certificadoLiberado= {trilha.progresso>50 ? true : false}
                                    key={index}
                                />
                        })
                    }
                    {
                        (session?.user.perfis.includes(5) || session?.user.perfis.includes(8) || session?.user.perfis.includes(9)) &&
                        <>
                        <CardLarge
                            icon= 'https://media.graphassets.com/jo1S3VXcTCyTFw4Ke697'
                            links={ [
                                {
                                    label: 'Citopatológico',
                                    link: '/busca-ativa/citopatologico'
                                },
                                {
                                    label: 'Diabetes',
                                    link: '/busca-ativa/diabeticos?initialTitle=0&painel=0'
                                },
                                {
                                    label: 'Hipertensão',
                                    link: '/busca-ativa/hipertensos?initialTitle=0&painel=0'
                                },
                                {
                                    label: 'Pré-Natal',
                                    link: '/busca-ativa/gestantes?initialTitle=0&painel=0'
                                },
                            ]}
                            texto= 'Oferecemos listas nominais para monitoramento: gestantes, pessoas com hipertensão, pessoas com diabetes e coleta do citopatológico. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos.'
                            titulo= 'Listas Nominais'
                            obs="Para sair da área logada, basta ir no seu usuário no menu superior e clicar em ‘SAIR’."
                            theme= "ColorIP"
                        />
                        <CardLarge
                            icon= 'https://media.graphassets.com/6cOfkxeyT7245Fn19kgU'
                            links= {[
                                {
                                    label: 'Gestantes',
                                    link: '/cadastros-duplicados?initialTitle=0&painel=0'
                                },
                            ]}
                            texto='Aqui você encontrará uma lista nominal de possíveis cadastros duplicados de gestantes. Com esta lista você poderá rapidamente identificar estes casos de possíveis duplicações e regularizá-los.'
                            titulo= 'Cadastros Duplicados'
                            theme= "ColorIP"
                        />
                        </>
                    }
                </div>
            </>
        )
    }
}

export default Index;