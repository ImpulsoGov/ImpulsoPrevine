import { 
  CardAlert,
  TituloTexto, 
  ButtonLight, 
  PainelBuscaAtiva , 
  ScoreCardGrid , 
  Spinner, 
  GraficoBuscaAtiva,
  ButtonColorSubmitIcon,
  TabelaHiperDiaImpressao
} from "@impulsogov/design-system";
import { useSession,signOut, getSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { validatetoken} from "../../../services/validateToken"
import { redirectHome } from "../../../helpers/redirectHome";
import { Imprimir } from "../../../helpers/imprimir"
import { colunasDiabetes } from "../../../helpers/colunasDiabetes";
import { tabelaDiabetesEquipe , tabelaDiabetesAPS } from "../../../services/busca_ativa/Diabetes";
import mixpanel from "mixpanel-browser";
import { useRouter } from 'next/router';
import MunicipioQuadrimestre from "../../../componentes/unmounted/MunicipioQuadrimestre/MunicipioQuadrimestre";

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
  const DiabetesTabelaDataAPS = async()=> await tabelaDiabetesAPS(session?.user?.municipio_id_sus,session?.user?.access_token)
  useEffect(()=>{
    session && (session.user.perfis.includes(8) || session.user.perfis.includes(5)) &&
    DiabetesTabelaDataAPS().then((response)=>{
      setTabelaDataAPS(response)
  })},[session]) 

  const [tabelaDataEquipe, setTabelaDataEquipe] = useState();
  const DiabetesTabelaDataEquipe = async()=> await tabelaDiabetesEquipe(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
  useEffect(()=>{
    session &&  session.user.perfis.includes(9) &&
    DiabetesTabelaDataEquipe().then((response)=>{
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
  const datefiltrosDiabetes = [
    "dt_consulta_mais_recente",
    "dt_solicitacao_hemoglobina_glicada_mais_recente"
  ]
  const rotulosfiltrosDiabetes = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "DATA DA CONSULTA MAIS RECENTE",
    "DATA DE SOLICITAÇÃO DE HEMOGLOBINA GLICADA MAIS RECENTE",
  ]
  const IDFiltrosDiabetes = {
    "NOMES DE A-Z": "cidadao_nome",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z": "acs_nome_cadastro",
    "DATA DA CONSULTA MAIS RECENTE" : "dt_consulta_mais_recente",
    "DATA DE SOLICITAÇÃO DE HEMOGLOBINA GLICADA MAIS RECENTE" : "dt_solicitacao_hemoglobina_glicada_mais_recente",
  }
  const IDFiltrosOrdenacaoDiabetes = {
    "cidadao_nome" : "asc",
    "acs_nome_cadastro" : "asc",
    "dt_consulta_mais_recente" : "asc",
    "prazo_proxima_consulta" : "asc",
    "dt_solicitacao_hemoglobina_glicada_mais_recente" : "asc",
    "prazo_proxima_solicitacao_hemoglobina" : "asc",
  }
  const Impressao = ()=> Imprimir(
    0.78,
    <TabelaHiperDiaImpressao data={tabelaData} colunas={colunasDiabetes}/>,
    "diabetes",
    null,
    null,
  )
  const router = useRouter();
  let visao = null
  useEffect(() => {
      router.push({
        pathname: router.pathname,
        query: { 
          aba : null,
          sub_aba : null,
          visao : visao
      }
      },
        undefined, { shallow: true }
      );
    }, [visao]);

  if(session){  
    if(session.user.perfis.includes(9)){
      visao = "equipe"
        return (
        <>
          <div style={{padding: "30px 80px 30px 80px",display: "flex"}}>
            <ButtonLight icone={{posicao: 'right',
              url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
              label="VOLTAR" link="/inicio"/>
          {
            tabelaDataEquipe &&
            <div style={{marginLeft:"auto"}}>
            <ButtonColorSubmitIcon
                label="CLIQUE AQUI PARA IMPRIMIR"
                icon="https://media.graphassets.com/3vsKrZXYT9CdxSSyhjhk"
                submit={Impressao}
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
            <MunicipioQuadrimestre data={tabelaDataEquipe && tabelaDataEquipe[0].atualizacao_data} />

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
                    data: [...new Set(tabelaDataEquipe.map(item => item.acs_nome_cadastro))],
                    filtro: 'acs_nome_cadastro',
                    rotulo: 'Filtrar por nome do Profissional Responsável'
                  },
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.identificacao_condicao_diabetes))],
                    filtro: 'identificacao_condicao_diabetes',
                    rotulo: 'Filtrar por tipo de diagnóstico'
                  },
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.equipe_nome_cadastro))],
                    filtro: 'equipe_nome_cadastro',
                    rotulo: 'Filtrar por nome da equipe'
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
                IDFiltrosOrdenacao={IDFiltrosOrdenacaoDiabetes} 
                atualizacao = {new Date(tabelaDataEquipe.reduce((maisRecente, objeto) => {
                  const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
                  const dataMaisRecenteAnterior = new Date(maisRecente);
                  return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
              }, "2000-01-01")).toLocaleString('pt-BR', { 
                timeZone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
               })}
              trackObject={mixpanel}
              lista="diabetes"
              aba={null}
              sub_aba={null}

              /> : <Spinner/>
            }
        </>
      )
  }
  if(session.user.perfis.includes(5) || session.user.perfis.includes(8)){
    visao = "aps"
    return (
      <>
          <div style={{padding: "30px 80px 30px 80px",display: "flex"}}>
            <ButtonLight icone={{posicao: 'right',
              url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
              label="VOLTAR" link="/inicio"/>
          {
            tabelaDataAPS &&
            <div style={{marginLeft:"auto"}}>
              <ButtonColorSubmitIcon
                  label="CLIQUE AQUI PARA IMPRIMIR"
                  icon="https://media.graphassets.com/3vsKrZXYT9CdxSSyhjhk"
                  submit={Impressao}
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
        <MunicipioQuadrimestre data={tabelaDataAPS && tabelaDataAPS[0].atualizacao_data} />
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
                data: [...new Set(tabelaDataAPS.map(item => item.acs_nome_cadastro))],
                filtro: 'acs_nome_cadastro',
                rotulo: 'Filtrar por nome do Profissional Responsável'
              },
              {
                data: [...new Set(tabelaDataAPS.map(item => item.identificacao_condicao_diabetes))],
                filtro: 'identificacao_condicao_diabetes',
                rotulo: 'Filtrar por tipo de diagnóstico'
              },
              {
                data: [...new Set(tabelaDataAPS.map(item => item.equipe_nome_cadastro))],
                filtro: 'equipe_nome_cadastro',
                rotulo: 'Filtrar por nome da equipe'
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
            IDFiltrosOrdenacao={IDFiltrosOrdenacaoDiabetes} 
            atualizacao = {new Date(tabelaDataAPS.reduce((maisRecente, objeto) => {
              const dataAtual = new Date(objeto.dt_registro_producao_mais_recente);
              const dataMaisRecenteAnterior = new Date(maisRecente);
              return dataAtual > dataMaisRecenteAnterior ? objeto.dt_registro_producao_mais_recente : maisRecente
          }, "2000-01-01")).toLocaleString('pt-BR', { 
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
           })}
           trackObject={mixpanel}
           lista="diabetes"
           aba={null}
           sub_aba={null}

          /> : <Spinner/>
        }
      </>
    )
}
}else{
  if(status !== "authenticated" && status !== "loading" ) signOut()
}
if(status=="unauthenticated") router.push('/')
}
export default Index;
