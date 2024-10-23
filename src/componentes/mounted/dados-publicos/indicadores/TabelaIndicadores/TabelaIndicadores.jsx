import { DataGrid } from '@mui/x-data-grid';
import React, { useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import styles from './Tabelas.module.css';
import { filtrarPorPeriodoCodigo } from '../../../../../helpers/filtroQuadrimestreIndicadores';

const TabelaIndicadores = ({ TabIndicadores }) => {
  const getCellClassName = (params) => {
    const value = parseFloat(params.value);

    if (value > 0) {
      return styles.TextoVerde;
    } else if (value < 0) {
      return styles.TextoVermelho;
    }

    return '';
  };

  const getNotaCellClassName = (params) => {
    const nota = parseFloat(params.value);

    if (nota > 0 && nota <= 5) {
      return styles.NotaRosa;
    } else if (nota > 5 && nota <= 8) {
      return styles.NotaLaranja;
    } else if (nota > 8 && nota <= 9.9) {
      return styles.NotaAmarela;
    } else if (nota === 10) {
      return styles.NotaVerde;
    }

    return '';
  };

  const NotaTooltip = () => (
    <div>
      <div className={`${styles.quadradoTooltip} ${styles.NotaRosa}`}></div>
      &gt; 0 e &lt;= 5<br />
      <div className={`${styles.quadradoTooltip} ${styles.NotaLaranja}`}></div>
      &gt; 5 e &lt;= 8<br />
      <div className={`${styles.quadradoTooltip} ${styles.NotaAmarela}`}></div>
      &gt; 8 e &lt;= 9.9<br />
      <div className={`${styles.quadradoTooltip} ${styles.NotaVerde}`}></div>
      = 10
    </div>
  );

  const colunas = useMemo(() => [
    {
      field: 'indicador_score',
      headerName: '',
      flex: 0,
      width: 0,
      cellClassName: styles.colunaBranca,
      headerClassName: styles.cabecalho,
    },
    {
      field: 'indicador_nome',
      headerName: 'Indicador',
      flex: 1.6,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', padding: '15px' }}>
          {params.value}
        </div>
      ),
      cellClassName: 'multi-line-cell',
      align: 'center',
      headerAlign: 'center',
      description: '',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'indicador_numerador',
      headerName: 'Numerador',
      flex: 2.5,
      align: 'center',
      headerAlign: 'center',
      description: 'Refere-se ao número de pessoas em dia com os critérios de consultas, procedimentos e exames e que contabilizaram neste quadrimestre.',
      headerClassName: styles.cabecalho,

    },
    {
      field: 'indicador_denominador_utilizado_informado',
      headerName: 'Denominador utilizado (Denominador informado)',
      flex: 1.7,
      align: 'center',
      headerAlign: 'center',
      description: 'O denominador utilizado pode ser o informado (identificado) ou o estimado.' +
        'O denominador informado - é o número de pessoas cadastradas informado pelo município, que impactam o indicador (ex.: o número de gestantes cadastradas é utilizado como referência para o indicador de pré-natal).' +
        'O denominador estimado -  é uma estimativa criada pelo ministério da saúde de quantas pessoas o município deveria ter cadastradas naquela categoria. O denominador utilizado será o informado caso o valor seja igual ou maior que 85% do denominador estimado. Caso ele seja menor, o denominador estimado será utilizado para cálculo da meta.' +
        'Nesse campo, é possível comparar o denominador utilizado e o informado, para saber quão próximo dos 85% está, caso o utilizado seja o estimado.',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'indicador_usuarios_100_porcento_meta',
      headerName: 'Nº total de pessoas para bater a meta',
      flex: 1.7,
      align: 'center',
      headerAlign: 'center',
      description: 'A partir de dados do SISAB, fazemos um cálculo de quantas pessoas devem ser atendidas dentro de cada indicador, para que o município atinja a meta estabelecida. Se o número indicado for igual a zero, isso significa que o município já atingiu ou ultrapassou a meta estabelecida pelo Previne Brasil.',
      headerClassName: styles.cabecalho,
    },

    {
      field: 'indicador_nota',
      headerName: 'Nota',
      flex: 1.1,
      align: 'center',
      headerAlign: 'center',
      description: <NotaTooltip />,
      headerClassName: styles.cabecalho,
      cellClassName: getNotaCellClassName,
    },
    {
      field: 'delta_formatado',
      headerName: 'Variação de desempenho de Q1-24/Q2-24',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      description: 'Calculamos a variação percentual entre o desempenho da competência atual e da competência anterior (como mostrado no gráfico de histórico de desempenho), para que o município saiba quão grande foi o crescimento ou a queda de um quadrimestre para o outro.',
      headerClassName: styles.cabecalho,
      cellClassName: getCellClassName,
    },
    {
      field: 'indicador_recomendacao',
      headerName: 'Recomendações',
      flex: 3.4,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', padding: '15px' }}>
          {params.value}
        </div>
      ),
      align: 'center',
      headerAlign: 'center',
      description: '',
      headerClassName: styles.cabecalho,
    },
  ]);

  const sortModel = [
    {
      field: 'indicador_score',
      sort: 'asc',
    },
  ];

  const ultimoPeriodo = TabIndicadores.length > 0 ? TabIndicadores[TabIndicadores.length - 1].periodo_codigo : undefined;

  const linhas = useMemo(() => {
    const dadosFiltrados = filtrarPorPeriodoCodigo(TabIndicadores, ultimoPeriodo);
    if (!TabIndicadores) {
      return [];
    }

    return dadosFiltrados.map(({
      indicador_score,
      indicador_nome,
      indicador_numerador,
      indicador_denominador_utilizado_informado,
      indicador_usuarios_100_porcento_meta,
      indicador_nota,
      delta_formatado,
      indicador_recomendacao
    }) => ({
      id: uuidV4(),
      indicador_score,
      indicador_nome,
      indicador_numerador,
      indicador_denominador_utilizado_informado,
      indicador_usuarios_100_porcento_meta,
      indicador_nota,
      delta_formatado,
      indicador_recomendacao
    }));
  }, [TabIndicadores, ultimoPeriodo]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '1rem',
            whiteSpace: 'normal',
            textAlign: 'center',
          },
          '& .MuiDataGrid-toolbarContainer': {
            backgroundColor: '#1B1C1E',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '14px',
            lineHeight: '1rem',
            whiteSpace: 'normal',
          },
          '& .MuiButton-root': {
            color: '#D4DBE7',
          },
          '& .MuiButton-outlined': {
            borderColor: '#D4DBE7',
          },
        }}
        rows={linhas}
        columns={colunas}
        sortModel={sortModel}
        density="comfortable"
        autoHeight
        hideFooter
        disableColumnMenu
        getRowHeight={() => 'auto'} // altura das linhas
        headerHeight={150}
      />
    </div>
  );
};

export default TabelaIndicadores;
