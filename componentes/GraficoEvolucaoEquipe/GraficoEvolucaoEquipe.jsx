import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './GraficoEvolucaoEquipe.module.css';
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

const GraficoEvolucaoEquipecomSeletor = ({
  selectedIndicadores,
  setSelectedIndicadores,
  GrafEvolucao,
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
      <div className={styles.textContainer}>
        <span>Confira aqui sua evolução nos cadastros, considerando a produção de: &nbsp; </span>
        <div className={styles.selectorBox}>
          <div className={styles.selectorHeader} onClick={() => setShowCheckboxes(!showCheckboxes)}>
            <span > Equipes</span>
            <div className={styles.arrowIcon}>{showCheckboxes ? '▼' : '▼'}</div>
          </div>
          {showCheckboxes && (
            <div className={styles.checkboxes}>
              {
                [...new Set(GrafEvolucao.map(item => item.equipe_status))].map((indicador, index) => (
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
        <span >&nbsp; e sua diferença para meta</span>
      </div>
    
      <ReactEcharts key={Math.random()} option={option} style={{ height: '400px' }}/>
    </div>
  );
};

const GraficoEvolucaoEquipe = ({ GrafEvolucao }) => {
  const [selectedIndicadores, setSelectedIndicadores] = useState(
    [...new Set(GrafEvolucao.map(item => item.equipe_status))]
  );
  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [graphLoading, setGraphLoading] = useState(true);

  // Filtrar os dados a partir de setembro de 2022
  const GrafEvolucaoFiltrado = GrafEvolucao.filter(item => {
    const dataInicio = new Date(item.data_inicio);
    const setembro2022 = new Date('2022-09-01');
    return dataInicio >= setembro2022;
  });

  // Formatar e ordenar as datas apenas das entradas filtradas
  const datasFiltradas = [...new Set(GrafEvolucaoFiltrado.map(item => {
    const dataFormatada = formatarData(item.data_inicio);
    return dataFormatada;
  }))];

  const datasOrdenadas = datasFiltradas;

  useEffect(() => {

    const selectedData = GrafEvolucaoFiltrado.filter(item => selectedIndicadores.includes(item.equipe_status));

    const periodos = [...new Set(selectedData.map(item => item.data_inicio))].sort();

    const newSeries = ["cadastro_total", "cadastros_com_pontuacao"].map(indicador => {
      const dadosPorIndicador = periodos.map(periodo => {
        const dataForPeriod = selectedData.filter(item => item.data_inicio === periodo);
        const soma = dataForPeriod.reduce((acc, curr) => acc + curr[indicador], 0);
        return soma;
      });

      return {
        name: indicador,
        type: 'line',
        data: dadosPorIndicador,
        symbol: 'circle',
        symbolSize: 8,
      };
    });

    // Adicione uma série separada para "municipio_ultimo_parametro"
    newSeries.push({
      name: "Parâmetro municipal mais recente",
      type: 'line',
      data: selectedData.map(item => item.municipio_ultimo_parametro),
      symbol: 'circle',
      symbolSize: 8,
    });

    setSeries(newSeries);
    setFilteredSeries(newSeries); 
    setGraphLoading(false);
  }, [GrafEvolucao, selectedIndicadores]);
  
  useEffect(() => setSelectedIndicadores([...new Set(GrafEvolucao.map(item => item.equipe_status))]), [GrafEvolucao]);
  
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '1%',
      right: '6%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: datasOrdenadas, // Use as datas formatadas ordenadas
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
    series: filteredSeries, 
  };

  return (
    <div>
      {graphLoading ? (
        <Spinner />
      ) : (
        <div>
          <GraficoEvolucaoEquipecomSeletor
            selectedIndicadores={selectedIndicadores}
            setSelectedIndicadores={setSelectedIndicadores}
            GrafEvolucao={GrafEvolucao}
            option={option}
          />
        </div>
      )}
    </div>
  );
};

export default GraficoEvolucaoEquipe;
