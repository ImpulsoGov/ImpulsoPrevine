import {
  CardAlert,
  TituloTexto, 
  ButtonLightSubmit, 
  TabelaGestantesImpressao,
  PanelSelector,
  Spinner
} from "@impulsogov/design-system";
import React, { useState, useEffect } from 'react';
import { useSession, signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { Imprimir } from "../../../helpers/imprimir"

import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { redirectHome } from "../../../helpers/redirectHome";
import { colunasGestantesEncerradasEquipe, colunasGestantesEquipe } from "../../../helpers/colunasGestantes";
import { colunasGestantesIndicadorUm } from "../../../helpers/colunasGestantesIndicadorUm";
import { colunasGestantesIndicadorDois } from "../../../helpers/colunasGestantesIndicadorDois";
import { colunasGestantesIndicadorTres } from "../../../helpers/colunasGestantesIndicadorTres";
import { GraficoIndicadorUmQuadriAtual, CardsGraficoIndicadorUmQuadriAtual } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/grafico_indicador_1_atual";
import { tabelaGestantesEquipe, tabelaGestantesAPS } from "../../../services/busca_ativa/Gestantes";
import { TabelaEquipeGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesAtivas";
import { TabelaEquipeGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesEncerradas";
import { TabelaEquipeGestantesSemDUM } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesSemDUM";
import { CardsEquipe } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/cardsEquipe";
import { IndicadorUmTabelaGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/tabelas/GestantesAtivas";
import { IndicadorUmTabelaGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/tabelas/GestantesEncerradas";
import { IndicadorDoisTabelaGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/tabelas/GestantesAtivas";
import { IndicadorDoisTabelaGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/tabelas/GestantesEncerradas";
import { IndicadorTresTabelaGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/tabelas/GestantesAtivas";
import { IndicadorTresTabelaGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/tabelas/GestantesEncerradas";
import { IndicadorUmCardsGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/cards/cardsGestantesAtivas";
import { IndicadorUmCardsGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/cards/cardsGestantesEncerradas";
import { IndicadorDoisCardsGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/cards/cardsGestantesAtivas";
import { IndicadorDoisCardsGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/cards/cardsGestantesEncerradas";
import { IndicadorTresCardsGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/cards/cardsGestantesAtivas";
import { IndicadorTresCardsGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/cards/cardsGestantesEncerradas";
import { TabelaGestantesSemDUM } from "../../../componentes/mounted/busca-ativa/gestantes/APS/GestantesSemDUM/GestantesSemDum";

import { CardsGraficoIndicadorDoisQuadriAtual, GraficoIndicadorDoisQuadriAtual } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/grafico_indicador_2_atual";
import { CardsGraficoIndicadorDoisQuadriFuturo, GraficoIndicadorDoisQuadriFuturo } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/grafico_indicador_2_futuro";
import { CardsGraficoIndicadorTresQuadriAtual, GraficoIndicadorTresQuadriAtual } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/grafico_indicador_3_atual";
import { CardsGraficoIndicadorTresQuadriFuturo, GraficoIndicadorTresQuadriFuturo } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/grafico_indicador_3_futuro";
import { CardsAPS } from "../../../componentes/mounted/busca-ativa/gestantes/APS/cardsAPS";
import { CardsGraficoIndicadorUmQuadriFuturo, GraficoIndicadorUmQuadriFuturo } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/grafico_indicador_1_futuro";
import mixpanel from "mixpanel-browser";
import MunicipioQuadrimestre from "../../../componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import { formatarQuadrimestres, obterDadosProximosQuadrimestres, obterDadosQuadrimestre } from "../../../utils/quadrimestre";
import {log_out} from "../../../hooks/log_out"
import { dispararEventoAbrirImpressaoAPS, dispararEventoAbrirImpressaoEquipe } from "../../../helpers/eventosImpressaoHotjar";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const redirect = redirectHome(ctx, session)
  if (redirect) return redirect
  const res = [
    await getData(LAYOUT),
  ]
  return {
    props: {
      res: res
    }
  }
}

const Index = ({ res }) => {
  const { data: session, status } = useSession()
  const [tabelaDataAPS, setTabelaDataAPS] = useState();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
  const [showSnackBar, setShowSnackBar] = useState({
    open: false
  })
  const [filtros_aplicados, setFiltros_aplicados] = useState(false)
  const [voltarGatilho, setVoltarGatilho] = useState(0);
  const PainelComLegenda = ({ children }) => {
    return (
      <div style={{ margin: "0 80px 40px", backgroundColor: '#D7F2F6', padding: "30px 0", borderRadius:"10px", fontSize: "13px", paddingLeft: "30px"}}>
        {children}
        <div>
          <strong style={{fontSize: "16px"}}>Legenda</strong>
          <br />
          <br />
          <b>IG: </b>Idade gestacional em semanas.
          <br />
          <br />
          <b>DPP: </b>Data provável do parto.
          <br />
          <br />
          <b>DUM: </b>Data da última menstruação informada pela paciente ou pela ultrassonografia.

        </div>
      </div>
    );
  };
  const PainelComLegendaIndUm = ({ children }) => {
    return (
      <div style={{ margin: "0 80px 40px", backgroundColor: '#D7F2F6', padding: "30px 0", borderRadius:"10px", fontSize: "13px", paddingLeft: "30px"}}>
        {children}
        <div >
          <strong style={{fontSize: "16px"}}>Legenda</strong>
          <br />
          <br />
          <b>IG: </b>Idade gestacional em semanas.
          <br />
          <br />
          <b>DPP: </b>Data provável do parto.
        </div>
      </div>
    );
  };
  const PainelComLegendaInd2e3 = ({ children }) => {
    return (
      <div style={{ margin: "0 80px 40px", backgroundColor: '#D7F2F6', padding: "30px 0", borderRadius:"10px", fontSize: "13px", paddingLeft: "30px"}}>
        {children}
        <div>
          <strong style={{fontSize: "16px"}}>Legenda</strong>
          <br />
          <br />
          <b>DPP: </b>Data provável do parto.
        </div>
      </div>
    );
  };

  const router = useRouter();
  let visao = null
  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        aba: activeTitleTabIndex,
        sub_aba: activeTabIndex,
        visao: visao
      }
    },
      undefined, { shallow: true }
    );
  }, [activeTabIndex, activeTitleTabIndex]);
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
  const colunasImpressao = {
    0 : colunasGestantesIndicadorUm,
    1 : colunasGestantesIndicadorDois,
    2 : colunasGestantesIndicadorTres,
    3 : colunasGestantesIndicadorUm
  }
  const colunasImpressaoEquipe = {
    0 : colunasGestantesEquipe,
    1 : colunasGestantesEquipe,
    2 : colunasGestantesEncerradasEquipe,
  }
  
const ImpressaoEquipe = (data)=> Imprimir(
  0.78,
  <TabelaGestantesImpressao data={data} colunas={colunasImpressaoEquipe[activeTabIndex]} fontFamily="sans-serif" />,
  "gestantes",
  activeTitleTabIndex,
  activeTabIndex,
  filtros_aplicados,
  setShowSnackBar
)   
const Voltar = ()=>{
  window.history.go(voltarGatilho*(-1))
}
useEffect(()=>{log_out(session)},[session])
useEffect(()=>{
  setVoltarGatilho(voltarGatilho+1)
},[router.asPath])
if(session){  
  if(session.user.perfis.includes(9)){
    visao = "equipe"
    const dataAtual = Date.now();
    const Children = [[
      [
        <CardsEquipe tabelaDataEquipe={tabelaDataEquipe}/>,
        <TabelaEquipeGestantesAtivas
          tabelaDataEquipe={tabelaDataEquipe}
          tabelaData={tabelaData}
          setTabelaData={setTabelaData}
          trackObject={mixpanel}
          aba={activeTitleTabIndex}
          sub_aba={activeTabIndex}
          showSnackBar={showSnackBar}
          setShowSnackBar={setShowSnackBar}
          setFiltros_aplicados={setFiltros_aplicados}
          liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
        />,
        <PainelComLegenda />
      ],
      [
        <CardsEquipe tabelaDataEquipe={tabelaDataEquipe}/>,
        <TabelaEquipeGestantesSemDUM
          tabelaDataEquipe={tabelaDataEquipe}
          tabelaData={tabelaData}
          setTabelaData={setTabelaData}
          mixpanel={mixpanel}
          aba={activeTitleTabIndex}
          sub_aba={activeTabIndex}
          showSnackBar={showSnackBar}
          setShowSnackBar={setShowSnackBar}
          setFiltros_aplicados={setFiltros_aplicados}
          liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
        />,
        <PainelComLegenda />
      ],
      [
        <CardsEquipe tabelaDataEquipe={tabelaDataEquipe}/>,
        <TabelaEquipeGestantesEncerradas
          tabelaDataEquipe={tabelaDataEquipe}
          tabelaData={tabelaData}
          setTabelaData={setTabelaData}
          trackObject={mixpanel}
          aba={activeTitleTabIndex}
          sub_aba={activeTabIndex}
          showSnackBar={showSnackBar}
          setShowSnackBar={setShowSnackBar}
          setFiltros_aplicados={setFiltros_aplicados}
          liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
        />,
        <PainelComLegenda />
      ]
    ]]
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
              titulo="Lista Nominal de Pré-Natal"
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
    if (session.user.perfis.includes(5) || session.user.perfis.includes(8)) {
      visao = "aps"
      const dataAtual = Date.now();
      const quadriAtualFormatado = dataAtual
        ? `${formatarQuadrimestres([obterDadosQuadrimestre(dataAtual)])}`
        : "";
      const quadrisFuturosFormatados = dataAtual
        ? formatarQuadrimestres(obterDadosProximosQuadrimestres(dataAtual), ' + ')
        : "";
      const Children = [
        [
          [
            <CardsGraficoIndicadorUmQuadriAtual tabelaDataAPS={tabelaDataAPS} />,
            <GraficoIndicadorUmQuadriAtual tabelaDataAPS={tabelaDataAPS} />,
          ],
          [
            <CardsGraficoIndicadorUmQuadriFuturo tabelaDataAPS={tabelaDataAPS} />,
            <GraficoIndicadorUmQuadriFuturo tabelaDataAPS={tabelaDataAPS} />,
          ],
          [
            <IndicadorUmCardsGestantesAtivas tabelaDataAPS={tabelaDataAPS} />,
            <IndicadorUmTabelaGestantesAtivas
              tabelaDataAPS={tabelaDataAPS}
              tabelaData={tabelaData}
              setTabelaData={setTabelaData}
              trackObject={mixpanel}
              aba={activeTitleTabIndex}
              sub_aba={activeTabIndex}
              liberarPesquisa={dispararEventoAbrirImpressaoAPS}
              showSnackBar={showSnackBar}
              setShowSnackBar={setShowSnackBar}
              setFiltros_aplicados={setFiltros_aplicados}
            />,
            <PainelComLegendaIndUm />
          ],
          [
            <IndicadorUmCardsGestantesEncerradas tabelaDataAPS={tabelaDataAPS} />,
            <IndicadorUmTabelaGestantesEncerradas
              tabelaDataAPS={tabelaDataAPS}
              tabelaData={tabelaData}
              setTabelaData={setTabelaData}
              trackObject={mixpanel}
              aba={activeTitleTabIndex}
              sub_aba={activeTabIndex}
              liberarPesquisa={dispararEventoAbrirImpressaoAPS}
              showSnackBar={showSnackBar}
              setShowSnackBar={setShowSnackBar}
              setFiltros_aplicados={setFiltros_aplicados}
            />,
            <PainelComLegendaIndUm />
          ],
        ],
        [
          [
            <CardsGraficoIndicadorDoisQuadriAtual tabelaDataAPS={tabelaDataAPS} />,
            <GraficoIndicadorDoisQuadriAtual tabelaDataAPS={tabelaDataAPS} />,
          ],
          [
            <CardsGraficoIndicadorDoisQuadriFuturo tabelaDataAPS={tabelaDataAPS} />,
            <GraficoIndicadorDoisQuadriFuturo tabelaDataAPS={tabelaDataAPS} />,
          ],
          [
            <IndicadorDoisCardsGestantesAtivas tabelaDataAPS={tabelaDataAPS} />,
            <IndicadorDoisTabelaGestantesAtivas
              tabelaDataAPS={tabelaDataAPS}
              tabelaData={tabelaData}
              setTabelaData={setTabelaData}
              trackObject={mixpanel}
              aba={activeTitleTabIndex}
              sub_aba={activeTabIndex}
              liberarPesquisa={dispararEventoAbrirImpressaoAPS}
              showSnackBar={showSnackBar}
              setShowSnackBar={setShowSnackBar}
              setFiltros_aplicados={setFiltros_aplicados}
            />,
            <PainelComLegendaInd2e3 />
          ],
          [
            <IndicadorDoisCardsGestantesEncerradas tabelaDataAPS={tabelaDataAPS} />,
            <IndicadorDoisTabelaGestantesEncerradas
              tabelaDataAPS={tabelaDataAPS}
              tabelaData={tabelaData}
              setTabelaData={setTabelaData}
              trackObject={mixpanel}
              aba={activeTitleTabIndex}
              sub_aba={activeTabIndex}
              liberarPesquisa={dispararEventoAbrirImpressaoAPS}
              showSnackBar={showSnackBar}
              setShowSnackBar={setShowSnackBar}
              setFiltros_aplicados={setFiltros_aplicados}
            />,
            <PainelComLegendaInd2e3 />
          ],
        ],
        [
          [
            <CardsGraficoIndicadorTresQuadriAtual tabelaDataAPS={tabelaDataAPS} />,
            <GraficoIndicadorTresQuadriAtual tabelaDataAPS={tabelaDataAPS} />,
          ],
          [
            <CardsGraficoIndicadorTresQuadriFuturo tabelaDataAPS={tabelaDataAPS} />,
            <GraficoIndicadorTresQuadriFuturo tabelaDataAPS={tabelaDataAPS} />,
          ],
          [
            <IndicadorTresCardsGestantesAtivas tabelaDataAPS={tabelaDataAPS} />,
            <IndicadorTresTabelaGestantesAtivas
              tabelaDataAPS={tabelaDataAPS}
              tabelaData={tabelaData}
              setTabelaData={setTabelaData}
              trackObject={mixpanel}
              aba={activeTitleTabIndex}
              sub_aba={activeTabIndex}
              liberarPesquisa={dispararEventoAbrirImpressaoAPS}
              showSnackBar={showSnackBar}
              setShowSnackBar={setShowSnackBar}
              setFiltros_aplicados={setFiltros_aplicados}
            />,
            <PainelComLegendaInd2e3 />
          ],
          [
            <IndicadorTresCardsGestantesEncerradas tabelaDataAPS={tabelaDataAPS} />,
            <IndicadorTresTabelaGestantesEncerradas
              tabelaDataAPS={tabelaDataAPS}
              tabelaData={tabelaData}
              setTabelaData={setTabelaData}
              trackObject={mixpanel}
              aba={activeTitleTabIndex}
              sub_aba={activeTabIndex}
              liberarPesquisa={dispararEventoAbrirImpressaoAPS}
              showSnackBar={showSnackBar}
              setShowSnackBar={setShowSnackBar}
              setFiltros_aplicados={setFiltros_aplicados}
            />,
            <PainelComLegendaInd2e3 />
          ],
        ],
        [
          <>
          <TabelaGestantesSemDUM
            tabelaDataAPS={tabelaDataAPS}
            tabelaData={tabelaData}
            setTabelaData={setTabelaData}
            trackObject={mixpanel}
            aba={activeTitleTabIndex}
            sub_aba={activeTabIndex}
            liberarPesquisa={dispararEventoAbrirImpressaoAPS}
            showSnackBar={showSnackBar}
            setShowSnackBar={setShowSnackBar}
            setFiltros_aplicados={setFiltros_aplicados}
          />
          <PainelComLegenda />
        </>
        ],
      ]

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
            titulo="Lista Nominal de Pré-Natal"
            texto=""
            imagem={{ posicao: null, url: '' }}
          />
          <CardAlert
            destaque="IMPORTANTE: "
            msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
          />
          <MunicipioQuadrimestre data={dataAtual} />
          <CardsAPS tabelaDataAPS={tabelaDataAPS} />
          <PanelSelector
            breakLines
            components={Children}
            conteudo="components"
            states={{
              activeTabIndex: Number(activeTabIndex),
              setActiveTabIndex: setActiveTabIndex,
              activeTitleTabIndex: activeTitleTabIndex,
              setActiveTitleTabIndex: setActiveTitleTabIndex
            }}
            list={[
              [
                {
                  label: `GRÁFICO ${quadriAtualFormatado}`

                },
                {
                  label: `GRÁFICO ${quadrisFuturosFormatados}`
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
                  label: `GRÁFICO ${quadriAtualFormatado}`
                },
                {
                  label: `GRÁFICO ${quadrisFuturosFormatados}`
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
                  label: `GRÁFICO ${quadriAtualFormatado}`
                },
                {
                  label: `GRÁFICO ${quadrisFuturosFormatados}`
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
              ]

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
  } else {
    if (status !== "authenticated" && status !== "loading") signOut()
  }
  if (status == "unauthenticated") router.push('/')
}

export default Index;
