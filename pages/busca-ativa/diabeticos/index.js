import {
  CardAlert,
  TituloTexto,
  ButtonLightSubmit,
  ScoreCardGrid,
  Spinner,
  GraficoBuscaAtiva,
} from "@impulsogov/design-system";
import { useSession, signOut, getSession } from "next-auth/react"
import React, { useState, useEffect } from 'react';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { validatetoken } from "../../../services/validateToken"
import { redirectHome } from "../../../helpers/redirectHome";
import { tabelaDiabetesEquipe, tabelaDiabetesAPS } from "../../../services/busca_ativa/Diabetes";
import { useRouter } from 'next/router';
import MunicipioQuadrimestre from "../../../componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import { TabelaAPS } from "../../../componentes/mounted/busca-ativa/diabetes/APS/TabelaAPS";
import { TabelaEquipe } from "../../../componentes/mounted/busca-ativa/diabetes/Equipe/TabelaEquipe";
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
  const [tokenValido, setTokenValido] = useState();
  const [showSnackBar, setShowSnackBar] = useState({
    open: false
  })
  const [filtros_aplicados, setFiltros_aplicados] = useState(false)
  const [voltarGatilho, setVoltarGatilho] = useState(0);

  const [tabelaDataAPS, setTabelaDataAPS] = useState();
  const DiabetesTabelaDataAPS = async () => await tabelaDiabetesAPS(session?.user?.municipio_id_sus, session?.user?.access_token)
  useEffect(() => {
    session && (session.user.perfis.includes(8) || session.user.perfis.includes(5)) &&
      DiabetesTabelaDataAPS().then((response) => {
        setTabelaDataAPS(response)
      })
  }, [session])

  const [tabelaDataEquipe, setTabelaDataEquipe] = useState();
  const DiabetesTabelaDataEquipe = async () => await tabelaDiabetesEquipe(session?.user?.municipio_id_sus, session?.user?.equipe, session?.user?.access_token)
  useEffect(() => {
    session && session.user.perfis.includes(9) &&
      DiabetesTabelaDataEquipe().then((response) => {
        setTabelaDataEquipe(response)
      })
  }, [session])

  const [tabelaData, setTabelaData] = useState([]);

  const PainelComLegenda = ({ children }) => {
    return (
      <div style={{ margin: "0 80px 40px", backgroundColor: '#D7F2F6', padding: "30px 0", borderRadius:"10px", fontSize: "13px", paddingLeft: "30px"}}>
        {children}
        <div>
          <strong style={{fontSize: "16px"}}>Legenda</strong>
          <br />
          <br />
          <b>Tipo de diagnóstico:</b>
          <br />
          <p>Autorreferido - a condição foi identificada como “autorreferida” quando é relatada pelo usuário na realização do Cadastro Individual.</p>
          <p>Diagnóstico Clínico - a condição foi identificada como “diagnóstico clínico” por haver atendimento individual confirmando o diagnóstico.</p>

        </div>
      </div>
    );
  };

  useEffect(() => {
    if (session) {
      validatetoken(session?.user?.access_token)
        .then(response => {
          setTokenValido(response)
        }).catch(error => {
          setTokenValido(false)
        })
    }
  })
  useEffect(() => {
    if (session && session?.user?.access_token) {
      if (tokenValido != true && tokenValido !== undefined) signOut()
    }
  },[tokenValido])

  const router = useRouter();
  let visao = null
  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        aba: null,
        sub_aba: null,
        visao: visao
      }
    },
      undefined, { shallow: true }
    );
  }, [visao]);
  const Voltar = () => {
    window.history.go(voltarGatilho * (-1))
  }

  useEffect(() => {
    setVoltarGatilho(voltarGatilho + 1)
  }, [router.asPath])
  if (session) {
    if (session.user.perfis.includes(9)) {
      visao = "equipe"
      const dataAtual = Date.now();
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
            titulo="Lista Nominal Diabetes"
            texto=""
            imagem={{ posicao: null, url: '' }}
          />
          <CardAlert
            destaque="IMPORTANTE: "
            msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
          />
          <MunicipioQuadrimestre data={dataAtual} />

          {
            tabelaDataEquipe &&
            <ScoreCardGrid
              valores={[
                {
                  descricao: 'Total de pessoas com diabetes',
                  valor: tabelaDataEquipe.length
                },
                {
                  descricao: 'Total de pessoas com consulta e solicitação de hemoglobina glicada em dia',
                  valor: tabelaDataEquipe?.reduce((acumulador, item) => {
                    return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") ?
                      acumulador + 1 : acumulador;
                  }, 0)
                },
                {
                  descricao: 'Total de pessoas com diagnóstico autorreferido',
                  valor: tabelaDataEquipe.reduce((acumulador, item) => {
                    return (item.identificacao_condicao_diabetes == "Autorreferida") ?
                      acumulador + 1 : acumulador;
                  }, 0)
                },
                {
                  descricao: 'Total de pessoas com diagnóstico clínico',
                  valor: tabelaDataEquipe.reduce((acumulador, item) => {
                    return (item.identificacao_condicao_diabetes == "Diagnóstico Clínico") ?
                      acumulador + 1 : acumulador;
                    },0)
                  }
                ]}
             />
            }
            <TabelaEquipe
              tabelaData={tabelaData}
              tabelaDataEquipe={tabelaDataEquipe}
              setTabelaData={setTabelaData}
              showSnackBar={showSnackBar}
              setShowSnackBar={setShowSnackBar}
              setFiltros_aplicados={setFiltros_aplicados}
              liberarPesquisa={dispararEventoAbrirImpressaoEquipe}
            />
          {
            tabelaDataEquipe ?
              <PainelComLegenda /> : <Spinner />
          }
        </>
      )
    }
    if (session.user.perfis.includes(5) || session.user.perfis.includes(8)) {
      visao = "aps"
      const dataAtual = Date.now();
      return(
        <>
          <div style={{ padding: "30px 80px 30px 80px", display: "flex" }}>
            <ButtonLightSubmit
              icon='https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'
              label="VOLTAR"
              submit={Voltar}
            />
          </div>
          <TituloTexto
            titulo="Lista Nominal Diabetes"
            texto=""
            imagem={{ posicao: null, url: '' }}
          />
          <CardAlert
            destaque="IMPORTANTE: "
            msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
          />
          <MunicipioQuadrimestre data={dataAtual} />
          {
            tabelaDataAPS &&
            <ScoreCardGrid
              valores={[
                {
                  descricao: 'Total de pessoas com diabetes',
                  valor: tabelaDataAPS.length
                },
                {
                  descricao: 'Total de pessoas com consulta e solicitação de hemoglobina glicada em dia',
                  valor: tabelaDataAPS.reduce((acumulador, item) => {
                    return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") ?
                      acumulador + 1 : acumulador;
                  }, 0)
                },
                {
                  descricao: 'Total de pessoas com diagnóstico autorreferido',
                  valor: tabelaDataAPS.reduce((acumulador, item) => {
                    return (item.identificacao_condicao_diabetes == "Autorreferida") ?
                      acumulador + 1 : acumulador;
                  }, 0)
                },
                {
                  descricao: 'Total de pessoas com diagnóstico clínico',
                  valor: tabelaDataAPS.reduce((acumulador, item) => {
                    return (item.identificacao_condicao_diabetes == "Diagnóstico Clínico") ?
                      acumulador + 1 : acumulador;
                  }, 0)
                }
              ]}
            />
          }
          {
            tabelaDataAPS &&
            <GraficoBuscaAtiva
              dataBarra={{
                title: {
                  text: 'Distribuição por equipe',
                  subtext: '',
                  left: '80',
                  top: 'top'
                },
                color: [
                  '#55D499',
                  '#F8D76B',
                  '#FFA75E',
                  '#FF7C81',
                ],
                grid: {
                  containLabel: true,
                  top: '20%'
                },
                legend: {
                  data: [
                    'Consulta e solicitação de hemoglobina em dia',
                    'Apenas a consulta a fazer',
                    'Apenas a solicitação de hemoglobina a fazer',
                    'Os dois a fazer'
                  ],
                  top: '50',
                  left: '80'
                },
                series: [
                  {
                    data: Object.entries(tabelaDataAPS.reduce((acumulador, item) => {
                      if (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                      return acumulador
                    }, {})),
                    name: 'Consulta e solicitação de hemoglobina em dia',
                    stack: 'stack',
                    type: 'bar'
                  },
                  {
                    data: Object.entries(tabelaDataAPS.reduce((acumulador, item) => {
                      if (item.prazo_proxima_consulta == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                      return acumulador
                    }, {})),
                    name: 'Apenas a consulta a fazer',
                    stack: 'stack',
                    type: 'bar'
                  },
                  {
                    data: Object.entries(tabelaDataAPS.reduce((acumulador, item) => {
                      if (item.prazo_proxima_solicitacao_hemoglobina == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                      return acumulador
                    }, {})),
                    name: 'Apenas a solicitação de hemoglobina a fazer',
                    stack: 'stack',
                    type: 'bar'
                  },
                  {
                    data: Object.entries(tabelaDataAPS.reduce((acumulador, item) => {
                      if (item.prazo_proxima_consulta != "Em dia" && item.prazo_proxima_solicitacao_hemoglobina != "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                      return acumulador
                    }, {})),
                    name: 'Os dois a fazer',
                    stack: 'stack',
                    type: 'bar'
                  }
                ],
                tooltip: {
                  trigger: 'axis'
                },
                xAxis: {
                  data: [...new Set(tabelaDataAPS.map(item => item.equipe_nome_cadastro))],
                  type: 'category',
                  axisLabel: {
                    rotate: 45
                  }
                },
                yAxis: {
                  type: 'value',
                  axisLabel: {
                    formatter: function (value) {
                      return value.toLocaleString('pt-BR')
                    }
                  }
                }
              }}
              dataRosca={{
                title: {
                  text: 'Consolidado Municipal',
                  left: '80'
                },
                color: [
                  '#55D499',
                  '#F8D76B',
                  '#FFA75E',
                  '#FF7C81',
                ],
                series: [
                  {
                    avoidLabelOverlap: false,
                    data: [
                      {
                        name: 'Consulta e solicitação de hemoglobina em dia',
                        value: ((tabelaDataAPS.reduce((acumulador, item) => {
                          return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") ?
                            acumulador + 1 : acumulador;
                        }, 0) * 100) / tabelaDataAPS.length).toFixed(1)
                      },
                      {
                        name: 'Apenas a consulta a fazer',
                        value: ((tabelaDataAPS.reduce((acumulador, item) => {
                          return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina != "Em dia") ?
                            acumulador + 1 : acumulador;
                        }, 0) * 100) / tabelaDataAPS.length).toFixed(1)
                      },
                      {
                        name: 'Apenas a solicitação de hemoglobina a fazer',
                        value: ((tabelaDataAPS.reduce((acumulador, item) => {
                          return (item.prazo_proxima_solicitacao_hemoglobina == "Em dia" && item.prazo_proxima_consulta != "Em dia") ?
                            acumulador + 1 : acumulador;
                        }, 0) * 100) / tabelaDataAPS.length).toFixed(1)
                      },
                      {
                        name: 'Os dois a fazer',
                        value: ((tabelaDataAPS.reduce((acumulador, item) => {
                          return (item.prazo_proxima_consulta != "Em dia" && item.prazo_proxima_solicitacao_hemoglobina != "Em dia") ?
                            acumulador + 1 : acumulador;
                        }, 0) * 100) / tabelaDataAPS.length).toFixed(1)
                      }
                    ],
                    emphasis: {
                      label: {
                        fontSize: '20',
                        fontWeight: 'bold',
                        show: true
                      }
                    },
                    label: {
                      formatter: '{c}%',
                      position: 'inside',
                      show: true,
                      textStyle: {
                        color: 'white',
                        fontSize: 12
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    name: 'Gráfico de rosca',
                    radius: [
                      '35%',
                      '70%'
                    ],
                    type: 'pie'
                  }
                ],
                tooltip: {
                  formatter: '{b}',
                  trigger: 'item'
                }
              }}
            />
        }
        <TabelaAPS
          tabelaData={tabelaData}
          tabelaDataAPS={tabelaDataAPS}
          liberarPesquisa={dispararEventoAbrirImpressaoAPS}
          setTabelaData={setTabelaData}
          showSnackBar={showSnackBar}
          setShowSnackBar={setShowSnackBar}
          setFiltros_aplicados={setFiltros_aplicados}
        />
          {
            tabelaDataAPS ?
              <PainelComLegenda /> : <Spinner />
          }

      </>
    )
}
}else {
    if (status !== "authenticated" && status !== "loading") signOut()
  }
  if (status == "unauthenticated") router.push('/')
}
export default Index;
