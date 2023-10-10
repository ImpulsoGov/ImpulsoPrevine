import { 
  CardAlert,
  TituloTexto, 
  ButtonLight, 
  PainelBuscaAtiva , 
  ScoreCardGrid , 
  Spinner, 
  GraficoBuscaAtiva,
  ButtonPrint,
  TabelaHiperDiaImpressao
} from "@impulsogov/design-system";
import { useSession,signOut, getSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { validatetoken} from "../../../services/validateToken"
import { redirectHome } from "../../../helpers/redirectHome";
import style from "../../duvidas/Duvidas.module.css"
import { colunasDiabetes } from "../../../helpers/colunasDiabetes";
import { tabelaDiabetesEquipe , tabelaDiabetesAPS } from "../../../services/busca_ativa/Diabetes";

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
  const DiabetesTabelaDataAPS = async()=> await tabelaDiabetesAPS(session?.user?.municipio,session?.user?.access_token)
  useEffect(()=>{
    session && (session.user.perfis.includes(8) || session.user.perfis.includes(5)) &&
    DiabetesTabelaDataAPS().then((response)=>{
      setTabelaDataAPS(response)
  })},[session]) 

  const [tabelaDataEquipe, setTabelaDataEquipe] = useState();
  const DiabetesTabelaDataEquipe = async()=> await tabelaDiabetesEquipe(session?.user?.municipio,session?.user?.equipe,session?.user?.access_token)
  useEffect(()=>{
    session &&  session.user.perfis.includes(9) &&
    DiabetesTabelaDataEquipe().then((response)=>{
      setTabelaDataEquipe(response)
  })},[session]) 

  const [tabelaData, setTabelaData] = useState();
  useEffect(()=>{
    (tabelaDataAPS || tabelaDataEquipe) && session &&
    setTabelaData(session?.user.perfis.includes(8) || session?.user.perfis.includes(5) ? tabelaDataAPS :  tabelaDataEquipe)
  },[session,tabelaDataAPS,tabelaDataEquipe])

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
  const datefiltrosDiabetes = [
    "dt_consulta_mais_recente",
    "dt_solicitacao_hemoglobina_glicada_mais_recente",
  ]
  const rotulosfiltrosDiabetes = [
    "DATA DA CONSULTA MAIS RECENTE",
    "PRAZO PARA PRÓXIMA CONSULTA",
    "NOMES DE A-Z",
    "DATA DE SOLICITAÇÃO DE HEMOGLOBINA GLICADA MAIS RECENTE",
  ]
  const IDFiltrosDiabetes = {
    "DATA DA CONSULTA MAIS RECENTE" : "dt_consulta_mais_recente",
    "PRAZO PARA PRÓXIMA CONSULTA" : "prazo_proxima_consulta",
    "NOMES DE A-Z": "cidadao_nome",
    "DATA DE SOLICITAÇÃO DE HEMOGLOBINA GLICADA MAIS RECENTE" : "dt_solicitacao_hemoglobina_glicada_mais_recente",
  }
  if(session){  
    if(session.user.perfis.includes(9)){
        return (
        <>
          <div style={{padding: "30px 80px 30px 80px",display: "flex"}}>
            <ButtonLight icone={{posicao: 'right',
              url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
              label="VOLTAR" link="/inicio"/>
          {
            tabelaDataEquipe &&
            <div style={{marginLeft:"auto"}}>
              <ButtonPrint
                label="CLIQUE AQUI PARA IMPRIMIR"
                escala="0.78"
                child={<TabelaHiperDiaImpressao data={tabelaData} colunas={colunasDiabetes}/>}
              />
            </div>
          }
          </div>
          <TituloTexto
                  titulo="Lista Nominal Diabetes"
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
          {session.user.municipio} - Q3/23
        </div>

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
                    valor: tabelaDataEquipe?.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") ?
                      acumulador + 1 : acumulador;
                    },0)
                  },
                  {
                    descricao: 'Total de pessoas com diagnóstico autorreferido',
                    valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                      return (item.identificacao_condicao_diabetes == "Autorreferida") ?
                      acumulador + 1 : acumulador;
                    },0)
                  },
                  {
                    descricao: 'Total de pessoas com diagnóstico clínico',
                    valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                      return (item.identificacao_condicao_diabetes == "Diagnóstico Clínico") ?
                      acumulador + 1 : acumulador;
                    },0)
                  }
                ]}
             />
            }
            {
              tabelaDataEquipe && tabelaData ?
              <PainelBuscaAtiva
                dadosFiltros={[
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.equipe_nome_cadastro))],
                    filtro: 'equipe_nome_cadastro',
                    rotulo: 'Filtrar por nome da equipe'
                  },
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.equipe_ine_cadastro))],
                    filtro: 'equipe_ine_cadastro',
                    rotulo: 'Filtrar por INE da equipe'
                  },
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.acs_nome_cadastro))],
                    filtro: 'acs_nome_cadastro',
                    rotulo: 'Filtrar por nome do ACS'
                  },
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.identificacao_condicao_diabetes))],
                    filtro: 'identificacao_condicao_diabetes',
                    rotulo: 'Filtrar por tipo de diagnóstico'
                  },
                ]}
                painel="diabetes"
                tabela={{
                  colunas: colunasDiabetes,
                  data:tabelaDataEquipe
                }}
                data={tabelaData}
                setData={setTabelaData}
                datefiltros={datefiltrosDiabetes}
                IDFiltros={IDFiltrosDiabetes}
                rotulosfiltros={rotulosfiltrosDiabetes}    
              /> : <Spinner/>
            }
        </>
      )
  }
  if(session.user.perfis.includes(5) || session.user.perfis.includes(8)){
    return (
      <>
          <div style={{padding: "30px 80px 30px 80px",display: "flex"}}>
            <ButtonLight icone={{posicao: 'right',
              url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
              label="VOLTAR" link="/inicio"/>
          {
            tabelaDataAPS &&
            <div style={{marginLeft:"auto"}}>
              <ButtonPrint
                label="CLIQUE AQUI PARA IMPRIMIR"
                escala="0.78"
                child={<TabelaHiperDiaImpressao data={tabelaData} colunas={colunasDiabetes}/>}
              />
            </div>
          }
          </div>
        <TituloTexto
                titulo="Lista Nominal Diabetes"
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
          {session.user.municipio} - Q3/23
        </div>
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
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                  return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") ?
                  acumulador + 1 : acumulador;
                },0)
              },
              {
                descricao: 'Total de pessoas com diagnóstico autorreferido',
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                  return (item.identificacao_condicao_diabetes == "Autorreferida") ?
                  acumulador + 1 : acumulador;
                },0)
              },
              {
                descricao: 'Total de pessoas com diagnóstico clínico',
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                  return (item.identificacao_condicao_diabetes == "Diagnóstico Clínico") ?
                  acumulador + 1 : acumulador;
                },0)
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
              '#EABF2E',
              '#57C7DC',
              '#7579EA',
              '#E95F3A',
            ],
            grid: {
              containLabel: true,
              top: '20%'
            },
            legend: {
              data: [
                'Apenas consulta em dia',
                'Consulta e solicitação de hemoglobina glicada em dia',
                'Apenas solicitação de hemoglobina glicada em dia',
                'Nada em dia'
              ],
              top: '50',
              left: '80'
            },
            series: [
              {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_consulta == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'Apenas consulta em dia',
                stack: 'stack',
                type: 'bar'
              },
              {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'Consulta e solicitação de hemoglobina glicada em dia',
                stack: 'stack',
                type: 'bar'
              },
              {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_solicitacao_hemoglobina == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'Apenas solicitação de hemoglobina glicada em dia',
                stack: 'stack',
                type: 'bar'
              },
              {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_consulta != "Em dia" && item.prazo_proxima_solicitacao_hemoglobina != "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'Nada em dia',
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
              axisLabel : {
                rotate : 45
              }
            },
            yAxis: {
              type: 'value',
              axisLabel : {
                formatter : function(value) {
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
              '#EABF2E',
              '#57C7DC',
              '#7579EA',
              '#E95F3A',
            ],
            series: [
              {
                avoidLabelOverlap: false,
                data: [
                  {
                    name: 'Apenas consulta em dia',
                    value: Math.round((tabelaDataAPS.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina != "Em dia") ?
                      acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.length)
                  },
                  {
                    name: 'Consulta e Solicitação de Hemoglobina Glicada em dia',
                    value: Math.round((tabelaDataAPS.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_solicitacao_hemoglobina == "Em dia") ?
                      acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.length)
                  },
                  {
                    name: 'Apenas Solicitação de Hemoglobina Glicada em dia',
                    value: Math.round((tabelaDataAPS.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_solicitacao_hemoglobina == "Em dia" && item.prazo_proxima_consulta != "Em dia") ?
                      acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.length)
                  },
                  {
                    name: 'Nada em dia',
                    value: Math.round((tabelaDataAPS.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_consulta != "Em dia" && item.prazo_proxima_solicitacao_hemoglobina != "Em dia") ?
                      acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.length)
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
        {
          tabelaDataAPS && tabelaData ?
          <PainelBuscaAtiva
            dadosFiltros={[
              {
                data: [...new Set(tabelaDataAPS.map(item => item.equipe_nome_cadastro))],
                filtro: 'equipe_nome_cadastro',
                rotulo: 'Filtrar por nome da equipe'
              },
              {
                data: [...new Set(tabelaDataAPS.map(item => item.equipe_ine_cadastro))],
                filtro: 'equipe_ine_cadastro',
                rotulo: 'Filtrar por INE da equipe'
              },
              {
                data: [...new Set(tabelaDataAPS.map(item => item.acs_nome_cadastro))],
                filtro: 'acs_nome_cadastro',
                rotulo: 'Filtrar por nome do ACS'
              },
              {
                data: [...new Set(tabelaDataAPS.map(item => item.identificacao_condicao_diabetes))],
                filtro: 'identificacao_condicao_diabetes',
                rotulo: 'Filtrar por tipo de diagnóstico'
              },
            ]}
            painel="diabetes"
            tabela={{
              colunas: colunasDiabetes,
              data:tabelaDataAPS
            }}
            data={tabelaData}
            setData={setTabelaData}
            datefiltros={datefiltrosDiabetes}
            IDFiltros={IDFiltrosDiabetes}
            rotulosfiltros={rotulosfiltrosDiabetes}
          /> : <Spinner/>
        }
      </>
    )
}
}
return(
    <p>{status}</p>
  )
}

export default Index;
