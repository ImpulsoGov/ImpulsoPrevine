import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT, CONTEUDOS_TRILHAS } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { Greeting, CardTrilha, CardLargeGrid, ModalAlert , CardAlertModal, ButtonColorSubmit } from '@impulsogov/design-system'
import { progresso } from '../../helpers/modulosDataTransform'
import { useEffect, useState, useRef } from 'react'
import { redirectHomeNotLooged } from '../../helpers/redirectHome'
import { getSession } from "next-auth/react";
import style from "./ModalAlert.module.css";

import {NPSConsulta, NPSAvaliacao} from "../../services/NPS"

const NPS = ({user, token, submit})=>{
    const [display, setDisplay] = useState(true)
    const [avaliacao,setAvaliacao] = useState(0)
    const [avaliacaoHover,setAvaliacaoHover] = useState(0)
    const avaliacoes = [1,2,3,4,5]
    const refModal = useRef()
    useEffect(() => {
        const handleClick = e => {if (display && !refModal?.current?.contains(e.target)) setDisplay(false);}
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
      },[display]);
      
    return(
        display &&
        <div className={style.ModalAlert}> 
            <div className={style.Alert} ref={refModal}>
                <div className={style.close}>
                    <a 
                        className={style.ModalExit}
                        onClick={()=>setDisplay(false)}
                    ></a>
                </div>
            <div className={style.tituloNPS}>Como você avalia sua experiência na área logada até agora?</div>
            <div className={style.NPSAvaliacao}>
                {avaliacoes.map((item)=>{
                    return(
                        <div 
                            className={
                                avaliacaoHover+1 <= item ?
                                style.avaliacao : 
                                style.avaliacaoColor 
                            } 
                            key={item}
                            onMouseEnter={()=>{setAvaliacaoHover(item)}}
                            onMouseLeave={()=>{setAvaliacaoHover(avaliacao==0 ? 0 : avaliacao)}}
                            onClick={()=>setAvaliacao(item)}
                    >{item}</div>
                    )
                })}
            </div>
            <div className={style.escala}>
                <div>Muito ruim</div>
                <div>Muito boa</div>
            </div>
            <a 
                onClick={()=>setDisplay(false)}
            >
                <ButtonColorSubmit
                    label="Avaliar"
                    submit={submit}
                    arg={{"user":user,"avaliacao":avaliacao,"token":token}}
                    disable={avaliacao==0}
                />
            </a>
            </div>
        </div>
    )
}

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
    const [dataNPS,setDataNPS] = useState(false)
    const ProgressoClient = async()=> await progresso(res[1].trilhas,session?.user?.id,session?.user?.access_token)
    const NPSDataClient = async()=> await NPSConsulta(session?.user?.id,session?.user?.access_token)
    useEffect(()=>{
        session &&  
        NPSDataClient().then((response)=>{
        setDataNPS(response)
    })},[session]) 
    useEffect(()=>{
        session && res && 
        ProgressoClient().then((response)=>{
        setData(response)
    })},[session]) 
    const cargo_transform = (cargo)=>{
        if (cargo == "Coordenação de APS") return "coordenador(a) da APS"
        if (cargo == "Coordenação de Equipe") return "coordenador(a) de equipe"
        if (cargo == "Impulser") return cargo
    }
    const cargo = cargo_transform(session?.user?.cargo)
    if (session){
        return(
            <>
                {
                    !dataNPS &&
                    <NPS 
                        user = {session?.user?.id}
                        token = {session?.user?.access_token}
                        submit = {NPSAvaliacao}
                    />
                    // <ModalAlert
                    //     Child={NPS}
                    //     childProps = {{
                    //         child : NPS,
                    //         childProps:{
                    //             user : session?.user?.id,
                    //             token : session?.user?.access_token,
                    //             submit : NPSAvaliacao
                    //         }
                    //     }}
                    // />
                }
                <Greeting
                    cargo = {cargo}
                    greeting = "Bem vindo(a)"
                    municipio_uf = {session?.user.municipio}
                    nome_usuario = {session?.user.nome}
                    texto = "Você está na área logada da Coordenação da APS do seu município. Aqui você vai encontrar um painel com as listas nominais para monitoramento e os possíveis cadastros duplicados de gestantes, referentes aos indicadores de gestantes, hipertensão e diabetes, do Previne Brasil."
                />
                {
                    data && session?.user.perfis.includes(7) &&
                    <CardTrilha
                        titulo="Trilha de Capacitação: Hipertensão e Diabetes"
                        progressao={data[0].progresso }
                        linkTrilha={data[0].progresso>0 ? "/capacitacao?trilhaID="+res[1].trilhas[0].id : 'conteudo-programatico'}
                        linkCertificado= {data[0].progresso>50 ? "https://forms.gle/osZtTZLmB6zSP7fQA" : "/"} 
                        certificadoLiberado= {data[0].progresso>50 ? true : false}
                    />
                }
                {
                    (session?.user.perfis.includes(5) || session?.user.perfis.includes(8) || session?.user.perfis.includes(9)) &&
                    <CardLargeGrid
                        cards={[
                            {
                                icon: 'https://media.graphassets.com/jo1S3VXcTCyTFw4Ke697',
                                links: [
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
                                ],
                                texto: 'Oferecemos três listas nominais para monitoramento dos seguintes grupos: gestantes, pessoas com hipertensão e pessoas com diabetes. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos.',
                                titulo: 'Listas Nominais'
                            },
                            {
                                icon: 'https://media.graphassets.com/6cOfkxeyT7245Fn19kgU',
                                links: [
                                    {
                                        label: 'Gestantes',
                                        link: '/cadastros-duplicados?initialTitle=0&painel=0'
                                    },
                                    
                                ],
                                texto: 'Aqui você encontrará uma lista nominal de possíveis cadastros duplicados de gestantes. Com esta lista você poderá rapidamente identificar estes casos de possíveis duplicações e regularizá-los.',
                                titulo: 'Cadastros Duplicados'
                            }
                        ]}
                        obs="Para sair da área logada, basta ir no seu usuário no menu superior e clicar em ‘SAIR’."
                        theme= "ColorIP"
                    />
                }
            </>
        )
    }
}

export default Index;
