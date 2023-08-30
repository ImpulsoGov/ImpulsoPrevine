import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { filtrarPorPeriodoCodigo } from '../../helpers/filtroQuadrimestreIndicadores';
import styles from './GraficoDesempenhoMunicipio.module.css';
import { Spinner } from '@impulsogov/design-system'

const GraficoComSeletor = ({
  setSelectedPeriodo,
  GrafDesempenho,
  option
}) => <>
    <select
      onChange={(e) => setSelectedPeriodo(e.target.value)}
      className={styles.customSelect}
    >
      {
        [...new Set(GrafDesempenho.map(item => item.periodo_codigo))].reverse().map(item => (
          <option key={item} value={item}>{`Quadrimestre: ${item}`}</option>
        ))
      }
    </select>
    <ReactEcharts key={Math.random()} option={option} />
  </>

const GraficoDesempenhoMunicipio = ({ GrafDesempenho }) => {
  const [data, setData] = useState([])
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);
  useEffect(() => {
    setData(filtrarPorPeriodoCodigo(GrafDesempenho)?.sort((a, b) => a.indicador_score - b.indicador_score))
  }, [GrafDesempenho])
  useEffect(() => {
    setData(filtrarPorPeriodoCodigo(GrafDesempenho)?.sort((a, b) => a.indicador_score - b.indicador_score))
  }, [selectedPeriodo])
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '9%',
      right: '5%',
      bottom: '1%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.map(indicador => indicador.indicador_nome),
        axisLabel: {
          rotate: 40,
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
        symbolSize: 10,
        itemStyle: {
          color: '#7579EA'
        },
        data: data.map(indicador => indicador.indicador_meta),
        label: {
          show: true,
          position: 'top',

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
          color: '#2EB280'
        },
        data: data.map(indicador => indicador.indicador_nota_porcentagem),
        label: {
          show: true,
          position: 'insideTop',

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
          color: '#57C7DC'
        },
        data: data.map(indicador => indicador.indicador_diferenca_meta),
      }
    ]
  };

  return data.length > 0 ? <GraficoComSeletor
    setSelectedPeriodo={setSelectedPeriodo}
    GrafDesempenho={GrafDesempenho}
    option={option}
  /> : <Spinner />
};

export default GraficoDesempenhoMunicipio;
