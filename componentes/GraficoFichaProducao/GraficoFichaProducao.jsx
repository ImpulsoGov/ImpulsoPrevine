import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './GraficoFichaProducao.module.css';
import { Spinner } from '@impulsogov/design-system';

function formatar(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + 'K';
  }
  return value;
}

const formatarData = (data) => {
  const meses = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez'
  ];

  const [ano, mes, _] = data.split('-');
  return `${meses[parseInt(mes) - 1]} ${ano}`;
};

const GraficoFichaProducaocomSeletor = ({
  selectedIndicadores,
  setSelectedIndicadores,
  GrafFicha,
  option,
}) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const handleCheckboxChange = (value) => {
    let updatedSelectedIndicadores;
    if (selectedIndicadores.includes(value)) {
      
      updatedSelectedIndicadores = selectedIndicadores.filter(indicador => indicador !== value);
    } else {
      
      updatedSelectedIndicadores = [...selectedIndicadores, value];
    }

    if (updatedSelectedIndicadores.length === 0) {
      updatedSelectedIndicadores = [...new Set(GrafFicha.map(item => item.equipe_nome))];
    }

    setSelectedIndicadores(updatedSelectedIndicadores);
  };
  const handleExclusiveCheckboxChange = (value) => {
    setSelectedIndicadores([value]);
  };

  return (
    <div>
      <div className={styles.textContainer}>
        <div className={styles.selectorBox}>
          <div className={styles.selectorHeader} onClick={() => setShowCheckboxes(!showCheckboxes)}>
            <span >Equipe</span>
            <div className={styles.arrowIcon}>{showCheckboxes ? '▼' : '▼'}</div>
          </div>
          {showCheckboxes && (
            <div className={styles.checkboxes}>
              {
                [...new Set(GrafFicha.map(item => item.equipe_nome))].map((indicador, index) => (
                  <div key={index} className={styles.checkboxItem}>
                    <label>
                      <button className={styles.button} onClick={() => handleExclusiveCheckboxChange(indicador)}>Apenas</button>
                      <input
                        type="checkbox"
                        value={indicador}
                        checked={selectedIndicadores.includes(indicador)}
                        onChange={(e) => handleCheckboxChange(e.target.value)}
                      />
                      {indicador}
                    </label>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>      
      <ReactEcharts key={Math.random()} option={option} style={{ height: '450px' }} />
    </div>
  );
};

const GraficoFichaProducao = ({ GrafFicha }) => {
  const [selectedIndicadores, setSelectedIndicadores] = useState(
    [...new Set(GrafFicha.map(item => item.equipe_nome))]
  );
  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [graphLoading, setGraphLoading] = useState(true);

  const GrafFichaFiltrado = GrafFicha.filter(item => {
    const dataInicio = new Date(item.periodo_data_inicio);
    return dataInicio;
  });

  const datasFiltradas = [...new Set(GrafFichaFiltrado.map(item => {
    const dataFormatada = formatarData(item.periodo_data_inicio);
    return dataFormatada;
  }))];

  const datasOrdenadas = datasFiltradas;

  useEffect(() => {
    const selectedData = GrafFichaFiltrado.filter(item =>
      selectedIndicadores.includes(item.equipe_nome)
    );

    const periodos = [...new Set(selectedData.map(item => item.periodo_data_inicio))].sort();

    const uniqueValidationNames = [...new Set(selectedData.map(item => item.validacao_nome))];

    const newSeries = uniqueValidationNames.map(validacaoNome => {
      const dadosPorIndicador = periodos.map(periodo => {
        const dataForPeriodAndValidation = selectedData.filter(item =>
          item.periodo_data_inicio === periodo && item.validacao_nome === validacaoNome
        );
        const soma = dataForPeriodAndValidation.reduce((acc, curr) => acc + curr.validacao_quantidade, 0);
        return soma;
      });

      return {
        name: validacaoNome,
        type: 'bar',
        stack: 'stack',
        data: dadosPorIndicador,
      };
    });

    setSeries(newSeries);
    setFilteredSeries(newSeries);
    setGraphLoading(false);
  }, [GrafFicha, selectedIndicadores]);

  useEffect(() => setSelectedIndicadores([...new Set(GrafFicha.map(item => item.equipe_nome))]), [GrafFicha]);

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    grid: {
      left: '4%',
      right: '6%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: datasOrdenadas,
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: formatar,
      },
    },
    series: filteredSeries.map((serie, index) => {
      return {
        ...serie,
        type: 'bar',
      };
    }),
  };

  return (
    <div>
      {graphLoading || (selectedIndicadores.length === 0) ? (
        <Spinner />
      ) : (
        <div>
          <GraficoFichaProducaocomSeletor
            selectedIndicadores={selectedIndicadores}
            setSelectedIndicadores={setSelectedIndicadores}
            GrafFicha={GrafFicha}
            option={option}
          />
        </div>
      )}
    </div>
  );
};

export default GraficoFichaProducao;
