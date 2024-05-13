import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT, CONTEUDOS_TRILHAS } from '../../utils/QUERYS'
import { useSession,signOut, getSession } from "next-auth/react"
import { Greeting, CardTrilha, ButtonColorSubmit, CardLarge } from '@impulsogov/design-system'
import { progresso } from '../../helpers/modulosDataTransform'
import { acessoTrilhasClient } from '../../services/acessoTrilha'
import { useEffect, useState, useRef } from 'react'
import { redirectHomeNotLooged } from '../../helpers/redirectHome'
import { generatePDF } from '../../helpers/generatePDF'
import { NPSConsulta, NPSAvaliacao } from "../../services/NPS"
import { ModalAlert , AtualizacaoCadastral } from "../../componentes/ModalAlert/ModalAlert"
import style from "./ModalAlert.module.css";

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    const redirect = redirectHomeNotLooged(ctx, session)
    if (redirect) return redirect
    const res = [
        await getData(LAYOUT),
        await getDataCapacitacao(CONTEUDOS_TRILHAS)
    ]
    return {
        props: {
            res: res
        }
    }
}


const NPS = ({ user, token, submit }) => {
    const [display, setDisplay] = useState(true)
    const [avaliacao, setAvaliacao] = useState(0)
    const [avaliacaoHover, setAvaliacaoHover] = useState(0)
    const avaliacoes = [1, 2, 3, 4, 5]
    const refModal = useRef()
    useEffect(() => {
        const handleClick = e => { if (display && !refModal?.current?.contains(e.target)) setDisplay(false); }
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [display]);

    return (
        display &&
        <div className={style.ModalAlert}>
            <div className={style.Alert} ref={refModal}>
                <div className={style.close}>
                    <a
                        className={style.ModalExit}
                        onClick={() => setDisplay(false)}
                    ></a>
                </div>
                <div className={style.tituloNPS}>Como você avalia sua experiência na área logada até agora?</div>
                <div className={style.NPSAvaliacao}>
                    {avaliacoes.map((item) => {
                        return (
                            <div
                                className={
                                    avaliacaoHover + 1 <= item ?
                                        style.avaliacao :
                                        style.avaliacaoColor
                                }
                                key={item}
                                onMouseEnter={() => { setAvaliacaoHover(item) }}
                                onMouseLeave={() => { setAvaliacaoHover(avaliacao == 0 ? 0 : avaliacao) }}
                                onClick={() => setAvaliacao(item)}
                            >{item}</div>
                        )
                    })}
                </div>
                <div className={style.escala}>
                    <div>Muito ruim</div>
                    <div>Muito boa</div>
                </div>
                <a
                    onClick={() => setDisplay(false)}
                >
                    <ButtonColorSubmit
                        label="Avaliar"
                        submit={submit}
                        arg={{ "user": user, "avaliacao": avaliacao, "token": token }}
                        disable={avaliacao == 0}
                    />
                </a>
            </div>
        </div>
    )
}

const Index = ({ res }) => {
    const { data: session, status } = useSession()
    const [data, setData] = useState(false)
    const [dataNPS, setDataNPS] = useState(true)
    const [TrilhasLiberadas, setTrilhasLiberadas] = useState([])
    const ProgressoClient = async () => await progresso(res[1].trilhas, session?.user?.id, session?.user?.access_token)
    const TrilhasLiberadasClient = async () => await acessoTrilhasClient(session?.user?.id, session?.user?.access_token)
    const NPSDataClient = async () => await NPSConsulta(session?.user?.id, session?.user?.access_token)
    useEffect(()=>{
        session &&  
        NPSDataClient().then((response)=>{
        setDataNPS(response)
    })},[session]) 
    useEffect(() => {
        session && res &&
            ProgressoClient().then((response) => {
                setData(response)
            })
    }, [session])
    useEffect(() => {
        session &&
            TrilhasLiberadasClient().then((res) => setTrilhasLiberadas(res))
    }, [session])
    const cargo_transform = (cargo) => {
        if (cargo == "Coordenação de APS") return "coordenador(a) da APS"
        if (cargo == "Coordenação de Equipe") return "coordenador(a) de equipe"
        if (cargo == "Impulser") return cargo
    }
    const cargo = cargo_transform(session?.user?.cargo)
    if (session) {
        return (
            <>
                 {
                    !dataNPS &&
                    <NPS 
                        user = {session?.user?.id}
                        token = {session?.user?.access_token}
                        submit = {NPSAvaliacao}
                    />                    
                } 
                      {/* <ModalAlert
                        Child = {Alert_v2}
                        childProps ={ {
                            titulos : {
                                Titulo : "Impulso Previne:",
                                SubTitulo : "Uso das listas nominais na rotina das equipes"
                            },
                            Info : [
                                {
                                    icon : "https://media.graphassets.com/mK0XWA2qSyK3tSPER5SM",
                                    info : "22 de feverreiro"
                                },
                                {
                                    icon : "https://media.graphassets.com/Bsq3OasQQxWNFuN0Ldhs",
                                    info : "14h"
                                },
                                {
                                    icon : "https://media.graphassets.com/Ui2qHF9IR9WyqEQv8H1v",
                                    info : "Certificado para os participantes"
                                },
                            ],
                            cardProfissional : {
                                profissional : "https://media.graphassets.com/CL8x2D45RxKZCGJZSXLa",
                                logo : "https://media.graphassets.com/et6MBNobT9OA39JxsjNi",
                                nome : "Isabela Santos",
                                cargo : "Especialista em Saúde Coletiva"
                            },
                            botao : {
                                label : "ACESSAR EVENTO",
                                url : "https://bit.ly/encontro-listas-nominais"
                            }
                        }}
                    />
 */}
                {/* <ModalAlert
                    Child = {AtualizacaoCadastral}
                    childProps ={ {
                        titulos : {
                            Titulo : "ATENÇÃO",
                            SubTitulo : "Atualize seu cadastro para garantir seu acesso na área logada"
                        },
                        Info : "Em breve vamos alterar os dados necessários para acessar o site do Impulso Previne. Clique no botão abaixo e atualize sua ficha de cadastro!",
                        imagem : "https://media.graphassets.com/fnBPBSsuS2aUWu0pjQV9",
                        botao : {
                            label : "ATUALIZAR CADASTRO",
                            url : "https://bit.ly/cadasto-banner"
                        }
                    }}
                /> */}
                <Greeting
                    cargo = {cargo}
                    greeting = "Bem-vindo(a)"
                    municipio_uf = {session?.user.municipio}
                    nome_usuario = {session?.user.nome}
                    texto = ""
                />

                <div
                    style={
                        window.screen.width >= 1024 ?
                            {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                                columnGap: "24px",
                                gridRowGap: "24px",
                                marginLeft: "80px",
                                marginRight: "45px",
                                marginBottom: "20px"
                            } :
                            {
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                                marginLeft: "15px"
                            }
                    }>
                    {
                        (session?.user.perfis.includes(5) || session?.user.perfis.includes(8) || session?.user.perfis.includes(9)) &&
                        <>
                            <CardLarge
                                icon='https://media.graphassets.com/jo1S3VXcTCyTFw4Ke697'
                                links={[
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
                                    {
                                        label: 'Vacinação',
                                        link: '/busca-ativa/vacinacao'
                                    },
                                ]}
                                texto='Oferecemos listas nominais para monitoramento: gestantes, pessoas com hipertensão, pessoas com diabetes e coleta do citopatológico. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos.'
                                titulo='Listas Nominais'
                                obs="Para sair da área logada, basta ir no seu usuário no menu superior e clicar em ‘SAIR’."
                                theme="ColorIP"
                            />
                            <CardLarge
                                icon='https://media.graphassets.com/6cOfkxeyT7245Fn19kgU'
                                links={[
                                    {
                                        label: 'Gestantes',
                                        link: '/cadastros-duplicados?initialTitle=0&painel=0'
                                    },
                                ]}
                                texto='Aqui você encontrará uma lista nominal de possíveis cadastros duplicados de gestantes. Com esta lista você poderá rapidamente identificar estes casos de possíveis duplicações e regularizá-los.'
                                titulo='Cadastros Duplicados'
                                theme="ColorIP"
                            />
                        </>
                    }
                </div>

                <div
                    style={
                        window.screen.width >= 1024 ?
                        {
                            display: "grid",
                            gridTemplateColumns: "auto auto auto",
                            columnGap: "24px",
                            gridRowGap: "24px",
                            marginLeft: "80px",
                            marginRight: "80px",
                            marginBottom: "20px"

                        } :
                        {
                            display: "grid",
                            flexDirection: "column",
                            gap: "15px",
                            marginLeft: "15px"
                        }
                }>

                    {data && session?.user.perfis.includes(7) && TrilhasLiberadas &&
                        data.map((trilha, index) => {
                            const GerarCertificado = () => {
                                const carga_horaria = '10';
                                generatePDF(trilha.titulo, session?.user?.nome, carga_horaria);
                            }

                            return TrilhasLiberadas?.some(trilhaLiberada => trilhaLiberada.trilha_id == trilha.TrilhaID) &&
                                <CardTrilha
                                    titulo={trilha?.titulo}
                                    progressao={trilha.progresso}
                                    linkTrilha={trilha.progresso > 0 ? `/capacitacao?trilhaID=${trilha.TrilhaID}` : `/conteudo-programatico?trilha=${trilha.TrilhaID}&inicio=1`}
                                    Certificado={GerarCertificado}
                                    certificadoLiberado={trilha.progresso > 50}
                                    key={index}
                                />
                        })
                    }
                </div>
            </>
        )
    }else{
        if(status !== "authenticated" && status !== "loading" ) signOut()
      }
      if(status=="unauthenticated") router.push('/')
}
      
export default Index;
