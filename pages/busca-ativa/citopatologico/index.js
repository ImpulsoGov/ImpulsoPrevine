import { 
    CardAlert,
    TituloTexto, 
    PainelBuscaAtiva , 
    ScoreCardGrid , 
    Spinner, 
    GraficoBuscaAtiva,
    TabelaCitoImpressao,
    PanelSelector,
    ButtonLightSubmit
} from "@impulsogov/design-system";
import { useSession,signOut, getSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { validatetoken} from "../../../services/validateToken"
import { redirectHome } from "../../../helpers/redirectHome";
import { colunasCitoEquipe, colunasCitoAPS } from "../../../helpers/colunasCito";
import { Imprimir } from "../../../helpers/imprimir"
import { tabelaCitoEquipe , tabelaCitoAPS } from "../../../services/busca_ativa/Cito";
import status_usuario_descricao  from "../../../data/StatusAcompanhamento.json" assert { type: 'json' };
import faixa_etarias from '../../../data/faixa_etarias.json' assert { type: 'json' };
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';
import MunicipioQuadrimestre from "../../../componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import {log_out} from "../../../hooks/log_out"
import { dispararEventoAbrirImpressaoAPS, dispararEventoAbrirImpressaoEquipe } from "../../../helpers/eventosImpressaoHotjar";
import { larguraColunasCitoPaisagem, larguraColunasCitoRetrato } from "../../../helpers/larguraColunasCito";
import { colunasImpressaoCitoAPS } from "../../../helpers/colunasImpressaoCito";
import { labelsModalImpressaoAPS } from "../../../helpers/labelsModalImpressao";
import { Cards } from "../../../componentes/mounted/busca-ativa/citopatologico/APS/Cards";
import { Grafico } from "../../../componentes/mounted/busca-ativa/citopatologico/APS/Grafico";
import { TabelaAPSSemExame } from "../../../componentes/mounted/busca-ativa/citopatologico/APS/TabelaAPSSemExame";
import { TabelaAPSComExame } from "../../../componentes/mounted/busca-ativa/citopatologico/APS/TabelaAPSComExame";
import { CardsSemExame } from "../../../componentes/mounted/busca-ativa/citopatologico/Equipe/CardsSemExame";
import { CardsComExame } from "../../../componentes/mounted/busca-ativa/citopatologico/Equipe/CardsComExame";
import { TabelaEquipeSemExame } from "../../../componentes/mounted/busca-ativa/citopatologico/Equipe/TabelaEquipeSemExame";
import { TabelaEquipeComExame } from "../../../componentes/mounted/busca-ativa/citopatologico/Equipe/TabelaEquipeComExame";

export async function getServerSideProps(ctx) {
const session = await getSession(ctx)
const redirect = redirectHome(ctx,session)
if(redirect) return redirect
const res = [
    await getData(LAYOUT),
]
return {
    props: {
    res : res
    }
}
}

const Index = ({res}) => {
const { data: session,status } = useSession()
const [tokenValido, setTokenValido] = useState();
const [tabelaDataAPS, setTabelaDataAPS] = useState();
const [showSnackBar,setShowSnackBar] = useState({
    open : false
})
const [filtros_aplicados,setFiltros_aplicados] = useState(false)
const [activeTabIndex, setActiveTabIndex] = useState(0);
const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
const [voltarGatilho,setVoltarGatilho] = useState(0);
const router = useRouter();
let visao = null
useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { 
        aba: null,
        sub_aba : activeTabIndex,
        visao : visao
    }
    },
      undefined, { shallow: true }
    );
  }, [activeTabIndex,activeTitleTabIndex]);

const CitoTabelaDataAPS = async()=> await tabelaCitoAPS(session?.user?.municipio_id_sus,session?.user?.access_token)
useEffect(()=>{
    session && (session.user.perfis.includes(8) || session.user.perfis.includes(5)) &&
    CitoTabelaDataAPS().then((response)=>{
    setTabelaDataAPS(response)
})},[session]) 

