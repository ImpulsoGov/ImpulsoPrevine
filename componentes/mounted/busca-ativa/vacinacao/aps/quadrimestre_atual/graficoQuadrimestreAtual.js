import { GraficoBuscaAtiva, ScoreCardGrid, Spinner } from "@impulsogov/design-system";
const CardsGraficoAPSQuadrimestreAtual = ({tabelaDataAPS}) =>{
    const dataQuadriAtual = tabelaDataAPS?.filter(item => item.id_status_quadrimestre== 1)
    return dataQuadriAtual && tabelaDataAPS ? 
    <>
        <h2 style={{
            marginTop : '45px',
            marginLeft : '120px',
            color: "#1F1F1F",
            fontSize: "22px",
            fontFamily: "Inter",
            fontWeight: 500,
            lineHeight: "130%",
        }}>
            Q1/24 - Crianças no período de vacinação
        </h2>
        <ScoreCardGrid
            key="vacinacaoCardsQuadriAtualGrafico"
            valores={[
                {
                    descricao: 'Total de crianças',
                    valor: dataQuadriAtual.length
                },
                {
                    descricao: 'Crianças com os dois esquemas vacinais completos',
                    valor: dataQuadriAtual.reduce((acumulador,item)=>{ 
                    return ((item.id_status_polio == 1 || item.id_status_polio == 10 ) && item.id_status_penta == 1) ?
                    acumulador + 1 : acumulador;
                    },0)
                },
                {
                    descricao: 'Crianças com um ou os dois esquemas vacinais em andamento',
                    valor: dataQuadriAtual.length - dataQuadriAtual.reduce((acumulador,item)=>{ 
                    return (
                        ((item.id_status_polio == 1 || item.id_status_polio == 10) && item.id_status_penta == 1) || 
                        ((item.id_status_polio == 3 || item.id_status_polio == 30) || item.id_status_penta == 3)) || 
                        ((item.id_status_polio == 4 || item.id_status_polio == 40) && item.id_status_penta == 4) ?
                    acumulador + 1 : acumulador;
                    },0)
                },
                {
                    descricao: 'Crianças com pelo menos uma dose em atraso',
                    valor: dataQuadriAtual.reduce((acumulador,item)=>{ 
                    return ((item.id_status_polio == 3 || item.id_status_polio == 30) || item.id_status_penta == 3) ?
                    acumulador + 1 : acumulador;
                    },0)
                },
                {
                    descricao: 'Crianças com os dois esquemas vacinais não iniciados',
                    valor: dataQuadriAtual.reduce((acumulador,item)=>{ 
                    return ((item.id_status_polio == 4 || item.id_status_polio == 40) && item.id_status_penta == 4) ?
                    acumulador + 1 : acumulador;
                    },0)
                },
            ]}
        />
    </>  : <Spinner/>
}

const GraficoAPSQuadrimestreAtual = ({tabelaDataAPS}) =>{ 
    const dataQuadriAtual = tabelaDataAPS?.filter(item => item.id_status_quadrimestre== 1)
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
                    '#55D499',
                    '#FFA75E',
                    '#FF7C81',
                    '#A6B5BE'
                ],
                grid: {
                containLabel: true,
                top: '20%'
                },
                legend: {
                data: [
                    'Crianças com os dois esquemas vacinais completos',
                    'Crianças com um ou os dois esquemas vacinais em andamento',
                    'Crianças com pelo menos uma dose em atraso',
                    'Crianças com os dois esquemas vacinais não iniciados'
                ],
                top: '60',
                left: '80',
                },
                series: [
                {
                    data: Object.entries(dataQuadriAtual.reduce((acumulador,item)=>{ 
                    if((item.id_status_polio == 1 || item.id_status_polio == 10) && item.id_status_penta == 1) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Crianças com os dois esquemas vacinais completos',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: (Object.entries(dataQuadriAtual.reduce((acumulador,item)=>{ 
                    if(!(((item.id_status_polio == 1 || item.id_status_polio == 10) && item.id_status_penta == 1) || 
                    ((item.id_status_polio == 3 || item.id_status_polio == 30) || item.id_status_penta == 3)) || 
                    ((item.id_status_polio == 4 || item.id_status_polio == 40) && item.id_status_penta == 4)) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{}))),
                    name: 'Crianças com um ou os dois esquemas vacinais em andamento',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: Object.entries(dataQuadriAtual.reduce((acumulador,item)=>{ 
                    if((item.id_status_polio == 3 || item.id_status_polio == 30) || item.id_status_penta == 3) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Crianças com pelo menos uma dose em atraso',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: Object.entries(dataQuadriAtual.reduce((acumulador,item)=>{ 
                    if((item.id_status_polio == 4 || item.id_status_polio == 4) && item.id_status_penta == 4) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name:'Crianças com os dois esquemas vacinais não iniciados',
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
                series: [
                {
                    avoidLabelOverlap: false,
                    data: [
                    {
                        name: 'Crianças com os dois esquemas vacinais completos',
                        value: ((dataQuadriAtual.reduce((acumulador,item)=>{ 
                        return ((item.id_status_polio == 1 ||item.id_status_polio == 10) && item.id_status_penta == 1) ? acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriAtual.length).toFixed(2),
                        itemStyle: {
                            color: '#55D499' 
                        }
                    },
                    {
                        name: 'Crianças com um ou os dois esquemas vacinais em andamento',
                        value: (((dataQuadriAtual.reduce((acumulador,item)=>{ 
                        return ((((item.id_status_polio == 1 || item.id_status_polio == 10)&& item.id_status_penta == 1) || 
                        ((item.id_status_polio == 3 || item.id_status_polio == 30) || item.id_status_penta == 3)) || 
                        ((item.id_status_polio == 4 || item.id_status_polio == 40) && item.id_status_penta == 4)) ?
                        acumulador + 1 : acumulador;
                        },0)*-100)/dataQuadriAtual.length)+100).toFixed(2),
                        itemStyle: {
                            color: '#FFA75E' 
                        }
                    },
                    {
                        name: 'Crianças com pelo menos uma dose em atraso',
                        value: ((dataQuadriAtual.reduce((acumulador,item)=>{ 
                        return ((item.id_status_polio == 3 || item.id_status_polio == 30) || item.id_status_penta == 3) ? acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriAtual.length).toFixed(2),
                        itemStyle: {
                            color: '#FF7C81' 
                        }
                    },
                    {
                        name: 'Crianças com os dois esquemas vacinais não iniciados',
                        value: ((dataQuadriAtual.reduce((acumulador,item)=>{ 
                        return ((item.id_status_polio == 4 || item.id_status_polio == 40) && item.id_status_penta == 4) ? acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriAtual.length).toFixed(2),
                        itemStyle: {
                            color: '#EFF5F9' 
                        }
                    },
                    ].filter(item=>item.value != 0),
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

export { GraficoAPSQuadrimestreAtual, CardsGraficoAPSQuadrimestreAtual }