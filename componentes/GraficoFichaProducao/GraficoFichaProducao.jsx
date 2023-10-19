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
  selectedNovoIndicador,
  setSelectedNovoIndicador,
  GrafFicha,
  option,
}) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showNovoCheckboxes, setShowNovoCheckboxes] = useState(false);

  const handleCheckboxChange = (value) => {
    let updatedSelectedIndicadores;
    if (selectedIndicadores.includes(value)) {

      updatedSelectedIndicadores = selectedIndicadores.filter(indicador => indicador !== value);
    } else {

      updatedSelectedIndicadores = [...selectedIndicadores, value];
    }

    const filteredCnes = GrafFicha
      .filter(item => updatedSelectedIndicadores.includes(item.equipe_nome))
      .map(item => item.cnes_nome);

    setSelectedIndicadores(updatedSelectedIndicadores);
    setSelectedNovoIndicador(filteredCnes);

  };
  const handleExclusiveCheckboxChange = (value) => {
   
    const updatedSelectedIndicadores = [value];
    
    const filteredCnes = GrafFicha
      .filter(item => updatedSelectedIndicadores.includes(item.equipe_nome))
      .map(item => item.cnes_nome);

    setSelectedIndicadores(updatedSelectedIndicadores);
    setSelectedNovoIndicador(filteredCnes);
  };

  const handleNovoCheckboxChange = (value) => {
  let updatedSelectedNovoIndicador;
  if (selectedNovoIndicador.includes(value)) {
    updatedSelectedNovoIndicador = selectedNovoIndicador.filter(indicador => indicador !== value);
  } else {
    updatedSelectedNovoIndicador = [...selectedNovoIndicador, value];
  }

  const teamsForSelectedCnes = GrafFicha
    .filter(item => updatedSelectedNovoIndicador.includes(item.cnes_nome))
    .map(item => item.equipe_nome);

  setSelectedNovoIndicador(updatedSelectedNovoIndicador);
  setSelectedIndicadores(teamsForSelectedCnes);
};

const handleExclusiveNovoCheckboxChange = (value) => {
  
  const updatedSelectedNovoIndicador = [value];
 
  const teamsForSelectedCnes = GrafFicha
    .filter(item => updatedSelectedNovoIndicador.includes(item.cnes_nome))
    .map(item => item.equipe_nome);

  setSelectedNovoIndicador(updatedSelectedNovoIndicador);
  setSelectedIndicadores(teamsForSelectedCnes);
};

  return (
    <div>
      <div className={styles.textContainer}>
        <div className={`${styles.selectorBox} ${styles.equipeSelector}`}>
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

        <div className={`${styles.selectorBox} ${styles.estabelecimentoSelector}`}>
          <div className={styles.selectorHeader} onClick={() => setShowNovoCheckboxes(!showNovoCheckboxes)}>
            <span>Esabelecimento </span>
            <div className={styles.arrowIcon}>{showNovoCheckboxes ? '▼' : '▼'}</div>
          </div>
          {showNovoCheckboxes && (
            <div className={styles.checkboxes}>
              {
                [...new Set(GrafFicha.map(item => item.cnes_nome))].map((indicador, index) => (
                  <div key={index} className={styles.checkboxItem}>
                    <label>
                      <button className={styles.button} onClick={() => handleExclusiveNovoCheckboxChange(indicador)}>Apenas</button>
                      <input
                        type="checkbox"
                        value={indicador}
                        checked={selectedNovoIndicador.includes(indicador)}
                        onChange={(e) => handleNovoCheckboxChange(e.target.value)}
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

  const [selectedNovoIndicador, setSelectedNovoIndicador] = useState(
    [...new Set(GrafFicha.map(item => item.cnes_nome))]
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
      selectedIndicadores.includes(item.equipe_nome) &&
      selectedNovoIndicador.includes(item.cnes_nome)
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
  }, [GrafFicha, selectedIndicadores, selectedNovoIndicador]);

  useEffect(() => setSelectedIndicadores([...new Set(GrafFicha.map(item => item.equipe_nome))]), [GrafFicha]);
  useEffect(() => setSelectedNovoIndicador([...new Set(GrafFicha.map(item => item.cnes_nome))]), [GrafFicha]);

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
            selectedNovoIndicador={selectedNovoIndicador}
            setSelectedNovoIndicador={setSelectedNovoIndicador}
          />
        </div>
      )}
    </div>
  );
};

export default GraficoFichaProducao;
