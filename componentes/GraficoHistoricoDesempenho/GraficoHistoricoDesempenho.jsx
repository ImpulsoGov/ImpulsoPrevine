import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './GraficoHistoricoDesempenho.module.css';
import { Spinner } from '@impulsogov/design-system';

const GraficoHistoricoComSeletor = ({
  selectedIndicadores,
  setSelectedIndicadores,
  GrafHistorico,
  option,
}) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const handleCheckboxChange = (value) => {
    if (selectedIndicadores.includes(value)) {
      setSelectedIndicadores(prevSelected => prevSelected.filter(indicador => indicador !== value));
    } else {
      setSelectedIndicadores(prevSelected => [...prevSelected, value]);
    }
  };

  return (
    <div>
      <div className={styles.selectorBox}>
        <div className={styles.selectorHeader} onClick={() => setShowCheckboxes(!showCheckboxes)}>
          <span>Indicador de Desempenho</span>
          <div className={styles.arrowIcon}>{showCheckboxes ? 'v' : 'v'}</div>
        </div>
        {showCheckboxes && (
          <div className={styles.checkboxes}>
            {
              [...new Set(GrafHistorico.map(item => item.indicador_nome))].map((indicador, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={indicador}
                    checked={selectedIndicadores.includes(indicador)}
                    onChange={(e) => handleCheckboxChange(e.target.value)}
                  />
                  {indicador}
                </label>
              ))
            }
          </div>
        )}
      </div>
      <ReactEcharts option={option} />
    </div>
  );
};

const GraficoHistoricoDesempenho = ({ GrafHistorico }) => {
  const [selectedIndicadores, setSelectedIndicadores] = useState([]);
  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [graphLoading, setGraphLoading] = useState(true);

  useEffect(() => {
    const selectedData = GrafHistorico.filter(item => selectedIndicadores.includes(item.indicador_nome));

    const periodos = [...new Set(selectedData.map(item => item.periodo_codigo))];

    const newSeries = selectedIndicadores.map(indicador => {
      const dadosPorIndicador = periodos.map(periodo => {
        const dataForPeriod = selectedData.find(item => item.periodo_codigo === periodo && item.indicador_nome === indicador);
        return dataForPeriod ? dataForPeriod.indicador_nota_porcentagem : 0;
      });

      return {
        name: indicador,
        type: 'line',
        data: dadosPorIndicador,
        symbol: 'circle',
        symbolSize: 8,
      };
    });

    setSeries(newSeries);
    setGraphLoading(false);
  }, [GrafHistorico, selectedIndicadores]);

  useEffect(() => {
    const filteredSeries = series.filter(item => selectedIndicadores.includes(item.name));
    setFilteredSeries(filteredSeries);
  }, [series, selectedIndicadores]);

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '8%',
      right: '6%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [...new Set(GrafHistorico.map(item => item.periodo_codigo))],
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
    },
    series: filteredSeries,
  };

  return (
    <div>
      {graphLoading ? (
        <Spinner />
      ) : (
        <GraficoHistoricoComSeletor
          selectedIndicadores={selectedIndicadores}
          setSelectedIndicadores={setSelectedIndicadores}
          GrafHistorico={GrafHistorico}
          option={option}
        />
      )}
    </div>
  );
};

export default GraficoHistoricoDesempenho;
