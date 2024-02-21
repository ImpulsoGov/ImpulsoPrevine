import { GraficoBuscaAtiva, ScoreCardGrid, Spinner } from "@impulsogov/design-system";
import { obterDadosQuadrimestre } from "../../../../../../utils/quadrimestre";
const CardsGraficoIndicadorDoisQuadriAtual = ({tabelaDataAPS}) =>{
    const dataQuadriAtual = tabelaDataAPS.filter(item => item.gestacao_quadrimestre == '2023.Q3')
    const dadosQuadriAtual = tabelaDataAPS
        ? obterDadosQuadrimestre(tabelaDataAPS[0].dt_registro_producao_mais_recente)
        : null;
    const quadriAtualFormatado = dadosQuadriAtual
        ? `Q${Object.values(dadosQuadriAtual).join("/")}`
        : "";

    return tabelaDataAPS ? 
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
            {quadriAtualFormatado} - Gestantes com DUM preenchida por exames de Sífilis e HIV identificados por equipe de saúde
        </h2>
        <ScoreCardGrid
        valores={[
            {
                descricao: 'Gestantes com os dois exames realizados e identificados',
                valor: dataQuadriAtual.reduce((acumulador,item)=>{ 
                return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) && item.id_exame_hiv_sifilis == 4)  ?
                acumulador + 1 : acumulador;
                },0)
            },
            {
                descricao: 'Gestantes com apenas um dos exames realizados e identificados',
                valor: dataQuadriAtual.reduce((acumulador,item)=>{ 
                return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) && (item.id_exame_hiv_sifilis == 1 || item.id_exame_hiv_sifilis == 2)) ?
                acumulador + 1 : acumulador;
                },0)
            },
            {
                descricao: 'Gestantes com nenhum dos exames realizados e identificados',
                valor: dataQuadriAtual.reduce((acumulador,item)=>{ 
                return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) & item.id_exame_hiv_sifilis == 3) ?
                acumulador + 1 : acumulador;
                },0)
            },
        ]}
        />
    </> : <Spinner/>}

const GraficoIndicadorDoisQuadriAtual = ({tabelaDataAPS}) => {
    const dataQuadriAtual = tabelaDataAPS.filter(item => item.gestacao_quadrimestre == '2023.Q3')
    return tabelaDataAPS ? 
    <>
        <GraficoBuscaAtiva
            dataBarra={{
                title: {
                    text: 'Distribuição por equipe',
                    subtext: '',
                    left: '80'
                },
                color: [
                    '#2EB280',
                    '#EF565D',
                    '#E98633',
                    '#7579EA',
                ],
                grid: {
                containLabel: true,
                top: '20%'
                },
                legend: {
                data: [
                    'Os dois exames identificados',
                    'Nenhum exame identificado',
                    'Ex. de Sífilis não identificado',
                    'Ex. de HIV não identificado',
                ],
                top: '60',
                left: '80',
                },
                series: [
                {
                    data: Object.entries(dataQuadriAtual.reduce((acumulador,item)=>{ 
                    if(item.id_exame_hiv_sifilis == 4) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Os dois exames identificados',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: Object.entries(dataQuadriAtual.reduce((acumulador,item)=>{ 
                    if(item.id_exame_hiv_sifilis == 3) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Nenhum exame identificado',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: Object.entries(dataQuadriAtual.reduce((acumulador,item)=>{ 
                    if(item.id_exame_hiv_sifilis == 1) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Ex. de Sífilis não identificado',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: Object.entries(dataQuadriAtual.reduce((acumulador,item)=>{ 
                    if(item.id_exame_hiv_sifilis == 2) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Ex. de HIV não identificado',
                    stack: 'stack',
                    type: 'bar'
                },
                ],
                tooltip: {
                trigger: 'axis'
                },
                xAxis: {
                data: [...new Set(dataQuadriAtual.map(item => item.equipe_nome))],
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
                    '#EF565D',
                    '#2EB280',
                    '#E98633',
                    '#7579EA',
                ],
                series: [
                {
                    avoidLabelOverlap: false,
                    data: [
                    {
                        name: 'Nenhum exame identificado',
                        value: ((dataQuadriAtual.reduce((acumulador,item)=>{ 
                        return (item.id_exame_hiv_sifilis == 3) ? acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriAtual.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                    },
                    {
                        name: 'Os dois exames identificados',
                        value: ((dataQuadriAtual.reduce((acumulador,item)=>{ 
                        return (item.id_exame_hiv_sifilis == 4) ?
                        acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriAtual.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                    },
                    {
                        name: 'Ex. de Sífilis não identificado',
                        value: ((dataQuadriAtual.reduce((acumulador,item)=>{ 
                        return (item.id_exame_hiv_sifilis == 1) ? acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriAtual.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                    },
                    {
                        name: 'Ex. de HIV não identificado',
                        value: ((dataQuadriAtual.reduce((acumulador,item)=>{ 
                        return (item.id_exame_hiv_sifilis == 2) ? acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriAtual.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                    },

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
    </> : <Spinner/>
}

export { GraficoIndicadorDoisQuadriAtual, CardsGraficoIndicadorDoisQuadriAtual }
