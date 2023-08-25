import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { filtrarPorPeriodoCodigo } from '../../helpers/filtroQuadrimestreIndicadores';
import { Spinner } from '@impulsogov/design-system'
const GraficoComSeletor = ({
  setSelectedPeriodo,
  GrafDesempenho,
  option
  })=><>
    <select onChange={(e) => setSelectedPeriodo(e.target.value)}>
      {
        [...new Set(GrafDesempenho.map(item=> item.periodo_codigo))].reverse().map(item=><option key={item} value={item}>{item}</option>)
      }
    </select>
    <ReactEcharts key={Math.random()} option={option} />
  </>

const GraficoDesempenhoMunicipio = ({GrafDesempenho}) => {
  const [data,setData] = useState([])
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);
  useEffect(()=>{
    setData(filtrarPorPeriodoCodigo(GrafDesempenho)?.sort((a, b) => a.indicador_score - b.indicador_score))
  },[GrafDesempenho])
  useEffect(()=>{
    setData(filtrarPorPeriodoCodigo(GrafDesempenho)?.sort((a, b) => a.indicador_score - b.indicador_score))
  },[selectedPeriodo])
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
      width: '95%', 
      height: '90%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.map(indicador=> indicador.indicador_nome),
        axisLabel: {
          rotate: 50,
          interval: 0
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Meta (%)',
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#000'
        },
        data: data.map(indicador=> indicador.indicador_meta),
        label: {
          show: true,
          position: 'insideTop',
          offset: [0, 5],
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
        data: data.map(indicador=> indicador.indicador_nota_porcentagem),
        label: {
          show: true,
          position: 'top',
          offset: [0, 5],
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
        data: data.map(indicador=> indicador.indicador_diferenca_meta),
      }
    ]
  };

  return data.length>0 ? <GraficoComSeletor
  setSelectedPeriodo={setSelectedPeriodo}
  GrafDesempenho={GrafDesempenho}
  option={option}
  /> : <Spinner />
};

export default GraficoDesempenhoMunicipio;
