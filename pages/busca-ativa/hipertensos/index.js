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
import { Imprimir } from "../../../helpers/imprimir"
import { redirectHome } from "../../../helpers/redirectHome";
import { colunasHipertensao } from "../../../helpers/colunasHipertensao";
import { tabelaHipertensaoEquipe , tabelaHipertensaoAPS } from "../../../services/busca_ativa/Hipertensao";
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
  const HipertensaoTabelaDataAPS = async()=> await tabelaHipertensaoAPS(session?.user?.municipio_id_sus,session?.user?.access_token)
  useEffect(()=>{
    session && (session.user.perfis.includes(8) || session.user.perfis.includes(5)) &&
    HipertensaoTabelaDataAPS().then((response)=>{
      setTabelaDataAPS(response)
  })},[session]) 

  const [tabelaDataEquipe, setTabelaDataEquipe] = useState();
  const HipertensaoTabelaDataEquipe = async()=> await tabelaHipertensaoEquipe(session?.user?.municipio_id_sus,session?.user?.equipe,session?.user?.access_token)
  useEffect(()=>{
    session &&  session.user.perfis.includes(9) &&
    HipertensaoTabelaDataEquipe().then((response)=>{
      setTabelaDataEquipe(response)
  })},[session]) 

  const [tabelaData, setTabelaData] = useState([]);

  const datefiltrosHipertensao = [
    "dt_afericao_pressao_mais_recente",
    "dt_consulta_mais_recente",
    ]
  const rotulosfiltrosHipertensao = [
    "NOMES DE A-Z",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z",
    "DATA DA CONSULTA MAIS RECENTE",
    "DATA DA AFERIÇÃO DE PA MAIS RECENTE",
    ]
  const IDFiltrosHipertensao = {
    "NOMES DE A-Z": "cidadao_nome",
    "DATA DA CONSULTA MAIS RECENTE" : "dt_consulta_mais_recente",
    "DATA DA AFERIÇÃO DE PA MAIS RECENTE": "dt_afericao_pressao_mais_recente",
    "NOME DO PROFISSIONAL RESPONSÁVEL DE A-Z" : "acs_nome_cadastro"
    }
  const IDFiltrosOrdenacaoHipertensao = {
    "cidadao_nome" : "asc",
    "dt_consulta_mais_recente" : "asc",
    "prazo_proxima_consulta" : "asc",
    "dt_afericao_pressao_mais_recente" : "asc",
    "prazo_proxima_afericao_pa" : "asc",
    "acs_nome_cadastro" : "asc",
  }
  const Impressao = ()=> Imprimir(
    0.78,
    <TabelaHiperDiaImpressao data={tabelaData} colunas={colunasHipertensao} fontFamily="sans-serif" />,
    "hipertensao",
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
      const dataAtual = Date.now();
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
                  titulo="Lista Nominal Hipertensão"
                  texto=""
                  imagem = {{posicao: null,url: ''}}
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
                    descricao: 'Total de pessoas com hipertensão',
                    valor: tabelaDataEquipe.length
                  },
                  {
                    descricao: 'Total de pessoas com consulta e aferição de PA em dia',
                    valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_afericao_pa == "Em dia") ?
                      acumulador + 1 : acumulador;
                    },0)
                  },
                  {
                    descricao: 'Total de pessoas com diagnóstico autorreferido',
                    valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                      return (item.identificacao_condicao_hipertensao == "Autorreferida") ?
                      acumulador + 1 : acumulador;
                    },0)
                  },
                  {
                    descricao: 'Total de pessoas com diagnóstico clínico',
                    valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                      return (item.identificacao_condicao_hipertensao == "Diagnóstico Clínico") ?
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
                    data: [...new Set(tabelaDataEquipe.map(item => item.identificacao_condicao_hipertensao))],
                    filtro: 'identificacao_condicao_hipertensao',
                    rotulo: 'Filtrar por tipo de diagnóstico'
                  },
                  {
                    data: [...new Set(tabelaDataEquipe.map(item => item.equipe_nome_cadastro))],
                    filtro: 'equipe_nome_cadastro',
                    rotulo: 'Filtrar por nome da equipe'
                  },
                ]}
                painel="hipertensao"
                tabela={{
                  colunas: colunasHipertensao,
                  data:tabelaDataEquipe
                }}
                data={tabelaData}
                setData={setTabelaData}
                datefiltros={datefiltrosHipertensao}
                IDFiltros={IDFiltrosHipertensao}
                rotulosfiltros={rotulosfiltrosHipertensao} 
                IDFiltrosOrdenacao={IDFiltrosOrdenacaoHipertensao}   
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
              lista="hipertensao"
              aba={null}
              sub_aba={null}
      
                /> : <Spinner/>
            }
        </>
      )
  }
  if(session.user.perfis.includes(5) || session.user.perfis.includes(8)){
    visao = "aps"
    const dataAtual = Date.now();
    return (
      <>
        <div style={{padding: "30px 80px 30px 80px",display: "flex"}}>
          <ButtonLight icone={{posicao: 'right',
            url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} 
            label="VOLTAR" link="/inicio"
          />
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
                titulo="Lista Nominal Hipertensão"
                texto=""
                imagem = {{posicao: null,url: ''}}
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
                descricao: 'Total de pessoas com hipertensão',
                valor: tabelaDataAPS.length
              },
              {
                descricao: 'Total de pessoas com consulta e aferição de PA em dia',
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                  return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_afericao_pa == "Em dia") ?
                  acumulador + 1 : acumulador;
                },0)
              },
              {
                descricao: 'Total de pessoas com diagnóstico autorreferido',
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                  return (item.identificacao_condicao_hipertensao == "Autorreferida") ?
                  acumulador + 1 : acumulador;
                },0)
              },
              {
                descricao: 'Total de pessoas com diagnóstico clínico',
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                  return (item.identificacao_condicao_hipertensao == "Diagnóstico Clínico") ?
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
                'Consulta e aferição de PA em dia',
                'Apenas aferição de PA em dia',
                'Nada em dia'
              ],
              top: '60'
            },
            series: [
              {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_afericao_pa != "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'Apenas consulta em dia',
                stack: 'stack',
                type: 'bar'
              },
              {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_afericao_pa == "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'Consulta e aferição de PA em dia',
                stack: 'stack',
                type: 'bar'
              },
              {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_afericao_pa == "Em dia" && item.prazo_proxima_consulta != "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'Apenas aferição de PA em dia',
                stack: 'stack',
                type: 'bar'
              },
              {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_consulta != "Em dia" && item.prazo_proxima_afericao_pa != "Em dia") acumulador[item.equipe_nome_cadastro] = (acumulador[item.equipe_nome_cadastro] || 0) + 1
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
                      return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_afericao_pa != "Em dia") ?
                      acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.length)
                  },
                  {
                    name: 'Consulta e Aferição em dia',
                    value: Math.round((tabelaDataAPS.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_afericao_pa == "Em dia") ?
                      acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.length)
                  },
                  {
                    name: 'Apenas Aferição de PA em dia',
                    value: Math.round((tabelaDataAPS.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_afericao_pa == "Em dia" && item.prazo_proxima_consulta != "Em dia" ) ?
                      acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.length)
                  },
                  {
                    name: 'Nada em dia',
                    value: Math.round((tabelaDataAPS.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_consulta != "Em dia" && item.prazo_proxima_afericao_pa != "Em dia") ?
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
                data: [...new Set(tabelaDataAPS.map(item => item.identificacao_condicao_hipertensao))],
                filtro: 'identificacao_condicao_hipertensao',
                rotulo: 'Filtrar por tipo de diagnóstico'
              },
              {
                data: [...new Set(tabelaDataAPS.map(item => item.equipe_nome_cadastro))],
                filtro: 'equipe_nome_cadastro',
                rotulo: 'Filtrar por nome da equipe'
              },
            ]}
            painel="hipertensao"
            tabela={{
              colunas: colunasHipertensao,
              data:tabelaDataAPS
            }}
            data={tabelaData}
            setData={setTabelaData}
            datefiltros={datefiltrosHipertensao}
            IDFiltros={IDFiltrosHipertensao}
            rotulosfiltros={rotulosfiltrosHipertensao}    
            IDFiltrosOrdenacao={IDFiltrosOrdenacaoHipertensao}  
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
          lista="hipertensao"
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
