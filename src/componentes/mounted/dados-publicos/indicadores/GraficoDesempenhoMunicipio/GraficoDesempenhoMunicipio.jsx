import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { filtrarPorPeriodoCodigo } from '@helpers/filtroQuadrimestreIndicadores';
import styles from './GraficoDesempenhoMunicipio.module.css';
import { Spinner } from '@impulsogov/design-system';

const GraficoComSeletor = ({
  setSelectedPeriodo,
  GrafDesempenho,
  option
}) => (
  <>
    <select
      onChange={(e) => setSelectedPeriodo(e.target.value)}
      className={styles.customSelect}
    >
      {
        [...new Set(GrafDesempenho.map(item => item.periodo_codigo))]
          .sort((a, b) => b.localeCompare(a))
          .map(item => (
            <option key={item} value={item}>{`Quadrimestre: ${item}`}</option>
          ))
      }
    </select>
    <ReactEcharts key={Math.random()} option={option} style={{ height: '400px' }} />
  </>
);

const GraficoDesempenhoMunicipio = ({ GrafDesempenho }) => {
  const [data, setData] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);

  useEffect(() => {
    const filteredData = filtrarPorPeriodoCodigo(GrafDesempenho, selectedPeriodo)?.sort((a, b) => a.indicador_score - b.indicador_score);
    setData(filteredData);
  }, [GrafDesempenho, selectedPeriodo]);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      y: '-5',
    },
    grid: {
      left: '9%',
      right: '5%',
      bottom: '0%',
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
          color: '#000'
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
          color: '#D4DBE7'
        },
        data: data.map(indicador => indicador.indicador_diferenca_meta),
      }
    ]
  };

  if (data.length > 0) {
    return (
      <GraficoComSeletor
        setSelectedPeriodo={setSelectedPeriodo}
        GrafDesempenho={GrafDesempenho}
        option={option}
      />
    );
  } else {
    return <Spinner />;
  }
};

export default GraficoDesempenhoMunicipio;
