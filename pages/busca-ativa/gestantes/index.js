import { 
  CardAlert,
  TituloTexto, 
  ButtonLight, 
  PainelBuscaAtiva , 
  ScoreCardGrid , 
  Spinner, 
  GraficoBuscaAtiva,
  ButtonPrint,
  TabelaCitoImpressao,
  PanelSelector
} from "@impulsogov/design-system";
import { useSession,signOut, getSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { validatetoken} from "../../../services/validateToken"
import { redirectHome } from "../../../helpers/redirectHome";
import { colunasGestantes } from "../../../helpers/colunasGestantes";
import { tabelaGestantesEquipe , tabelaGestantesAPS } from "../../../services/busca_ativa/Gestantes";
import status_usuario_descricao  from "../../../data/StatusAcompanhamento.json" assert { type: 'json' };
import faixa_etarias from '../../../data/faixa_etarias.json' assert { type: 'json' };
import { useRouter } from 'next/router';

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
if(session){  
  if(session.user.perfis.includes(9)){
      const CardsChild = tabelaDataEquipe ? <ScoreCardGrid
      key={Math.random()}
      valores={[
          {
              descricao: 'Total de gestantes',
              valor: [...new Set(tabelaDataEquipe.map(item => item.chave_id_gestacao))].length
          },
          {
              descricao: 'Total de gestantes ativas',
              valor: tabelaDataEquipe.filter(item=> item.id_status_usuario == 8).length
          },
          {
            descricao: 'Total de getantes ativas contabilizando para os três indicadores',
            valor: tabelaDataEquipe.filter(item=>{ 
            return(
              item.id_status_usuario == 8
              && item.consultas_pre_natal_validas >= 6
              && item.gestacao_idade_gestacional_primeiro_atendimento <= 12
              && item.id_exame_hiv_sifilis == 4
              && item.id_atendimento_odontologico == 1
            )}).length
          },
          {
            descricao: 'Gestantes ativas, com 6 ou mais consultas, com a primeira consulta realizada até a 12ª semana de gestação',
            valor: tabelaDataEquipe.filter((item)=>{ 
            return (
              item.id_status_usuario == 8
              && item.consultas_pre_natal_validas >=6
              && item.gestacao_idade_gestacional_primeiro_atendimento <= 12
            )}).length
          },
          {
            descricao: 'Gestantes ativas, com atendimento odontológico realizado',
            valor: tabelaDataEquipe.filter((item)=>{ 
            return (
              item.id_status_usuario == 8
              && item.id_atendimento_odontologico == 1) 
            }).length
          },
          {
            descricao: 'Gestantes ativas, com os dois exames realizados e identificados',
            valor: tabelaDataEquipe.filter((item)=>{ 
            return ( 
              item.id_status_usuario == 8
              && item.id_exame_hiv_sifilis == 4)
            }).length
          },
    ]}
      /> : <Spinner key={Math.random()}/>
  const tabelaDataEquipeGestantesAtivas = tabelaDataEquipe.filter(item=>item.id_status_usuario == 8)
  const TabelaChildGestantesAtivas = tabelaDataEquipeGestantesAtivas && tabelaDataEquipeGestantesAtivas.length>0 &&tabelaDataEquipe && tabelaData ? 
  <>
  <PainelBuscaAtiva
      key={Math.random()}
      dadosFiltros={[
        {
          data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.acs_nome))],
          filtro: 'acs_nome',
          rotulo: 'Filtrar por Profissional Responsável'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.consultas_pre_natal_validas))],
            filtro: 'consultas_pre_natal_validas',
            rotulo: 'Filtrar por numero de consultas'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.id_atendimento_odontologico))],
            filtro: 'id_atendimento_odontologico',
            rotulo: 'Filtrar por atendimento odontológico'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.id_exame_hiv_sifilis))],
            filtro: 'id_exame_hiv_sifilis',
            rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
        },
        {
          data: [...new Set(tabelaDataEquipeGestantesAtivas.map(item => item.gestacao_quadrimestre))],
          filtro: 'gestacao_quadrimestre',
          rotulo: 'Filtrar por quadrimestre'
        },
      ]}
      painel="gestantes"
      tabela={{
      colunas: colunasGestantes,
      data:tabelaDataEquipeGestantesAtivas
      }}
      data={tabelaData}
      setData={setTabelaData}
  /></> : <Spinner key={Math.random()}/>
  
  const tabelaDataEquipeGestantesSemDUM = tabelaDataEquipe.filter(item=>item.id_status_usuario == 11)
  const TabelaChildGestantesSemDUM = tabelaDataEquipeGestantesSemDUM && tabelaDataEquipeGestantesSemDUM.length>0 && tabelaDataEquipe && tabelaData ? 
  <>
  <PainelBuscaAtiva
      key={Math.random()}
      dadosFiltros={[
        {
          data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.acs_nome))],
          filtro: 'acs_nome',
          rotulo: 'Filtrar por Profissional Responsável'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.consultas_pre_natal_validas))],
            filtro: 'consultas_pre_natal_validas',
            rotulo: 'Filtrar por numero de consultas'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.id_atendimento_odontologico))],
            filtro: 'id_atendimento_odontologico',
            rotulo: 'Filtrar por atendimento odontológico'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.id_exame_hiv_sifilis))],
            filtro: 'id_exame_hiv_sifilis',
            rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
        },
        {
          data: [...new Set(tabelaDataEquipeGestantesSemDUM.map(item => item.gestacao_quadrimestre))],
          filtro: 'gestacao_quadrimestre',
          rotulo: 'Filtrar por quadrimestre'
        },
      ]}
      painel="gestantes"
      tabela={{
      colunas: colunasGestantes,
      data:tabelaDataEquipeGestantesSemDUM
      }}
      data={tabelaData}
      setData={setTabelaData}
  /></> : <Spinner key={Math.random()}/>

  const tabelaDataEquipeGestantesEncerradas = tabelaDataEquipe?.filter(item=>item.id_status_usuario == 9)
  const TabelaChildGestantesEncerradas = tabelaDataEquipeGestantesEncerradas && tabelaDataEquipeGestantesEncerradas.length>0 &&tabelaDataEquipe && tabelaData ? 
  <>
  <PainelBuscaAtiva
      key={Math.random()}
      dadosFiltros={[
        {
          data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.acs_nome))],
          filtro: 'acs_nome',
          rotulo: 'Filtrar por Profissional Responsável'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.consultas_pre_natal_validas))],
            filtro: 'consultas_pre_natal_validas',
            rotulo: 'Filtrar por numero de consultas'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.id_atendimento_odontologico))],
            filtro: 'id_atendimento_odontologico',
            rotulo: 'Filtrar por atendimento odontológico'
        },
        {
            data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.id_exame_hiv_sifilis))],
            filtro: 'id_exame_hiv_sifilis',
            rotulo: 'Filtrar por identificação do exame de sífilis e HIV'
        },
        {
          data: [...new Set(tabelaDataEquipeGestantesEncerradas.map(item => item.gestacao_quadrimestre))],
          filtro: 'gestacao_quadrimestre',
          rotulo: 'Filtrar por quadrimestre'
        },
      ]}
      painel="gestantes"
      tabela={{
      colunas: colunasGestantes,
      data:tabelaDataEquipeGestantesEncerradas
      }}
      data={tabelaData}
      setData={setTabelaData}
  /></> : <Spinner key={Math.random()}/>
  const Children = [[CardsChild,TabelaChildGestantesAtivas],[CardsChild,TabelaChildGestantesSemDUM],[CardsChild,TabelaChildGestantesEncerradas]]

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
          tabelaDataEquipe &&
          <div style={{marginLeft:"auto"}}>
          <ButtonPrint
              label="CLIQUE AQUI PARA IMPRIMIR"
              escala="0.78"
              child={<TabelaCitoImpressao data={tabelaData} colunas={colunasGestantes} status_usuario_descricao={status_usuario_descricao}/>}
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
          components={[Children]}
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
    const CardsChild = tabelaDataAPS ? <ScoreCardGrid
        valores={[
            {
                descricao: 'Total de mulheres de 25 a 64 anos',
                valor: tabelaDataAPS.length
            },
            {
                descricao: 'Total de mulheres com a coleta de citopatológico em dia',
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                return (item.id_status_usuario == 12) ?
                acumulador + 1 : acumulador;
                },0)
            },
            {
                descricao: 'Total de mulheres que nunca relizaram a coleta de citopatológico',
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                return (item.id_status_usuario == 13) ?
                acumulador + 1 : acumulador;
                },0)
            },
            {
                descricao: 'Total de mulheres com a coleta de citopatológico vencida (ou a vencer até o fim do quadrimestre)',
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                return (item.id_status_usuario == 15 || item.id_status_usuario == 16) ?
                acumulador + 1 : acumulador;
                },0)
            },
            {
                descricao: 'Coleta realizada antes dos 25 anos (Não contabilizada para o Previne Brasil)',
                valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
                return (item.id_status_usuario == 14) ?
                acumulador + 1 : acumulador;
                },0)
            }
        ]}
    /> : <Spinner/>
    const GraficoChild = tabelaDataAPS && 
        <>
            <h2 style={{
                marginTop : '30px',
                marginLeft : '120px',
                color: "#1F1F1F",
                fontSize: "22px",
                fontFamily: "Inter",
                fontWeight: 500,
                lineHeight: "130%",
            }}>
                Mulheres dentro da faixa etaria de 25 a 64 anos 
            </h2>
            <GraficoBuscaAtiva
                dataBarra={{
                    title: {
                        text: 'Distribuição por equipe',
                        subtext: '',
                        left: '80'
                    },
                    color: [
                        '#2EB280',
                        '#E95F3A',
                        '#EABF2E',
                        '#57C7DC',
                        '#7579EA',
                    ],
                    grid: {
                    containLabel: true,
                    top: '20%'
                    },
                    legend: {
                    data: [
                        'Coleta em dia',
                        'Nunca realizou coleta',
                        'Coleta antes dos 25 anos de idade',
                        'Vence neste quadrimestre',
                        'Coleta vencida'
                    ],
                    top: '60',
                    left: '80',
                    },
                    series: [
                    {
                        data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                        if(item.id_status_usuario == 12) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                        return acumulador
                        },{})),
                        name: 'Coleta em dia',
                        stack: 'stack',
                        type: 'bar'
                    },
                    {
                        data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                        if(item.id_status_usuario == 13) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                        return acumulador
                        },{})),
                        name: 'Nunca realizou coleta',
                        stack: 'stack',
                        type: 'bar'
                    },
                    {
                        data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                        if(item.id_status_usuario == 14) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                        return acumulador
                        },{})),
                        name: 'Coleta antes dos 25 anos de idade',
                        stack: 'stack',
                        type: 'bar'
                    },
                    {
                        data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                        if(item.id_status_usuario == 15) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                        return acumulador
                        },{})),
                        name: 'Vence neste quadrimestre',
                        stack: 'stack',
                        type: 'bar'
                    },
                    {
                        data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                        if(item.id_status_usuario == 16) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                        return acumulador
                        },{})),
                        name: 'Coleta vencida',
                        stack: 'stack',
                        type: 'bar'
                    }
                    ],
                    tooltip: {
                    trigger: 'axis'
                    },
                    xAxis: {
                    data: [...new Set(tabelaDataAPS.map(item => item.equipe_nome))],
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
                        '#2EB280',
                        '#E95F3A',
                        '#EABF2E',
                        '#57C7DC',
                        '#7579EA',
                    ],
                    series: [
                    {
                        avoidLabelOverlap: false,
                        data: [
                        {
                            name: 'Coleta em dia',
                            value: ((tabelaDataAPS.reduce((acumulador,item)=>{ 
                            return (item.id_status_usuario == 12) ? acumulador + 1 : acumulador;
                            },0)*100)/tabelaDataAPS.length).toFixed(2)
                        },
                        {
                            name: 'Nunca realizou coleta',
                            value: ((tabelaDataAPS.reduce((acumulador,item)=>{ 
                            return (item.id_status_usuario == 13) ?
                            acumulador + 1 : acumulador;
                            },0)*100)/tabelaDataAPS.length).toFixed(2)
                        },
                        {
                            name: 'Coleta com menos de 25 anos',
                            value: ((tabelaDataAPS.reduce((acumulador,item)=>{ 
                            return (item.id_status_usuario == 14) ? acumulador + 1 : acumulador;
                            },0)*100)/tabelaDataAPS.length).toFixed(2)
                        },
                        {
                            name: 'Vence no final do quadrimestre',
                            value: ((tabelaDataAPS.reduce((acumulador,item)=>{ 
                            return (item.id_status_usuario == 15) ?
                            acumulador + 1 : acumulador;
                            },0)*100)/tabelaDataAPS.length).toFixed(2)
                        },
                        {
                            name: 'Coleta vencida',
                            value: ((tabelaDataAPS.reduce((acumulador,item)=>{ 
                            return (item.id_status_usuario == 16) ?
                            acumulador + 1 : acumulador;
                            },0)*100)/tabelaDataAPS.length).toFixed(2)
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
        </>
    const tabelaDataAPSSemExame = tabelaDataAPS?.filter(item=>item.id_status_usuario != 12)
    const TabelaChildSemExame = tabelaDataAPS ? <PainelBuscaAtiva
        dadosFiltros={[
            {
                data: [...new Set(tabelaDataAPSSemExame.map(item => item.equipe_nome))],
                filtro: 'equipe_nome',
                rotulo: 'Filtrar por nome da equipe'
            },
            {
                data: [...new Set(tabelaDataAPSSemExame.map(item => item.equipe_ine))],
                filtro: 'equipe_ine',
                rotulo: 'Filtrar por INE da equipe'
            },
            {
                data: [...new Set(tabelaDataAPSSemExame.map(item => item.id_faixa_etaria))],
                labels : [...new Set(faixa_etarias.data.map(item=> item.faixa_etaria_descricao))],
                filtro: 'id_faixa_etaria',
                rotulo: 'Filtrar por faixa etária'
            },
            {
                data: [...new Set(tabelaDataAPSSemExame.map(item => item.id_status_usuario))],
                labels : [...new Set(status_usuario_descricao.data.map(item=> item.status_usuario_descricao))],
                filtro: 'id_status_usuario',
                rotulo: 'Filtrar por status'
            },
            {
                data: [...new Set(tabelaDataAPSSemExame.map(item => item.acs_nome))],
                filtro: 'acs_nome',
                rotulo: 'Filtrar por nome do ACS'
            },
        ]}
        painel="cito"
        tabela={{
        colunas: colunasCito,
        data:tabelaDataAPSSemExame
        }}
        data={tabelaData}
        setData={setTabelaData}
    /> : <Spinner/>
    const tabelaDataAPSComExame = [...new Set(tabelaDataAPS?.filter(item=>item.id_status_usuario == 12))]
    const TabelaChildComExame = tabelaDataAPS ? 
    <>
    <PainelBuscaAtiva
        dadosFiltros={[
            {
                data: [...new Set(tabelaDataAPSComExame.map(item => item.equipe_nome))],
                filtro: 'equipe_nome',
                rotulo: 'Filtrar por nome da equipe'
            },
            {
                data: [...new Set(tabelaDataAPSComExame.map(item => item.equipe_ine))],
                filtro: 'equipe_ine',
                rotulo: 'Filtrar por INE da equipe'
            },
            {
                data: [...new Set(tabelaDataAPSComExame.map(item => item.id_faixa_etaria))],
                labels : [...new Set(faixa_etarias.data.map(item=> item.faixa_etaria_descricao))],
                filtro: 'id_faixa_etaria',
                rotulo: 'Filtrar por faixa etária'
            },
            {
                data: [...new Set(tabelaDataAPSComExame.map(item => item.id_status_usuario))],
                labels : [...new Set(status_usuario_descricao.data.map(item=> item.status_usuario_descricao))],
                filtro: 'id_status_usuario',
                rotulo: 'Filtrar por status'
            },
            {
                data: [...new Set(tabelaDataAPSComExame.map(item => item.acs_nome))],
                filtro: 'acs_nome',
                rotulo: 'Filtrar por nome do ACS'
            },
        ]}
        painel="cito"
        tabela={{
        colunas: colunasCito,
        data:tabelaDataAPSComExame
        }}
        data={tabelaData}
        setData={setTabelaData}
    /> </>: <Spinner/>
    const Children = [[CardsChild,GraficoChild],[TabelaChildSemExame],[TabelaChildComExame]]

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
                child={<TabelaCitoImpressao data={tabelaData} colunas={colunasCito} status_usuario_descricao={status_usuario_descricao}/>}
            />
            </div>
        }
        </div>
        <TituloTexto
                titulo="Lista Nominal de Citopatológico"
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
        <PanelSelector
            components={[Children]}
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
                    label: 'GRÁFICOS'
                  },
                  {
                    label: 'MULHERES COM EXAME A SER REALIZADO'
                  },
                  {
                    label: 'MULHERES EM DIA COM EXAME'
                  }
                ],
                ]}
              titles={[
                {
                  label: ''
                },
                ]}
        />
    </>
    )
  }
}else{
  if(status !== "loading"){
    if(status !== "authenticated") signOut()
  }
}

}

export default Index;
