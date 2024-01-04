import { 
    CardAlert,
    TituloTexto, 
    ButtonLight, 
    ButtonPrint,
    TabelaHiperDiaImpressao,
    PanelSelector
  } from "@impulsogov/design-system";
  import React, { useState,useEffect } from 'react';
  import { useSession,signOut, getSession } from "next-auth/react"
  import { useRouter } from 'next/router';
  
  import { getData } from '../../../services/cms'
  import { LAYOUT } from '../../../utils/QUERYS'
  import { redirectHome } from "../../../helpers/redirectHome";
  import { colunasGestantesEquipe } from "../../../helpers/colunasGestantes";
  import { colunasGestantesIndicadorUm } from "../../../helpers/colunasGestantesIndicadorUm";
  import { colunasGestantesIndicadorDois } from "../../../helpers/colunasGestantesIndicadorDois";
  import { colunasGestantesIndicadorTres } from "../../../helpers/colunasGestantesIndicadorTres";
  import { tabelaVacinacaoEquipe , tabelaVacinacaoAPS } from "../../../services/busca_ativa/Vacinacao";
  import { TabelaEquipeGestantesAtivas } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesAtivas";
  import { TabelaEquipeGestantesEncerradas } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesEncerradas";
  import { TabelaEquipeGestantesSemDUM } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/tabelas/GestantesSemDUM";
  import { CardsEquipe } from "../../../componentes/mounted/busca-ativa/gestantes/Equipe/cardsEquipe";
  import { GraficoAPSQuadrimestreAtual, CardsGraficoAPSQuadrimestreAtual } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_atual/graficoQuadrimestreAtual";
  import { TabelaAPSQuadrimestreAtual } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_atual/tabelaQuadrimestreAtual";
  import { GraficoAPSQuadrimestreProximo, CardsGraficoAPSQuadrimestreProximo } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/proximo_quadrimestre/graficoQuadrimestreProximo";
  import { TabelaAPSQuadrimestreProximo } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/proximo_quadrimestre/tabelaQuadrimestreProximo";
  import { GraficoAPSQuadrimestreFuturo, CardsGraficoAPSQuadrimestreFuturo } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_futuro/graficoQuadrimestreFuturo";
  import { TabelaAPSQuadrimestreFuturo } from "../../../componentes/mounted/busca-ativa/vacinacao/aps/quadrimestre_futuro/tabelaQuadrimestreFuturo";
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
  const router = useRouter();
  
  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { aba: activeTabIndex }
    },
      undefined, { shallow: true }
    );
  }, [activeTabIndex]);
  
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
      setTabelaDataEquipe(response.data)
  })},[session]) 
  const [tabelaData, setTabelaData] = useState([]);
  const colunasImpressao = {
    0 : colunasGestantesIndicadorUm,
    1 : colunasGestantesIndicadorDois,
    3 : colunasGestantesIndicadorTres,
    4 : colunasGestantesIndicadorUm
  }
  if(session){  
    if(session.user.perfis.includes(9)){
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
            tabelaData &&
            <div style={{marginLeft:"auto"}}>
            <ButtonPrint
                label="CLIQUE AQUI PARA IMPRIMIR"
                escala="0.78"
                child={<TabelaHiperDiaImpressao data={tabelaData} colunas={colunasGestantesEquipe}/>}
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
                <CardsGraficoAPSQuadrimestreAtual tabelaDataAPS={tabelaDataAPS}/>,
                <GraficoAPSQuadrimestreAtual tabelaDataAPS={tabelaDataAPS}/>,
              ],
              [
                <TabelaAPSQuadrimestreAtual
                    tabelaDataAPS={tabelaDataAPS} 
                    tabelaData={tabelaData} 
                    setTabelaData={setTabelaData}
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
                  child={<TabelaHiperDiaImpressao data={tabelaData} colunas={colunasImpressao[activeTitleTabIndex]}/>}
              />
              </div>
          }
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
  