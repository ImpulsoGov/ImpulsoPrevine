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
import { colunasHipertensao } from "../../../helpers/colunasHipertensao";
import { tabelaHipertensaoEquipe , tabelaHipertensaoAPS } from "../../../services/busca_ativa/Hipertensao";

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
  const HipertensaoTabelaDataAPS = async()=> await tabelaHipertensaoAPS(session?.user?.municipio,session?.user?.access_token)
  useEffect(()=>{
    session && (session.user.perfis.includes(8) || session.user.perfis.includes(5)) &&
    HipertensaoTabelaDataAPS().then((response)=>{
      setTabelaDataAPS(response)
  })},[session]) 

  const [tabelaDataEquipe, setTabelaDataEquipe] = useState();
  const HipertensaoTabelaDataEquipe = async()=> await tabelaHipertensaoEquipe(session?.user?.municipio,session?.user?.equipe,session?.user?.access_token)
  useEffect(()=>{
    session &&  session.user.perfis.includes(9) &&
    HipertensaoTabelaDataEquipe().then((response)=>{
      setTabelaDataEquipe(response)
  })},[session]) 

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
  const titlesBuscaAtiva = [
    {
      label: "Indicador Hipertensão",
    }
  ]
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
                label="CLICK AQUI PARA IMPRIMIR"
                escala="0.78"
                child={<TabelaHiperDiaImpressao data={tabelaDataEquipe} colunas={colunasHipertensao}/>}
              />
            </div>
          }
          </div>
          <TituloTexto
                  titulo="Lista Nominal Hipertensão"
                  texto="Oferecemos três listas nominais para monitoramento dos seguintes grupos: gestantes, pessoas com hipertensão e pessoas com diabetes. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos."
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
              tabelaDataEquipe &&
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
                    data: [...new Set(tabelaDataEquipe.map(item => item.identificacao_condicao_hipertensao))],
                    filtro: 'identificacao_condicao_hipertensao',
                    rotulo: 'Filtrar por tipo de diagnóstico'
                  },
                ]}
                painel="hipertensao"
                tabela={{
                  colunas: colunasHipertensao,
                  data:tabelaDataEquipe
                }}
              />
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
            label="VOLTAR" link="/inicio"
          />
          {
            tabelaDataAPS &&
            <div style={{marginLeft:"auto"}}>
              <ButtonPrint
                label="CLICK AQUI PARA IMPRIMIR"
                escala="0.78"
                child={<TabelaHiperDiaImpressao data={tabelaDataAPS} colunas={colunasHipertensao}/>}
              />
            </div>
          }

        </div>
        <TituloTexto
                titulo="Lista Nominal Hipertensão"
                texto="Oferecemos três listas nominais para monitoramento dos seguintes grupos: gestantes, pessoas com hipertensão e pessoas com diabetes. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos."
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
            color: [
              '#1D856C',
              '#2EB280',
              '#55D499',
              '#9DEECD'
            ],
            grid: {
              containLabel: true,
              top: '20%'
            },
            legend: {
              data: [
                'Apenas consulta em dia',
                'consulta e aferição de PA em dia',
                'Apenas aferição de PA em dia',
                'Nada em dia'
              ],
              top: 'top'
            },
            series: [
              {
                data: Object.values(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_consulta == "Em dia") acumulador[item.equipe_ine_cadastro] = (acumulador[item.equipe_ine_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'Apenas consulta em dia',
                stack: 'stack',
                type: 'bar'
              },
              {
                data: Object.values(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_consulta == "Em dia" && item.prazo_proxima_afericao_pa == "Em dia") acumulador[item.equipe_ine_cadastro] = (acumulador[item.equipe_ine_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'consulta e aferição de PA em dia',
                stack: 'stack',
                type: 'bar'
              },
              {
                data: Object.values(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_afericao_pa == "Em dia") acumulador[item.equipe_ine_cadastro] = (acumulador[item.equipe_ine_cadastro] || 0) + 1
                  return acumulador
                },{})),
                name: 'Apenas aferição de PA em dia',
                stack: 'stack',
                type: 'bar'
              },
              {
                data: Object.values(tabelaDataAPS.reduce((acumulador,item)=>{ 
                  if(item.prazo_proxima_consulta != "Em dia" && item.prazo_proxima_afericao_pa != "Em dia") acumulador[item.equipe_ine_cadastro] = (acumulador[item.equipe_ine_cadastro] || 0) + 1
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
                width : 50,
                show : true,
                interval : 0,
                hideOverlap : false,
                overflow : "break"
              }
            },
            yAxis: {
              type: 'value'
            }
          }}
          dataRosca={{
            color: [
              '#1D856C',
              '#2EB280',
              '#55D499',
              '#9DEECD'
            ],
            series: [
              {
                avoidLabelOverlap: false,
                data: [
                  {
                    name: 'Apenas consulta em dia',
                    value: Math.round((tabelaDataAPS.reduce((acumulador,item)=>{ 
                      return (item.prazo_proxima_consulta == "Em dia") ?
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
                      return (item.prazo_proxima_afericao_pa == "Em dia") ?
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
          tabelaDataAPS ?
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
                data: [...new Set(tabelaDataAPS.map(item => item.identificacao_condicao_hipertensao))],
                filtro: 'identificacao_condicao_hipertensao',
                rotulo: 'Filtrar por tipo de diagnóstico'
              },
            ]}
            painel="hipertensao"
            tabela={{
              colunas: colunasHipertensao,
              data:tabelaDataAPS
            }}
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