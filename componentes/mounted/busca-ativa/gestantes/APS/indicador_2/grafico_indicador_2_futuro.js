import { GraficoBuscaAtiva, ScoreCardGrid, Spinner } from "@impulsogov/design-system";
import { formatarQuadrimestres, obterDadosProximosQuadrimestres } from "../../../../../../utils/quadrimestre";
const CardsGraficoIndicadorDoisQuadriFuturo = ({tabelaDataAPS}) =>{
    const dataQuadriFuturo = tabelaDataAPS.filter(item => item.gestacao_quadrimestre == '2024.Q1' || item.gestacao_quadrimestre == '2024.Q2' || item.gestacao_quadrimestre == '2024.Q3')
    const [{dt_registro_producao_mais_recente: dataMaisRecente = ""}] = (tabelaDataAPS && tabelaDataAPS.length > 0)
        ? tabelaDataAPS.sort((a, b) => new Date(b.dt_registro_producao_mais_recente) - new Date(a.dt_registro_producao_mais_recente))
        : [{}];
    const quadrisFuturos = dataMaisRecente
        ? obterDadosProximosQuadrimestres(dataMaisRecente)
        : [];
    const quadrisFuturosFormatados = formatarQuadrimestres(quadrisFuturos, ' e ');

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
            {quadrisFuturosFormatados} - Gestantes com DUM preenchida por exames de Sífilis e HIV identificados por equipe de saúde
        </h2>
        <ScoreCardGrid
        valores={[
            {
                descricao: 'Gestantes com os dois exames realizados e identificados',
                valor: dataQuadriFuturo.reduce((acumulador,item)=>{ 
                return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) && item.id_exame_hiv_sifilis == 4)  ?
                acumulador + 1 : acumulador;
                },0)
            },
            {
                descricao: 'Gestantes com apenas um dos exames realizados e identificados',
                valor: dataQuadriFuturo.reduce((acumulador,item)=>{ 
                return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) && (item.id_exame_hiv_sifilis == 1 || item.id_exame_hiv_sifilis == 2)) ?
                acumulador + 1 : acumulador;
                },0)
            },
            {
                descricao: 'Gestantes com nenhum dos exames realizados e identificados',
                valor: dataQuadriFuturo.reduce((acumulador,item)=>{ 
                return ((item.id_status_usuario == 8 || item.id_status_usuario == 9) & item.id_exame_hiv_sifilis == 3) ?
                acumulador + 1 : acumulador;
                },0)
            },
        ]}
        /> 
    </> : <Spinner/>}

const GraficoIndicadorDoisQuadriFuturo = ({tabelaDataAPS}) => {
    const dataQuadriFuturo = tabelaDataAPS.filter(item => item.gestacao_quadrimestre == '2024.Q1' || item.gestacao_quadrimestre == '2024.Q2' || item.gestacao_quadrimestre == '2024.Q3')
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
                    data: Object.entries(dataQuadriFuturo.reduce((acumulador,item)=>{ 
                    if(item.id_exame_hiv_sifilis == 4) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Os dois exames identificados',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: Object.entries(dataQuadriFuturo.reduce((acumulador,item)=>{ 
                    if(item.id_exame_hiv_sifilis == 3) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Nenhum exame identificado',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: Object.entries(dataQuadriFuturo.reduce((acumulador,item)=>{ 
                    if(item.id_exame_hiv_sifilis == 1) acumulador[item.equipe_nome] = (acumulador[item.equipe_nome] || 0) + 1
                    return acumulador
                    },{})),
                    name: 'Ex. de Sífilis não identificado',
                    stack: 'stack',
                    type: 'bar'
                },
                {
                    data: Object.entries(dataQuadriFuturo.reduce((acumulador,item)=>{ 
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
                        value: ((dataQuadriFuturo.reduce((acumulador,item)=>{ 
                        return (item.id_exame_hiv_sifilis == 3) ? acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriFuturo.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                    },
                    {
                        name: 'Os dois exames identificados',
                        value: ((dataQuadriFuturo.reduce((acumulador,item)=>{ 
                        return (item.id_exame_hiv_sifilis == 4) ?
                        acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriFuturo.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                    },
                    {
                        name: 'Ex. de Sífilis não identificado',
                        value: ((dataQuadriFuturo.reduce((acumulador,item)=>{ 
                        return (item.id_exame_hiv_sifilis == 1) ? acumulador + 1 : acumulador;
                        },0)*100)/dataQuadriFuturo.filter(item=>item.id_status_usuario == 8 || item.id_status_usuario == 9).length).toFixed(2)
                    },
                    {
                        name: 'Ex. de HIV não identificado',
                        value: ((dataQuadriFuturo.reduce((acumulador,item)=>{ 
                        return (item.id_exame_hiv_sifilis == 2) ? acumulador + 1 : acumulador;
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
    </> : <Spinner/>
}
export { CardsGraficoIndicadorDoisQuadriFuturo, GraficoIndicadorDoisQuadriFuturo };