const [tabelaDataEquipe, setTabelaDataEquipe] = useState();
const CitoTabelaDataEquipe = async()=> await tabelaCitoEquipe(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
useEffect(()=>{
    session &&  session.user.perfis.includes(9) &&
    CitoTabelaDataEquipe().then((response)=>{
    setTabelaDataEquipe(response)
})},[session]) 

const [tabelaData, setTabelaData] = useState([]);

useEffect(()=>{
    if(session){
    validatetoken(session?.user?.access_token)
    .then(response=>{
        setTokenValido(response)
    }).catch(error=>{
        setTokenValido(false)
    })
    }
})
useEffect(()=>{
    if(session && session?.user?.access_token){
    if(tokenValido!=true && tokenValido!==undefined) signOut()
}
},[tokenValido])
const datefiltrosCito = [
    "vencimento_da_coleta",
]
const rotulosfiltrosCito = [
"NOMES DE A-Z",
"NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
"VENCIMENTO DA COLETA MAIS ANTIGO",
"IDADE MENOR-MAIOR",
]
const IDFiltrosCito = {
    "NOMES DE A-Z": "paciente_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z": "acs_nome",
    "VENCIMENTO DA COLETA MAIS ANTIGO" : "vencimento_da_coleta",
    "IDADE MENOR-MAIOR" : "idade",
}   
const IDFiltrosOrdenacaoCito = {
    "paciente_nome" : "asc",
    "acs_nome" : "asc",
    "idade" : "asc",
    "vencimento_da_coleta" : "asc",
    "prazo_proxima_coleta" : "asc",
}
const ImpressaoEquipe = (data)=> Imprimir(
    0.78,
    <TabelaCitoImpressao data={data} colunas={colunasCitoEquipe} status_usuario_descricao={status_usuario_descricao} fontFamily="sans-serif" />,
    "citopatologico",
    activeTitleTabIndex,
    activeTabIndex,
    filtros_aplicados,
    setShowSnackBar
)
const Voltar = ()=> window.history.go(voltarGatilho*(-1))
useEffect(()=>{log_out(session)},[session])
useEffect(()=>{setVoltarGatilho(voltarGatilho+1)},[router.asPath])
if(session){  
    if(session.user.perfis.includes(9)){
        visao = "equipe"
        const dataAtual = Date.now();
        const CardsChildSemExame = <CardsSemExame tabelaDataEquipe={tabelaDataEquipe}/>
        const CardsChildComExame = <CardsComExame tabelaDataEquipe={tabelaDataEquipe}/>
        const TabelaChildSemExame = <TabelaEquipeSemExame
            tabelaDataEquipe={tabelaDataEquipe}
            liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
            tabelaData={tabelaData}
            setTabelaData={setTabelaData}
            mixpanel={mixpanel}
            aba={activeTitleTabIndex}
            sub_aba={activeTabIndex}
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar}
            setFiltros_aplicados={setFiltros_aplicados}
        />
        const TabelaChildComExame = <TabelaEquipeComExame
        tabelaDataEquipe={tabelaDataEquipe}
        liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
        tabelaData={tabelaData}
        setTabelaData={setTabelaData}
        mixpanel={mixpanel}
        aba={activeTitleTabIndex}
        sub_aba={activeTabIndex}
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
        setFiltros_aplicados={setFiltros_aplicados}
    />
        const Children = [[CardsChildSemExame,TabelaChildSemExame],[CardsChildComExame,TabelaChildComExame]]


        return (
            <>
            <div 
                style={
                    window.screen.width > 1024 ?
                    {padding: "30px 80px 30px 80px",display: "flex"} :
                    {padding: "30px 0 0 5px",display: "flex"} 
                }>
                    <ButtonLightSubmit 
                        icon='https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'
                        label="VOLTAR" 
                        submit={Voltar}
                    />
            </div>
            <TituloTexto
                    titulo="Lista Nominal de Citopatológico"
                    texto=""
                    imagem = {{posicao: null,url: ''}}
            />
            <CardAlert
                    destaque="IMPORTANTE: "
                    msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
            />  
            <MunicipioQuadrimestre data={dataAtual} />
            {
                tabelaData &&
                <PanelSelector
                components={[Children]}
                conteudo = "components"
                states={{
                    activeTabIndex: Number(activeTabIndex),
                    setActiveTabIndex: setActiveTabIndex,
                    activeTitleTabIndex: activeTitleTabIndex,
                    setActiveTitleTabIndex: setActiveTitleTabIndex
                }}
                
                list={[
                    [
                        {
                            label: 'PESSOAS COM EXAME A SER REALIZADO'
                        },
                        {
                            label: 'PESSOAS EM DIA COM EXAME'
                        }
                    ],
                    ]}
                titles={[
                        {
                            label: ''
                        },
                    ]}
                />
        }
        </>
        )
    }
    if(session.user.perfis.includes(5) || session.user.perfis.includes(8)){
        visao = "aps"
        const dataAtual = Date.now();
        const CardsChild = <Cards tabelaDataAPS={tabelaDataAPS}/>
        const GraficoChild = <Grafico tabelaDataAPS={tabelaDataAPS}/>
        const TabelaChildSemExame = <TabelaAPSSemExame 
            tabelaDataAPS={tabelaDataAPS} 
            tabelaData={tabelaData}
            setTabelaData={setTabelaData}
            mixpanel={mixpanel}
            aba={activeTitleTabIndex}
            sub_aba={activeTabIndex}
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar}
            setFiltros_aplicados={setFiltros_aplicados}
            liberarPesquisa={dispararEventoAbrirImpressaoAPS}
        />
        const TabelaChildComExame = <TabelaAPSComExame
            tabelaDataAPS={tabelaDataAPS}
            tabelaData={tabelaData}
            setTabelaData={setTabelaData}
            mixpanel={mixpanel}
            aba={activeTitleTabIndex}
            sub_aba={activeTabIndex}
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar}
            setFiltros_aplicados={setFiltros_aplicados}
            liberarPesquisa={dispararEventoAbrirImpressaoAPS}
        />
        const Children = [[CardsChild,GraficoChild],[TabelaChildSemExame],[TabelaChildComExame]]

        return (
        <>
            <div style={{ padding: "30px 80px 30px 80px", display: "flex" }}>
                <ButtonLightSubmit 
                    icon='https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'
                    label="VOLTAR" 
                    submit={Voltar}
                />
            </div>
            <TituloTexto
                    titulo="Lista Nominal de Citopatológico"
                    texto=""
                    imagem = {{posicao: null,url: ''}}
            />
            <CardAlert
                destaque="IMPORTANTE: "
                msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
            />  
            <MunicipioQuadrimestre data={dataAtual} />
            <PanelSelector
                components={[Children]}
                conteudo = "components"
                states={ {
                    activeTabIndex: Number(activeTabIndex),
                    setActiveTabIndex: setActiveTabIndex,
                    activeTitleTabIndex: activeTitleTabIndex,
                    setActiveTitleTabIndex: setActiveTitleTabIndex
                } }
                list={[
                    [
                        {
                            label: 'GRÁFICOS'
                        },
                        {
                            label: 'PESSOAS COM EXAME A SER REALIZADO'
                        },
                        {
                            label: 'PESSOAS EM DIA COM EXAME'
                        }
                    ],
                ]}
                titles={[
                    {
                        label: ''
                    },
                ]}
            />
        </>
        )
    }
}else{
    if(status !== "authenticated" && status !== "loading" ) signOut()
}
if(status=="unauthenticated") router.push('/')
}

export default Index;
