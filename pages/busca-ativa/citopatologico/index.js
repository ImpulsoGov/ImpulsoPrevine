import { 
    CardAlert,
    TituloTexto, 
    ButtonLight, 
    PainelBuscaAtiva , 
    ScoreCardGrid , 
    Spinner, 
    GraficoBuscaAtiva,
    ButtonPrint,
    TabelaHiperDiaImpressao,
    PanelSelector
} from "@impulsogov/design-system";
import { useSession,signOut, getSession } from "next-auth/react"
import React, { useState,useEffect } from 'react';
import { getData } from '../../../services/cms'
import { LAYOUT } from '../../../utils/QUERYS'
import { validatetoken} from "../../../services/validateToken"
import { redirectHome } from "../../../helpers/redirectHome";
import { colunasCito } from "../../../helpers/colunasCito";
import { tabelaCitoEquipe , tabelaCitoAPS } from "../../../services/busca_ativa/Cito";
import status_usuario_descricao  from "../../../data/StatusAcompanhamento.json" assert { type: 'json' };
import faixa_etarias from '../../../data/faixa_etarias.json' assert { type: 'json' };
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

const CitoTabelaDataAPS = async()=> await tabelaCitoAPS(session?.user?.municipio,session?.user?.access_token)
useEffect(()=>{
    session && (session.user.perfis.includes(8) || session.user.perfis.includes(5)) &&
    CitoTabelaDataAPS().then((response)=>{
    setTabelaDataAPS(response)
})},[session]) 

