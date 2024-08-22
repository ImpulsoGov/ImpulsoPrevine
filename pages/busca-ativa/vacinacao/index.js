import { 
    CardAlert,
    TituloTexto, 
    ButtonLightSubmit, 
    TabelaVacinacaoImpressao,
    PanelSelector,
  } from "@impulsogov/design-system";
import React, { useState,useEffect } from 'react';
import { useSession,signOut, getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { Imprimir } from "../../../helpers/imprimir"

import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { redirectHome } from "../../../helpers/redirectHome";
import { tabelaVacinacaoEquipe , tabelaVacinacaoAPS } from "../../../services/busca_ativa/Vacinacao";
import { GraficoAPSQuadrimestreAtual, CardsGraficoAPSQuadrimestreAtual } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_atual/graficoQuadrimestreAtual";
import { TabelaAPSQuadrimestreAtual } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_atual/tabelaQuadrimestreAtual";
import { GraficoAPSQuadrimestreProximo, CardsGraficoAPSQuadrimestreProximo } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/proximo_quadrimestre/graficoQuadrimestreProximo";
import { TabelaAPSQuadrimestreProximo } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/proximo_quadrimestre/tabelaQuadrimestreProximo";
import { GraficoAPSQuadrimestreFuturo, CardsGraficoAPSQuadrimestreFuturo } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_futuro/graficoQuadrimestreFuturo";
import { TabelaAPSQuadrimestreFuturo } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_futuro/tabelaQuadrimestreFuturo";

import { TabelaAPSQuadrimestreAtual as TabelaEquipeQuadrimestreAtual } from "../../../componentes/mounted/busca-ativa/vacinacao/equipe/quadrimestre_atual/tabelaQuadrimestreAtual";
import { TabelaAPSQuadrimestreProximo as TabelaEquipeQuadrimestreProximo } from "../../../componentes/mounted/busca-ativa/vacinacao/equipe/proximo_quadrimestre/tabelaQuadrimestreProximo";
import { TabelaAPSQuadrimestreFuturo as TabelaEquipeQuadrimestreFuturo } from "../../../componentes/mounted/busca-ativa/vacinacao/equipe/quadrimestre_futuro/tabelaQuadrimestreFuturo";
import {log_out} from "../../../hooks/log_out"

import { colunasVacinacaoAPS, colunasVacinacaoEquipe } from "../../../helpers/colunasVacinacao";
import { dispararEventoAbrirImpressaoAPS } from "../../../helpers/eventosImpressaoHotjar";
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
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTitleTabIndex, setActiveTitleTabIndex] = useState(0);
  const [filtros_aplicados,setFiltros_aplicados] = useState(false);
  const [voltarGatilho,setVoltarGatilho] = useState(0);

  const [showSnackBar,setShowSnackBar] = useState({
    open : false,
    message : "",
    color : "",
    background : "",
  })
  const router = useRouter();
  let visao
  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { 
        sub_aba: activeTabIndex,
        aba : activeTitleTabIndex,
        visao : visao
      }
    },
      undefined, { shallow: true }
    );
  }, [activeTabIndex,activeTitleTabIndex]);
  
  const VacinacaoTabelaDataAPS = async()=> await tabelaVacinacaoAPS(session?.user?.municipio_id_sus,session?.user?.access_token)
  useEffect(()=>{
    session && (session.user.perfis.includes(8) || session.user.perfis.includes(5)) &&
    VacinacaoTabelaDataAPS().then((response)=>{
    setTabelaDataAPS(response)
  })},[session]) 
  const [tabelaDataEquipe, setTabelaDataEquipe] = useState([]);
  const VacinacaoTabelaDataEquipe = async()=> await tabelaVacinacaoEquipe(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
  useEffect(()=>{
    session &&  session.user.perfis.includes(9) &&
    VacinacaoTabelaDataEquipe().then((response)=>{
      setTabelaDataEquipe(response)
  })},[session]) 
  const [tabelaData, setTabelaData] = useState([]);

  const ImpressaoVacinacaoEquipe = (data)=> Imprimir(
    1,
    <TabelaVacinacaoImpressao data={data} colunas={colunasVacinacaoEquipe} fontFamily="sans-serif" />,
    "vacinacao",
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
    if(session.user.perfis.includes(9) && tabelaDataEquipe){
    visao = "equipe"
    const Children =  
    [
      [
          [
            <TabelaEquipeQuadrimestreAtual
                tabelaDataAPS={tabelaDataEquipe} 
                tabelaData={tabelaData} 
                setTabelaData={setTabelaData}
                onPrintClick={ImpressaoVacinacaoEquipe}
                showSnackBar={showSnackBar}
                setFiltros_aplicados={setFiltros_aplicados}
                setShowSnackBar={setShowSnackBar}
            />
          ],
      ],
      [
        [
          <TabelaEquipeQuadrimestreProximo
              tabelaDataAPS={tabelaDataEquipe} 
              tabelaData={tabelaData} 
              setTabelaData={setTabelaData}
              onPrintClick={ImpressaoVacinacaoEquipe}
              showSnackBar={showSnackBar}
              setFiltros_aplicados={setFiltros_aplicados}
              setShowSnackBar={setShowSnackBar}
          />
        ],
    ],
    [
      [
        <TabelaEquipeQuadrimestreFuturo
            tabelaDataAPS={tabelaDataEquipe} 
            tabelaData={tabelaData} 
            setTabelaData={setTabelaData}
            onPrintClick={ImpressaoVacinacaoEquipe}
            showSnackBar={showSnackBar}
            setFiltros_aplicados={setFiltros_aplicados}
            setShowSnackBar={setShowSnackBar}
        />
      ],
  ],
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
                <ButtonLightSubmit 
                    icon='https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'
                    label="VOLTAR" 
                    submit={Voltar}
                />
          </div>
          <TituloTexto
                  titulo="Lista Nominal de Vacinação - Equipe"
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
          {session.user.municipio}
          </div>
          {
            session?.user && tabelaDataEquipe.length > 0 &&
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
                        label: 'LISTA NOMINAL'
                      },
                    ],  
                    [
                      {
                        label: 'LISTA NOMINAL'
                      },
                    ],  
                    [
                      {
                        label: 'LISTA NOMINAL'
                      },
                    ],  
                      ]}
                  titles={[
                    {
                        label: 'QUADRIMESTRE ATUAL'
                    },
                    {
                        label: 'PRÓXIMO QUADRIMESTRE'
                    },
                    {
                        label: 'QUADRIMESTRES FUTUROS'
                    },
    
                ]}
            />
          }
      </>
      )
    }
    if(session.user.perfis.includes(5) || session.user.perfis.includes(8)){
      visao = "aps"
      const Children = [
          [
              [
                <CardsGraficoAPSQuadrimestreAtual tabelaDataAPS={tabelaDataAPS}/>,
                <GraficoAPSQuadrimestreAtual tabelaDataAPS={tabelaDataAPS}/>,
              ],
              [
                <TabelaAPSQuadrimestreAtual
                    tabelaDataAPS={tabelaDataAPS} 
                    tabelaData={tabelaData} 
                    setTabelaData={setTabelaData}
                    liberarPesquisa={dispararEventoAbrirImpressaoAPS}
                    showSnackBar={showSnackBar}
                    setFiltros_aplicados={setFiltros_aplicados}
                    setShowSnackBar={setShowSnackBar}
                    aba={activeTitleTabIndex}
                    subAba={activeTabIndex}
                />
              ],
          ],
          [
            [
              <CardsGraficoAPSQuadrimestreProximo tabelaDataAPS={tabelaDataAPS}/>,
              <GraficoAPSQuadrimestreProximo tabelaDataAPS={tabelaDataAPS}/>,
            ],
            [
              <TabelaAPSQuadrimestreProximo
                  tabelaDataAPS={tabelaDataAPS} 
                  tabelaData={tabelaData} 
                  setTabelaData={setTabelaData}
                  liberarPesquisa={dispararEventoAbrirImpressaoAPS}
                  showSnackBar={showSnackBar}
                  setFiltros_aplicados={setFiltros_aplicados}
                  setShowSnackBar={setShowSnackBar}
                  aba={activeTitleTabIndex}
                  subAba={activeTabIndex}
              />
            ],
        ],
        [
          [
            <CardsGraficoAPSQuadrimestreFuturo tabelaDataAPS={tabelaDataAPS}/>,
            <GraficoAPSQuadrimestreFuturo tabelaDataAPS={tabelaDataAPS}/>,
          ],
          [
            <TabelaAPSQuadrimestreFuturo
                tabelaDataAPS={tabelaDataAPS} 
                tabelaData={tabelaData} 
                setTabelaData={setTabelaData}
                liberarPesquisa={dispararEventoAbrirImpressaoAPS}
                showSnackBar={showSnackBar}
                setFiltros_aplicados={setFiltros_aplicados}
                setShowSnackBar={setShowSnackBar}
                aba={activeTitleTabIndex}
                subAba={activeTabIndex}
            />
          ],
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
                  titulo="Lista Nominal de Vacinação"
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
          {session.user.municipio}
          </div>
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
                      label: 'GRÁFICO'
                    },
                    {
                      label: 'LISTA NOMINAL'
                    },
                  ],  
                  [
                    {
                      label: 'GRÁFICO'
                    },
                    {
                      label: 'LISTA NOMINAL'
                    },
                  ],  
                  [
                    {
                      label: 'GRÁFICO'
                    },
                    {
                      label: 'LISTA NOMINAL'
                    },
                  ],  
                    ]}
                titles={[
                  {
                      label: 'QUADRIMESTRE ATUAL'
                  },
                  {
                      label: 'PRÓXIMO QUADRIMESTRE'
                  },
                  {
                      label: 'QUADRIMESTRES FUTUROS'
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
  