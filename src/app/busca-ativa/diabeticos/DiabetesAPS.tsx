'use client'
import {
    CardAlert,
    TituloTexto,
    ButtonLightSubmit,
    ScoreCardGrid,
    Spinner,
    GraficoBuscaAtiva,
  } from "@impulsogov/design-system";
import MunicipioQuadrimestre from "@componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";
import { TabelaAPS } from "@componentes/mounted/busca-ativa/diabetes/APS/TabelaAPS";
import { PainelComLegenda } from "./PainelComLegenda";
import React, { Dispatch, SetStateAction } from "react";

interface DiabetesAPSType {
    tabelaDataAPS: any;
    tabelaData: any;
    setTabelaData: Dispatch<SetStateAction<any>>;
    showSnackBar: any;
    setShowSnackBar: Dispatch<SetStateAction<any>>;
    filtros_aplicados: any;
    setFiltros_aplicados: Dispatch<SetStateAction<any>>;
    dispararEventoAbrirImpressaoAPS: () => void;
    Voltar: () => void;
}

export const DiabetesAPS : React.FC<DiabetesAPSType> = ({
    tabelaDataAPS,
    tabelaData,
    setTabelaData,
    showSnackBar,
    setShowSnackBar,
    setFiltros_aplicados,
    dispararEventoAbrirImpressaoAPS,
    Voltar
}) => {
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
                valor: tabelaDataAPS.reduce((acumulador : any, item : any) => {
                  return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") ?
                    acumulador + 1 : acumulador;
                }, 0)
              },
              {
                descricao: 'Total de pessoas com diagnóstico autorreferido',
                valor: tabelaDataAPS.reduce((acumulador : any, item : any) => {
                  return (item.identificacao_condicao_diabetes == "Autorreferida") ?
                    acumulador + 1 : acumulador;
                }, 0)
              },
              {
                descricao: 'Total de pessoas com diagnóstico clínico',
                valor: tabelaDataAPS.reduce((acumulador : any, item : any) => {
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
                  data: Object.entries(tabelaDataAPS.reduce((acumulador : any, item : any) => {
                    if (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                    return acumulador
                  }, {})),
                  name: 'Consulta e solicitação de hemoglobina em dia',
                  stack: 'stack',
                  type: 'bar'
                },
                {
                  data: Object.entries(tabelaDataAPS.reduce((acumulador : any, item : any) => {
                    if (item.prazo_proxima_consulta != "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                    return acumulador
                  }, {})),
                  name: 'Apenas a consulta a fazer',
                  stack: 'stack',
                  type: 'bar'
                },
                {
                  data: Object.entries(tabelaDataAPS.reduce((acumulador : any, item : any) => {
                    if (item.prazo_proxima_solicitacao_hemoglobina != "Em dia" && item.prazo_proxima_consulta == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                    return acumulador
                  }, {})),
                  name: 'Apenas a solicitação de hemoglobina a fazer',
                  stack: 'stack',
                  type: 'bar'
                },
                {
                  data: Object.entries(tabelaDataAPS.reduce((acumulador : any, item : any) => {
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
                data: Array.from(new Set(tabelaDataAPS.map((item : any) => item.equipe_nome_cadastro))),
                type: 'category',
                axisLabel: {
                  rotate: 45
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: function (value : any) {
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
                      value: ((tabelaDataAPS.reduce((acumulador : any, item : any) => {
                        return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") ?
                          acumulador + 1 : acumulador;
                      }, 0) * 100) / tabelaDataAPS.length).toFixed(1)
                    },
                    {
                      name: 'Apenas a consulta a fazer',
                      value: ((tabelaDataAPS.reduce((acumulador : any, item : any) => {
                        return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina != "Em dia") ?
                          acumulador + 1 : acumulador;
                      }, 0) * 100) / tabelaDataAPS.length).toFixed(1)
                    },
                    {
                      name: 'Apenas a solicitação de hemoglobina a fazer',
                      value: ((tabelaDataAPS.reduce((acumulador : any, item : any) => {
                        return (item.prazo_proxima_solicitacao_hemoglobina == "Em dia" && item.prazo_proxima_consulta != "Em dia") ?
                          acumulador + 1 : acumulador;
                      }, 0) * 100) / tabelaDataAPS.length).toFixed(1)
                    },
                    {
                      name: 'Os dois a fazer',
                      value: ((tabelaDataAPS.reduce((acumulador : any, item : any) => {
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