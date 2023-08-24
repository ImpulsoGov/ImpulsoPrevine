import React from 'react';
import ReactEcharts from 'echarts-for-react';

const GraficoHistoricoDesempenho = ({GrafHistorico}) => {
  
  const indicadores = [...new Set(GrafHistorico.map(item => item.indicador_nome))];
  const periodos = GrafHistorico.map(item => item.periodo_codigo);

  const series = indicadores.map(indicador => {
    const dadosPorIndicador = periodos.map(periodo => {
      const dadoIndicadorPeriodo = GrafHistorico.find(item => item.indicador_nome === indicador && item.periodo_codigo === periodo);
      return dadoIndicadorPeriodo ? dadoIndicadorPeriodo.indicador_nota_porcentagem : 0;
    });

    return {
      name: indicador,
      type: 'line',
      data: dadosPorIndicador,
      symbol: 'circle',
      symbolSize: 8,
    };
  });

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: periodos
    },
    yAxis:{
        type: 'value',
      },
    series: series
  };
  return <ReactEcharts option={option} />;
}
export default GraficoHistoricoDesempenho;