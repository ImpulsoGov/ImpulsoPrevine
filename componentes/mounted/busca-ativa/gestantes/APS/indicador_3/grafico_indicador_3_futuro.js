import { GraficoBuscaAtiva, ScoreCardGrid, Spinner } from "@impulsogov/design-system";
const CardsGraficoIndicadorTresQuadriFuturo = ({tabelaDataAPS}) =>{
    const dataQuadriFuturo = tabelaDataAPS.filter(item => item.gestacao_quadrimestre == '2024.Q1' || item.gestante_quadrimestre == '2024.Q2')
    return dataQuadriFuturo ? <ScoreCardGrid
valores={[
    {
        descricao: 'Gestantes com atendimento odontológico realizado',
        valor: dataQuadriFuturo.reduce((acumulador,item)=>{ 
        return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) && item.id_atendimento_odontologico == 1)  ?
        acumulador + 1 : acumulador;
        },0)
    },
    {
        descricao: 'Gestantes sem atendimento odontológico realizado',
        valor: dataQuadriFuturo.reduce((acumulador,item)=>{ 
        return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) && item.id_atendimento_odontologico == 2) ?
        acumulador + 1 : acumulador;
        },0)
    },
]}
/> : <Spinner/>}

const GraficoIndicadorTresQuadriFuturo = ({tabelaDataAPS}) =>{ 
    const dataQuadriFuturo = tabelaDataAPS.filter(item => item.gestacao_quadrimestre == '2024.Q1' || item.gestante_quadrimestre == '2024.Q2')
    return dataQuadriFuturo ? 
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
            Gestantes com DUM preenchida por atendimento odontológico identificado por equipe de saúde
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
                    '#EF565D',
                ],
                grid: {
                containLabel: true,
                top: '20%'
                },
                legend: {
                data: [
                    'Gestantes com atendimento odontológico realizado',
                    'Gestantes sem atendimento odontológico realizado',
                ],
                top: '60',
                left: '80',
                },
                series: [
                {
                    data: Object.entries(dataQuadriFuturo.reduce((acumulador,item)=>{ 
                    if((item.id_status_usuario == 8 || item.id_status_usuario == 9) && item.id_atendimento_odontologico == 1) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Gestantes com atendimento odontológico realizado',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: Object.entries(dataQuadriFuturo.reduce((acumulador,item)=>{ 
                    if((item.id_status_usuario == 8 || item.id_status_usuario == 9) && item.id_atendimento_odontologico == 2) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Gestantes sem atendimento odontológico realizado',
                    stack: 'stack',
                    type: 'bar'
                },
                ],
                tooltip: {
                trigger: 'axis'
                },
                xAxis: {
                data: [...new Set(dataQuadriFuturo.map(item => item.equipe_nome))],
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
                    '#EF565D',
                ],
                series: [
                {
                    avoidLabelOverlap: false,
                    data: [
                    {
                        name: 'Gestantes com atendimento odontológico realizado',
                        value: ((dataQuadriFuturo.reduce((acumulador,item)=>{ 
                        return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) && item.id_atendimento_odontologico == 1) ? acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriFuturo.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                    },
                    {
                        name: 'Gestantes sem atendimento odontológico realizado',
                        value: ((dataQuadriFuturo.reduce((acumulador,item)=>{ 
                        return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) && item.id_atendimento_odontologico == 2) ?
                        acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriFuturo.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
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
    </> : <Spinner/>}

export { GraficoIndicadorTresQuadriFuturo, CardsGraficoIndicadorTresQuadriFuturo }