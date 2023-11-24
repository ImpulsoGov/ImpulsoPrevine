import { GraficoBuscaAtiva, ScoreCardGrid, Spinner } from "@impulsogov/design-system";
const CardsGraficoIndicadorUm = ({tabelaDataAPS}) =>tabelaDataAPS ? <ScoreCardGrid
valores={[
    {
        descricao: 'Gestantes com mais de 6 consultas (primeira consulta até a 12a semana)',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return ((item.id_status_usuario == 8 ||item.id_status_usuario == 9) && item.gestacao_idade_gestacional_primeiro_atendimento <= 12 && item.consultas_pre_natal_validas >= 6) ?
        acumulador + 1 : acumulador;
        },0)
    },
    {
        descricao: 'Gestantes com menos de 6 consultas (primeira consulta até a 12a semana)',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return ((item.id_status_usuario == 8 ||item.id_status_usuario == 9) && item.gestacao_idade_gestacional_primeiro_atendimento <= 12 && item.consultas_pre_natal_validas < 6) ?
        acumulador + 1 : acumulador;
        },0)
    },

    {
        descricao: 'Gestantes com primeira consulta após a 12ª semana',
        valor: tabelaDataAPS.reduce((acumulador,item)=>{ 
        return ((item.id_status_usuario == 8 ||item.id_status_usuario == 9) && item.gestacao_idade_gestacional_primeiro_atendimento > 12) ?
        acumulador + 1 : acumulador;
        },0)
    },
]}
/> : <Spinner/>

const GraficoIndicadorUm = ({tabelaDataAPS}) => tabelaDataAPS ? 
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
        Gestantes com DUM preenchida por total de consultas e captação
    </h2>
    <GraficoBuscaAtiva
        dataBarra={{
            title: {
                text: 'Distribuição por equipe',
                subtext: '',
                left: '80'
            },
            color: [
                '#E98633',
                '#EF565D',
                '#2EB280',
            ],
            grid: {
            containLabel: true,
            top: '20%'
            },
            legend: {
            data: [
                'Gestantes com mais de 6 consultas (primeira consulta até a 12a semana)',
                'Gestantes com menos de 6 consultas (primeira consulta até a 12a semana)',
                'Gestantes com primeira consulta após a 12ª semana',
            ],
            top: '60',
            left: '80',
            },
            series: [
            {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                if((item.id_status_usuario == 8 ||item.id_status_usuario == 9) && item.gestacao_idade_gestacional_primeiro_atendimento > 12) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                return acumulador
                },{})),
                name: 'Gestantes com primeira consulta após a 12ª semana',
                stack: 'stack',
                type: 'bar'
            },
            {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                if((item.id_status_usuario == 8 ||item.id_status_usuario == 9) && item.gestacao_idade_gestacional_primeiro_atendimento <= 12 && item.consultas_pre_natal_validas < 6) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                return acumulador
                },{})),
                name: 'Gestantes com menos de 6 consultas (primeira consulta até a 12a semana)',
                stack: 'stack',
                type: 'bar'
            },
            {
                data: Object.entries(tabelaDataAPS.reduce((acumulador,item)=>{ 
                if((item.id_status_usuario == 8 ||item.id_status_usuario == 9) && item.gestacao_idade_gestacional_primeiro_atendimento <= 12 && item.consultas_pre_natal_validas >= 6) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                return acumulador
                },{})),
                name: 'Gestantes com mais de 6 consultas (primeira consulta até a 12a semana)',
                stack: 'stack',
                type: 'bar'
            },
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
                '#E98633',
                '#EF565D',
                '#2EB280',
            ],
            series: [
            {
                avoidLabelOverlap: false,
                data: [
                {
                    name: 'Gestantes com primeira consulta após a 12ª semana',
                    value: ((tabelaDataAPS.reduce((acumulador,item)=>{ 
                    return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) && item.gestacao_idade_gestacional_primeiro_atendimento > 12) ? acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                },
                {
                    name: 'Gestantes com menos de 6 consultas (primeira consulta até a 12a semana)',
                    value: ((tabelaDataAPS.reduce((acumulador,item)=>{ 
                    return ((item.id_status_usuario == 8 ||item.id_status_usuario == 9) && item.gestacao_idade_gestacional_primeiro_atendimento <= 12 && item.consultas_pre_natal_validas < 6) ?
                    acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                },
                {
                    name: 'Gestantes com mais de 6 consultas (primeira consulta até a 12a semana)',
                    value: ((tabelaDataAPS.reduce((acumulador,item)=>{ 
                    return ((item.id_status_usuario == 8 ||item.id_status_usuario == 9) && item.gestacao_idade_gestacional_primeiro_atendimento <= 12 && item.consultas_pre_natal_validas >= 6) ? acumulador + 1 : acumulador;
                    },0)*100)/tabelaDataAPS.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
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

export { GraficoIndicadorUm, CardsGraficoIndicadorUm }