const [tabelaDataEquipe, setTabelaDataEquipe] = useState();
const CitoTabelaDataEquipe = async()=> await tabelaCitoEquipe(session?.user?.municipio,session?.user?.equipe,session?.user?.access_token)
useEffect(()=>{
    session &&  session.user.perfis.includes(9) &&
    CitoTabelaDataEquipe().then((response)=>{
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
if(session){  
    if(session.user.perfis.includes(9)){
        const CardsChild = tabelaDataEquipe && <ScoreCardGrid
        valores={[
            {
                descricao: 'Total de mulheres',
                valor: tabelaDataEquipe.length
            },
            {
                descricao: 'Total de mulheres com a coleta de citopatológico em dia',
                valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                return (item.id_status_usuario == 12) ?
                acumulador + 1 : acumulador;
                },0)
            },
            {
                descricao: 'Total de mulheres que nunca relizaram a coleta de citopatológico',
                valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                return (item.id_status_usuario == 13) ?
                acumulador + 1 : acumulador;
                },0)
            },
            {
                descricao: 'Total de mulheres com a coleta de citopatológico vencida (ou a vencer até o fim do quadrimestre)',
                valor: tabelaDataEquipe.reduce((acumulador,item)=>{ 
                return (item.id_status_usuario == 16) ?
                acumulador + 1 : acumulador;
                },0)
            }
        ]}
    />
    const tabelaDataEquipeSemExame = tabelaDataEquipe?.filter(item=>item.id_status_usuario != 12)
    const TabelaChildSemExame = tabelaDataEquipe ? <PainelBuscaAtiva
        dadosFiltros={[
            {
                data: [...new Set(tabelaDataEquipeSemExame.map(item => item.equipe_nome))],
                filtro: 'equipe_nome',
                rotulo: 'Filtrar por nome da equipe'
            },
            {
                data: [...new Set(tabelaDataEquipeSemExame.map(item => item.equipe_ine))],
                filtro: 'equipe_ine',
                rotulo: 'Filtrar por INE da equipe'
            },
            {
                data: [...new Set(tabelaDataEquipeSemExame.map(item => item.id_faixa_etaria))],
                filtro: 'id_faixa_etaria',
                rotulo: 'Filtrar por faixa etária'
            },
            {
                data: [...new Set(tabelaDataEquipeSemExame.map(item => item.id_status_usuario))],
                labels : [...new Set(status_usuario_descricao.data.map(item=> item.status_usuario_descricao))],
                filtro: 'id_status_usuario',
                rotulo: 'Filtrar por status'
            },
            {
                data: [...new Set(tabelaDataEquipeSemExame.map(item => item.acs_nome))],
                filtro: 'acs_nome',
                rotulo: 'Filtrar por nome do ACS'
            },
        ]}
        painel="cito"
        tabela={{
        colunas: colunasCito,
        data:tabelaDataEquipeSemExame
        }}
        data={tabelaData}
        setData={setTabelaData}
    /> : <Spinner/>
    const tabelaDataEquipeComExame = [...new Set(tabelaDataEquipe?.filter(item=>item.id_status_usuario == 12))]
    const TabelaChildComExame = tabelaDataEquipe ? 
    <>
    <PainelBuscaAtiva
        dadosFiltros={[
            {
                data: [...new Set(tabelaDataEquipeComExame.map(item => item.equipe_nome))],
                filtro: 'equipe_nome',
                rotulo: 'Filtrar por nome da equipe'
            },
            {
                data: [...new Set(tabelaDataEquipeComExame.map(item => item.equipe_ine))],
                filtro: 'equipe_ine',
                rotulo: 'Filtrar por INE da equipe'
            },
            {
                data: [...new Set(tabelaDataEquipeComExame.map(item => item.id_faixa_etaria))],
                filtro: 'id_faixa_etaria',
                rotulo: 'Filtrar por faixa etária'
            },
            {
                data: [...new Set(tabelaDataEquipeComExame.map(item => item.id_status_usuario))],
                labels : [...new Set(status_usuario_descricao.data.map(item=> item.status_usuario_descricao))],
                filtro: 'id_status_usuario',
                rotulo: 'Filtrar por status'
            },
            {
                data: [...new Set(tabelaDataEquipeComExame.map(item => item.acs_nome))],
                filtro: 'acs_nome',
                rotulo: 'Filtrar por nome do ACS'
            },
        ]}
        painel="cito"
        tabela={{
        colunas: colunasCito,
        data:tabelaDataEquipeComExame
        }}
        data={tabelaData}
        setData={setTabelaData}
    /> </>: <Spinner/>
    const Children = [[TabelaChildSemExame],[TabelaChildComExame]]


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
                child={<TabelaHiperDiaImpressao data={tabelaData} colunas={colunasCito}/>}
            />
            </div>
        }
        </div>
        <TituloTexto
                titulo="Lista Nominal de Citopatológico"
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
        <PanelSelector
            components={[Children]}
            conteudo = "components"
            list={[
                [
                  {
                    label: 'lista nominal (mulheres com exame a ser realizado)'.toUpperCase()
                  },
                  {
                    label: 'lista nominal (mulheres em dia com exame)'.toUpperCase()
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
if(session.user.perfis.includes(5) || session.user.perfis.includes(8)){
    const CardsChild = tabelaDataAPS && <ScoreCardGrid
        valores={[
            {
                descricao: 'Total de mulheres',
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
                return (item.id_status_usuario == 16) ?
                acumulador + 1 : acumulador;
                },0)
            }
        ]}
    />
    const GraficoChild = tabelaDataAPS && <GraficoBuscaAtiva
        dataBarra={{
            color: [
            '#1D856C',
            '#316d79',
            '#503740',
            '#F4BF81',
            '#B26161',
            ],
            grid: {
            containLabel: true,
            top: '20%'
            },
            legend: {
            data: [
                'Coleta em dia',
                'Nunca realizou coleta',
                'Coleta com menos de 25 anos',
                'Vence no final do quadrimestre',
                'Coleta vencida'
            ],
            top: 'top'
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
                name: 'Coleta com menos de 25 anos',
                stack: 'stack',
                type: 'bar'
            },
            {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                if(item.id_status_usuario == 15) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                return acumulador
                },{})),
                name: 'Vence no final do quadrimestre',
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
            color: [
                '#1D856C',
                '#316d79',
                '#503740',
                '#F4BF81',
                '#B26161',
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
        <div style={{padding: "30px 80px 30px 80px",display: "flex"}}>
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
                child={<TabelaHiperDiaImpressao data={tabelaData} colunas={colunasCito}/>}
            />
            </div>
        }
        </div>
        <TituloTexto
                titulo="Lista Nominal de Citopatológico"
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
        <PanelSelector
            components={[Children]}
            conteudo = "components"
            list={[
                [
                  {
                    label: 'GRÁFICOS'
                  },
                  {
                    label: 'lista nominal (mulheres com exame a ser realizado)'.toUpperCase()
                  },
                  {
                    label: 'lista nominal (mulheres em dia com exame)'.toUpperCase()
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
}
return(
    <p>{status}</p>
)
}

export default Index;