import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { filtrarPorPeriodoCodigo } from '../../helpers/filtroQuadrimestreIndicadores';


const GraficoDesempenhoMunicipio = ({GrafDesempenho}) => {

  const filteredData = filtrarPorPeriodoCodigo(GrafDesempenho);

  const dadosOrdenados = filteredData.sort((a, b) => a.indicador_score - b.indicador_score);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '8%',
      right: '1%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: dadosOrdenados.map(indicador=> indicador.indicador_nome),
        axisLabel: {
          rotate: 50,
          interval: 0
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false, 
        },
      }
    ],
    series: [
      {
        name: 'Meta (%)',
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#000'
        },
        data: filteredData.map(indicador=> indicador.indicador_meta),
        label: {
          show: true,
          position: 'top',
          offset: [0, -3],
          formatter: function (params) {
            return params.value !== 0 ? params.value + '%' : '';
          },
        }
      },
      {
        name: 'Resultado (%)',
        type: 'bar',
        stack: 'Ad',
        itemStyle: {
          color: '#379CFA'
        },
        data: filteredData.map(indicador=> indicador.indicador_nota_porcentagem),
        label: {
          show: true,
          position: 'top',
          offset: [0, 15],
          formatter: function (params) {
            return params.value !== 0 ? params.value + '%' : '';
          }
        }
      },
      {
        name: 'Diferença para meta (%)',
        type: 'bar',
        stack: 'Ad',
        itemStyle: {
          color: '#D4DBE7'
        },
        data: filteredData.map(indicador=> indicador.indicador_diferenca_meta),
      }
    ]
  };

  return <ReactEcharts option={option} autoResize={true}/>;
};

export default GraficoDesempenhoMunicipio;
