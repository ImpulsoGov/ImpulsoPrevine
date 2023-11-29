import { 
  CardAlert,
  TituloTexto, 
  ButtonLight, 
  PainelBuscaAtiva , 
  ScoreCardGrid , 
  Spinner, 
  ButtonPrint,
  TabelaCitoImpressao,
  PanelSelector
} from "@impulsogov/design-system";
import React, { useState,useEffect } from 'react';
import { useSession,signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router';

import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { redirectHome } from "../../../helpers/redirectHome";
import { colunasGestantes } from "../../../helpers/colunasGestantes";
import { GraficoIndicadorUm, CardsGraficoIndicadorUm } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/grafico_indicador_1";
import { tabelaGestantesEquipe , tabelaGestantesAPS } from "../../../services/busca_ativa/Gestantes";
import { TabelaEquipeGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesAtivas";
import { TabelaEquipeGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesEncerradas";
import { TabelaEquipeGestantesSemDUM } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesSemDUM";
import { CardsEquipe } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/cardsEquipe";
import { IndicadorUmTabelaGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/tabelas/GestantesAtivas";
import { IndicadorUmTabelaGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/tabelas/GestantesEncerradas";
import { IndicadorUmTabelaGestantesSemDUM } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/tabelas/GestantesSemDum";
import { IndicadorDoisTabelaGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/tabelas/GestantesAtivas";
import { IndicadorDoisTabelaGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/tabelas/GestantesEncerradas";
import { IndicadorDoisTabelaGestantesSemDUM } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/tabelas/GestantesSemDum";
import { IndicadorTresTabelaGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/tabelas/GestantesAtivas";
import { IndicadorTresTabelaGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/tabelas/GestantesEncerradas";
import { IndicadorTresTabelaGestantesSemDUM } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/tabelas/GestantesSemDum";
import { IndicadorUmCardsGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/cards/cardsGestantesAtivas";
import { IndicadorUmCardsGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/cards/cardsGestantesEncerradas";
import { IndicadorDoisCardsGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/cards/cardsGestantesAtivas";
import { IndicadorDoisCardsGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/cards/cardsGestantesEncerradas";
import { IndicadorTresCardsGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/cards/cardsGestantesAtivas";
import { IndicadorTresCardsGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/cards/cardsGestantesEncerradas";
import { TabelaGestantesSemDUM } from "../../../componentes/mounted/busca-ativa/gestantes/APS/GestantesSemDUM/GestantesSemDum";

import status_usuario_descricao  from "../../../data/StatusAcompanhamento.json" assert { type: 'json' };
import identificacao_exame_hiv_sifilis  from "../../../data/identificacao_exame_hiv_sifilis.json" assert { type: 'json' };
import { CardsGraficoIndicadorDois, GraficoIndicadorDois } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/grafico_indicador_2";
import { CardsGraficoIndicadorTres, GraficoIndicadorTres } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/grafico_indicador_3";
import { CardsAPS } from "../../../componentes/mounted/busca-ativa/gestantes/APS/cardsAPS";


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
const [tabelaDataAPS, setTabelaDataAPS] = useState();
const [tokenValido, setTokenValido] = useState();
const [activeTabIndex, setActiveTabIndex] = useState(0);
const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
const router = useRouter();

useEffect(() => {
  router.push({
    pathname: router.pathname,
    query: { aba: activeTabIndex }
  },
    undefined, { shallow: true }
  );
}, [activeTabIndex]);

const GestantesTabelaDataAPS = async()=> await tabelaGestantesAPS(session?.user?.municipio_id_sus,session?.user?.access_token)
useEffect(()=>{
  session && (session.user.perfis.includes(8) || session.user.perfis.includes(5)) &&
  GestantesTabelaDataAPS().then((response)=>{
  setTabelaDataAPS(response)
})},[session]) 

const [tabelaDataEquipe, setTabelaDataEquipe] = useState([]);
const GestantesTabelaDataEquipe = async()=> await tabelaGestantesEquipe(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
useEffect(()=>{
  session &&  session.user.perfis.includes(9) &&
  GestantesTabelaDataEquipe().then((response)=>{
    setTabelaDataEquipe(response.data)
})},[session]) 
const [tabelaData, setTabelaData] = useState([]);
const datefiltrosGestantes = [
    "gestacao_data_dpp",
    "consulta_prenatal_ultima_data",
]
const rotulosfiltrosGestantes = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "DPP MAIS PRÓXIMA",
    "IG ATUAL MAIOR",
    "MAIOR Nº TOTAL DE CONSULTAS",
    "DATA MAIS RECENTE DA ÚLTIMA CONSULTA"
]
const IDFiltrosGestantes = {
    "NOMES DE A-Z" : "cidadao_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "acs_nome",
    "DPP MAIS PRÓXIMA" : "gestacao_data_dpp",
    "IG ATUAL MAIOR" : "gestacao_idade_gestacional_atual",
    "MAIOR Nº TOTAL DE CONSULTAS" : "consultas_pre_natal_validas",
    "DATA MAIS RECENTE DA ÚLTIMA CONSULTA" : "consulta_prenatal_ultima_data"
}   
const IDFiltrosOrdenacaoGestantes = {
    "NOMES DE A-Z" : "asc",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "asc",
    "DPP MAIS PRÓXIMA" : "asc",
    "IG ATUAL MAIOR" : "desc",
    "MAIOR Nº TOTAL DE CONSULTAS" : "desc",
    "DATA MAIS RECENTE DA ÚLTIMA CONSULTA" : "desc"
}
if(session){  
  if(session.user.perfis.includes(9)){
      const CardsChild = tabelaDataEquipe ? <ScoreCardGrid
      valores={[
          {
              descricao: 'Total de gestantes',
              valor: [...new Set(tabelaDataEquipe.map(item => item.chave_id_gestacao))].length
          },
          {
              descricao: 'Total de gestantes ativas',
              valor: tabelaDataEquipe.filter(item=> item.id_status_usuario == 8).length
          },
          {
            descricao: 'Total de getantes ativas contabilizando para os três indicadores',
            valor: tabelaDataEquipe.filter(item=>{ 
            return(
              item.id_status_usuario == 8
              && item.consultas_pre_natal_validas >= 6
              && item.gestacao_idade_gestacional_primeiro_atendimento <= 12
              && item.id_exame_hiv_sifilis == 4
              && item.id_atendimento_odontologico == 1
            )}).length
          },
          {
            descricao: 'Gestantes ativas, com 6 ou mais consultas, com a primeira consulta realizada até a 12ª semana de gestação',
            valor: tabelaDataEquipe.filter((item)=>{ 
            return (
              item.id_status_usuario == 8
              && item.consultas_pre_natal_validas >=6
              && item.gestacao_idade_gestacional_primeiro_atendimento <= 12
            )}).length
          },
          {
            descricao: 'Gestantes ativas, com atendimento odontológico realizado',
            valor: tabelaDataEquipe.filter((item)=>{ 
            return (
              item.id_status_usuario == 8
              && item.id_atendimento_odontologico == 1) 
            }).length
          },
          {
            descricao: 'Gestantes ativas, com os dois exames realizados e identificados',
            valor: tabelaDataEquipe.filter((item)=>{ 
            return ( 
              item.id_status_usuario == 8
              && item.id_exame_hiv_sifilis == 4)
            }).length
          },
    ]}
      /> : <Spinner/>
  const tabelaDataEquipeGestantesAtivas = tabelaDataEquipe.filter(item=>item.id_status_usuario == 8)
  const TabelaChildGestantesAtivas = tabelaDataEquipeGestantesAtivas && tabelaDataEquipeGestantesAtivas.length>0 && tabelaDataEquipe && tabelaData ? 
  <>
  <PainelBuscaAtiva
      key="TabelaChildGestantesAtivas"
      dadosFiltros={[
        {
          data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.acs_nome))],
          filtro: 'acs_nome',
          rotulo: 'Filtrar por Profissional Responsável'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.consultas_pre_natal_validas.toString()))],
            filtro: 'consultas_pre_natal_validas',
            rotulo: 'Filtrar por numero de consultas'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.id_atendimento_odontologico.toString()))],
            labels : {1 : "Sim", 2 : "Não"},
            filtro: 'id_atendimento_odontologico',
            rotulo: 'Filtrar por atendimento odontológico'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.id_exame_hiv_sifilis.toString()))],
            labels : [...new Set(identificacao_exame_hiv_sifilis.identificacao_exame_hiv_sifilis.map(item=> item.exame_hiv_sifilis_descricao))],
            filtro: 'id_exame_hiv_sifilis',
            rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
        },
        {
          data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.gestacao_quadrimestre))],
          filtro: 'gestacao_quadrimestre',
          rotulo: 'Filtrar por quadrimestre'
        },
      ]}
      painel="gestantes"
      tabela={{
      colunas: colunasGestantes,
      data:tabelaDataEquipeGestantesAtivas
      }}
      data={tabelaData}
      setData={setTabelaData}
      datefiltros={datefiltrosGestantes}
      IDFiltros={IDFiltrosGestantes}
      rotulosfiltros={rotulosfiltrosGestantes}    
      IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
      rowHeight={65}
      atualizacao = {new Date(tabelaDataEquipeGestantesAtivas.reduce((maisRecente, objeto) => {
        const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
        const dataMaisRecenteAnterior = new Date(maisRecente);
        return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
        }, "2000-01-01")).toLocaleString('pt-BR', { 
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        })}
  /></> : <Spinner />
  
  const tabelaDataEquipeGestantesSemDUM = tabelaDataEquipe.filter(item=>item.id_status_usuario == 11)
  const TabelaChildGestantesSemDUM = tabelaDataEquipeGestantesSemDUM && tabelaDataEquipeGestantesSemDUM.length>0 && tabelaDataEquipe && tabelaData ? 
  <>
  <PainelBuscaAtiva
      key="TabelaChildGestantesSemDUM"
      dadosFiltros={[
        {
          data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.acs_nome))],
          filtro: 'acs_nome',
          rotulo: 'Filtrar por Profissional Responsável'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.consultas_pre_natal_validas?.toString()))],
            filtro: 'consultas_pre_natal_validas',
            rotulo: 'Filtrar por numero de consultas'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.id_atendimento_odontologico?.toString()))],
            filtro: 'id_atendimento_odontologico',
            rotulo: 'Filtrar por atendimento odontológico'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.id_exame_hiv_sifilis?.toString()))],
            filtro: 'id_exame_hiv_sifilis',
            rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
        },
        {
          data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.gestacao_quadrimestre))],
          filtro: 'gestacao_quadrimestre',
          rotulo: 'Filtrar por quadrimestre'
        },
      ]}
      painel="gestantes"
      tabela={{
      colunas: colunasGestantes,
      data:tabelaDataEquipeGestantesSemDUM
      }}
      data={tabelaData}
      setData={setTabelaData}
      datefiltros={datefiltrosGestantes}
      IDFiltros={IDFiltrosGestantes}
      rotulosfiltros={rotulosfiltrosGestantes}    
      IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
      atualizacao = {new Date(tabelaDataEquipeGestantesSemDUM.reduce((maisRecente, objeto) => {
        const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
        const dataMaisRecenteAnterior = new Date(maisRecente);
        return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
        }, "2000-01-01")).toLocaleString('pt-BR', { 
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        })}

  /></> : <Spinner/>

  const tabelaDataEquipeGestantesEncerradas = tabelaDataEquipe?.filter(item=>item.id_status_usuario == 9)
  const TabelaChildGestantesEncerradas = tabelaDataEquipeGestantesEncerradas && tabelaDataEquipeGestantesEncerradas.length>0 && tabelaDataEquipe && tabelaData ? 
  <>
  <PainelBuscaAtiva
      key="TabelaChildGestantesEncerradas"
      dadosFiltros={[
        {
          data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.acs_nome))],
          filtro: 'acs_nome',
          rotulo: 'Filtrar por Profissional Responsável'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.consultas_pre_natal_validas.toString()))],
            filtro: 'consultas_pre_natal_validas',
            rotulo: 'Filtrar por numero de consultas'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.id_atendimento_odontologico.toString()))],
            filtro: 'id_atendimento_odontologico',
            rotulo: 'Filtrar por atendimento odontológico'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.id_exame_hiv_sifilis.toString()))],
            filtro: 'id_exame_hiv_sifilis',
            rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
        },
        {
          data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.gestacao_quadrimestre))],
          filtro: 'gestacao_quadrimestre',
          rotulo: 'Filtrar por quadrimestre'
        },
      ]}
      painel="gestantes"
      tabela={{
      colunas: colunasGestantes,
      data:tabelaDataEquipeGestantesEncerradas
      }}
      data={tabelaData}
      setData={setTabelaData}
      datefiltros={datefiltrosGestantes}
      IDFiltros={IDFiltrosGestantes}
      rotulosfiltros={rotulosfiltrosGestantes}    
      IDFiltrosOrdenacao={IDFiltrosOrdenacaoGestantes}
      atualizacao = {new Date(tabelaDataEquipeGestantesEncerradas.reduce((maisRecente, objeto) => {
        const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
        const dataMaisRecenteAnterior = new Date(maisRecente);
        return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
        }, "2000-01-01")).toLocaleString('pt-BR', { 
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        })}

  /></> : <Spinner/>
  const Children = [[
    [
        <CardsEquipe tabelaDataEquipe={tabelaDataEquipe}/>,
        <TabelaEquipeGestantesAtivas tabelaDataEquipe={tabelaDataEquipe} tabelaData={tabelaData} setTabelaData={setTabelaData}/>
    ],
    [
        <CardsEquipe tabelaDataEquipe={tabelaDataEquipe}/>,
        <TabelaEquipeGestantesSemDUM tabelaDataEquipe={tabelaDataEquipe} tabelaData={tabelaData} setTabelaData={setTabelaData}/>
    ],
    [
        <CardsEquipe tabelaDataEquipe={tabelaDataEquipe}/>,
        <TabelaEquipeGestantesEncerradas tabelaDataEquipe={tabelaDataEquipe} tabelaData={tabelaData} setTabelaData={setTabelaData}/>
    ]
]]

  return (
      <>
      <div 
          style={
              window.screen.width > 1024 ?
              {padding: "30px 80px 30px 80px",display: "flex"} :
              {padding: "0",display: "flex"} 
          }>
          <ButtonLight icone={{posicao: 'right',
          url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
          label="VOLTAR" link="/inicio"/>
      {
          tabelaDataEquipe &&
          <div style={{marginLeft:"auto"}}>
          <ButtonPrint
              label="CLIQUE AQUI PARA IMPRIMIR"
              escala="0.78"
              child={<TabelaCitoImpressao data={tabelaData} colunas={colunasGestantes} status_usuario_descricao={status_usuario_descricao}/>}
          />
          </div>
      }
      </div>
      <TituloTexto
              titulo="Lista Nominal de Gestantes"
              texto=""
              imagem = {{posicao: null,url: ''}}
      />
      <CardAlert
              destaque="IMPORTANTE: "
              msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
      />  
      <div 
          style={{
              marginLeft : "80px",
              marginTop : "30px",
              color: "#1F1F1F",
              fontSize: "22px",
              fontFamily: "Inter",
              fontWeight: 500,
              lineHeight: "130%",
          }}
      >
          {session.user.municipio} - Q2/23
      </div>
      {
          tabelaData &&
          <PanelSelector
          components={Children}
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
                      label: 'GESTANTES ATIVAS'
                  },
                  {
                      label: 'GESTANTES SEM DUM'
                  },
                  {
                    label: 'GESTANTES ENCERRADAS'
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
    const Children = [
        [
            [
                <CardsGraficoIndicadorUm tabelaDataAPS={tabelaDataAPS}/>,
                <GraficoIndicadorUm tabelaDataAPS={tabelaDataAPS}/>,
            ],
            [
                <IndicadorUmCardsGestantesAtivas tabelaDataAPS={tabelaDataAPS}/>,
                <IndicadorUmTabelaGestantesAtivas 
                    tabelaDataAPS={tabelaDataAPS} 
                    tabelaData={tabelaData} 
                    setTabelaData={setTabelaData}
                />
            ],
            [
                <IndicadorUmCardsGestantesEncerradas tabelaDataAPS={tabelaDataAPS}/>,
                <IndicadorUmTabelaGestantesEncerradas 
                    tabelaDataAPS={tabelaDataAPS} 
                    tabelaData={tabelaData} 
                    setTabelaData={setTabelaData}
                />,
            ],
        ],
        [
            [
                <CardsGraficoIndicadorDois tabelaDataAPS={tabelaDataAPS}/>,
                <GraficoIndicadorDois tabelaDataAPS={tabelaDataAPS}/>,
            ],
            [
                <IndicadorDoisCardsGestantesAtivas tabelaDataAPS={tabelaDataAPS}/>,
                <IndicadorDoisTabelaGestantesAtivas 
                    tabelaDataAPS={tabelaDataAPS} 
                    tabelaData={tabelaData} 
                    setTabelaData={setTabelaData}
                />,
            ],
            [
                <IndicadorDoisCardsGestantesEncerradas tabelaDataAPS={tabelaDataAPS}/>,
                <IndicadorDoisTabelaGestantesEncerradas 
                tabelaDataAPS={tabelaDataAPS} 
                tabelaData={tabelaData} 
                setTabelaData={setTabelaData}
            />,
            ],
        ],
        [
            [
                <CardsGraficoIndicadorTres tabelaDataAPS={tabelaDataAPS}/>,
                <GraficoIndicadorTres tabelaDataAPS={tabelaDataAPS}/>,
            ],
            [
                <IndicadorTresCardsGestantesAtivas tabelaDataAPS={tabelaDataAPS}/>,
                <IndicadorTresTabelaGestantesAtivas 
                    tabelaDataAPS={tabelaDataAPS} 
                    tabelaData={tabelaData} 
                    setTabelaData={setTabelaData}
            />,
            ],
            [
                <IndicadorTresCardsGestantesEncerradas tabelaDataAPS={tabelaDataAPS}/>,
                <IndicadorTresTabelaGestantesEncerradas 
                tabelaDataAPS={tabelaDataAPS} 
                tabelaData={tabelaData} 
                setTabelaData={setTabelaData}
                />,
            ],
        ],
        [
          <TabelaGestantesSemDUM 
            tabelaDataAPS={tabelaDataAPS} 
            tabelaData={tabelaData} 
            setTabelaData={setTabelaData}
          />
        ]
    ]

    return (
    <>
        <div 
            style={
                window.screen.width > 1024 ?
                {padding: "30px 80px 30px 80px",display: "flex"} :
                {padding: "30px 0 0 5px",display: "flex"} 
            }
        >
            <ButtonLight icone={{posicao: 'right',
                url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
                label="VOLTAR" link="/inicio"
            />
        {
            tabelaDataAPS &&
            <div style={{marginLeft:"auto"}}>
            <ButtonPrint
                label="CLIQUE AQUI PARA IMPRIMIR"
                escala="0.78"
                child={<TabelaCitoImpressao data={tabelaData} colunas={colunasGestantes} status_usuario_descricao={status_usuario_descricao}/>}
            />
            </div>
        }
        </div>
        <TituloTexto
                titulo="Lista Nominal de Gestantes"
                texto=""
                imagem = {{posicao: null,url: ''}}
        />
        <CardAlert
            destaque="IMPORTANTE: "
            msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
        />  
        <div 
            style={{
                marginLeft : window.screen.width > 1024 ?  "80px" : "20px",
                marginTop : "30px",
                color: "#1F1F1F",
                fontSize: "22px",
                fontFamily: "Inter",
                fontWeight: 500,
                lineHeight: "130%",
            }}
        >
        {session.user.municipio} - Q3/23
        </div>
        <CardsAPS tabelaDataAPS={tabelaDataAPS}/>
        <PanelSelector
            components={Children}
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
                    label: 'GESTANTES ATIVAS'
                  },
                  {
                    label: 'GESTANTES ENCERRADAS'
                  },
                ],
                [
                    {
                      label: 'GRÁFICOS'
                    },
                    {
                      label: 'GESTANTES ATIVAS'
                    },
                    {
                      label: 'GESTANTES ENCERRADAS'
                    },
                  ],
                  [
                    {
                      label: 'GRÁFICOS'
                    },
                    {
                      label: 'GESTANTES ATIVAS'
                    },
                    {
                      label: 'GESTANTES ENCERRADAS'
                    },
                  ],
                  [
                    {
                      label: 'GESTANTES SEM DUM'
                    },
                  ],
                  ]}
              titles={[
                {
                    label: 'INDICADOR 1 (6 CONSULTAS)'
                },
                {
                    label: 'INDICADOR 2 (EXAME DE HIV E SÍFILIS)'
                },
                {
                    label: 'INDICADOR 3 (ATENDIMENTO ODONTO)'
                },
                {
                  label: 'GESTANTES SEM DUM'
                },

            ]}
        />
    </>
    )
  }
    }else{
        if(status !== "authenticated" && status !== "loading" ) signOut()
    }

}

export default Index;
