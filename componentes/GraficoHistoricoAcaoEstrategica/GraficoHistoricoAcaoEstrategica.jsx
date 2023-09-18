import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Spinner } from '@impulsogov/design-system';
import styles from './GraficoHistoricoAcaoEstrategica.module.css';

function formatar(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + 'K';
  }
  return value;
}
const GraficoHistoricoAcaoEstrategica = ({ GrafAcaoEstrategica }) => {
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filteredData = GrafAcaoEstrategica.filter(repasses => {
      const [ano, mes] = repasses.codigo.split('.');
      const anoNumerico = parseInt(ano);
      const mesNumerico = parseInt(mes.substring(1)); // Converte o mês em número
      return (
        (anoNumerico > 2021 || (anoNumerico === 2021 && mesNumerico >= 9)) &&
        (!selectedPeriodo || repasses.acao_nome === selectedPeriodo)
      );
    });
    setFilteredData(filteredData);
  }, [GrafAcaoEstrategica, selectedPeriodo]);

  const somaPorMes = {};

  filteredData.forEach(repasses => {
    const [ano, mes] = repasses.codigo.split('.');
    const chave = `${obterMesAbreviado(mes)} ${ano}`;
    somaPorMes[chave] = (somaPorMes[chave] || 0) + repasses.pagamento_total;
  });

  const mesesFormatados = Object.keys(somaPorMes);
  const valores = Object.values(somaPorMes);

  function obterMesAbreviado(mes) {
    switch (mes) {
      case 'M1':
        return 'Jan';
      case 'M2':
        return 'Feb';
      case 'M3':
        return 'Mar';
      case 'M4':
        return 'Apr';
      case 'M5':
        return 'May';
      case 'M6':
        return 'Jun';
      case 'M7':
        return 'Jul';
      case 'M8':
        return 'Aug';
      case 'M9':
        return 'Sep';
      case 'M10':
        return 'Oct';
      case 'M11':
        return 'Nov';
      case 'M12':
        return 'Dec';
      default:
        return mes;
    }
  }

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
      left: '1%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: mesesFormatados,
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
        axisLabel: {
          formatter: formatar, 
        },
      }
    ],
    series: [
      {
        name: 'Pagamento total',
        type: 'bar',
        stack: 'Ad',
        itemStyle: {
          color: '#9DEECD'
        },
        data: valores,
        label: {
          show: false,
          position: 'insideTop',
        }
      },
    ]
  };

  return (
    <div>
      <select
        onChange={(e) => setSelectedPeriodo(e.target.value)}
        className={styles.customSelect}
      >
        <option value="">Ação Estratégica: Todos</option>
        {
          [...new Set(GrafAcaoEstrategica.map(item => item.acao_nome))].reverse().map(item => (
            <option key={item} value={item}>{`Ação Estratégica: ${item}`}</option>
          ))
        }
      </select>
      {mesesFormatados.length > 0 ? (
        <ReactEcharts option={option} style={{ width: '100%', height: '500px' }}/>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default GraficoHistoricoAcaoEstrategica;
