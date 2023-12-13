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
import { GraficoIndicadorUmQuadriAtual, CardsGraficoIndicadorUmQuadriAtual } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/grafico_indicador_1_atual";
import { tabelaGestantesEquipe , tabelaGestantesAPS } from "../../../services/busca_ativa/Gestantes";
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

import { CardsGraficoIndicadorDoisQuadriAtual, GraficoIndicadorDoisQuadAtual } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/grafico_indicador_2_atual";
import { CardsGraficoIndicadorDoisQuadriFuturo, GraficoIndicadorDoisQuadriFuturo } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_2/grafico_indicador_2 _futuro";

import { CardsGraficoIndicadorTres, GraficoIndicadorTres } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_3/grafico_indicador_3";
import { CardsAPS } from "../../../componentes/mounted/busca-ativa/gestantes/APS/cardsAPS";
import { CardsGraficoIndicadorUmQuadriFuturo, GraficoIndicadorUmQuadriFuturo } from "../../../componentes/mounted/busca-ativa/gestantes/APS/indicador_1/grafico_indicador_1_futuro";


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
                <CardsGraficoIndicadorUmQuadriAtual tabelaDataAPS={tabelaDataAPS}/>,
                <GraficoIndicadorUmQuadriAtual tabelaDataAPS={tabelaDataAPS}/>,
            ],
            [
              <CardsGraficoIndicadorUmQuadriFuturo tabelaDataAPS={tabelaDataAPS}/>,
              <GraficoIndicadorUmQuadriFuturo tabelaDataAPS={tabelaDataAPS}/>,
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
                <CardsGraficoIndicadorDoisQuadriAtual tabelaDataAPS={tabelaDataAPS}/>,
                <CardsGraficoIndicadorDoisQuadriAtual tabelaDataAPS={tabelaDataAPS}/>,
            ],
            [
              <CardsGraficoIndicadorDoisQuadriFuturo tabelaDataAPS={tabelaDataAPS}/>,
              <CardsGraficoIndicadorDoisQuadriFuturo tabelaDataAPS={tabelaDataAPS}/>,
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
                child={<TabelaHiperDiaImpressao data={tabelaData} colunas={colunasImpressao[activeTitleTabIndex]}/>}
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
                    label: 'GRÁFICOS QUADRIMESTRE ATUAL'
                  },
                  {
                    label: 'GRÁFICOS QUADRIMESTRES FUTUROS'
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
                      label: 'GRÁFICOS QUADRIMESTRE ATUAL'
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
  }else{
      if(status !== "authenticated" && status !== "loading" ) signOut()
  }

}

export default Index;
