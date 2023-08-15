import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import React, {useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import styles from './Tabelas.module.css';

const TabelaIndicadores = ({ TabIndicadores }) => {

  const colunas = useMemo(() => [
    {
      field: 'indicador_score',
      headerName: 'Ordenação',
      flex: 90,
      cellClassName: 'multi-line-cell',
      description:
        'A ordenação dos indicadores é uma sugestão feita, levando em consideração o peso do indicador, duração, nota do indicador e quanto falta para alcançar a meta.',
      headerClassName: styles.cabecalho,
      
    },
    {
      field: 'indicador_nome',
      headerName: 'Indicador',
      flex: 90,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
      cellClassName: 'multi-line-cell',
      align: 'center',
      headerAlign: 'center',
      description: 
      '',
      headerClassName: styles.cabecalho,      
    },
    {
      field: 'indicador_denominador_utilizado_informado',
      headerName: 'Denominador utilizado (Denominador informado)',
      flex: 105,
      align: 'center',
      headerAlign: 'center',
      description:'O denominador utilizado pode ser o informado (identificado) ou o estimado.'+
      'O denominador informado - é o número de pessoas cadastradas informado pelo município, que impactam o indicador (ex.: o número de gestantes cadastradas é utilizado como referência para o indicador de pré-natal).' +
      'O denominador estimado -  é uma estimativa criada pelo ministério da saúde de quantas pessoas o município deveria ter cadastradas naquela categoria. O denominador utilizado será o informado caso o valor seja igual ou maior que 85% do denominador estimado. Caso ele seja menor, o denominador estimado será utilizado para cálculo da meta.'+
      'Nesse campo, é possível comparar o denominador utilizado e o informado, para saber quão próximo dos 85% está, caso o utilizado seja o estimado.',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'indicador_usuarios_100_porcento_meta',
      headerName: 'Nº total de pessoas para bater a meta',
      flex: 100,
      align: 'center',
      headerAlign: 'center',
      description: 
      'A partir de dados do SISAB, fazemos um cálculo de quantas pessoas devem ser atendidas dentro de cada indicador, para que o município atinja a meta estabelecida. Se o número indicado for igual a zero, isso significa que o município já atingiu ou ultrapassou a meta estabelecida pelo Previne Brasil.',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'indicador_usuarios_cadastrados_sem_atendimento',
      headerName: 'Quantas pessoas ainda não foram cadastradas no denominador desse indicador, precisam ser atendidas para bater a meta?',
      flex: 200,
      align: 'center',
      headerAlign: 'center',
      description: 
      'A partir dos denominadores informado e estimado, calculamos dentro do número total de pessoas para bater a meta e quantas o município ainda não cadastrou (de acordo com o denominador estimado) e ainda precisam ser cadastradas, acompanhadas e atendidas, para que a meta seja cumprida.',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'indicador_nota',
      headerName: 'Nota',
      flex: 65,
      align: 'center',
      headerAlign: 'center',
      description: 
      '',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'delta_formatado',
      headerName: 'Variação de desempenho de Q1-23/Q3-22',
      flex: 100,
      align: 'center',
      headerAlign: 'center',
      description: 
      'Calculamos a variação percentual entre o desempenho da competência atual e da competência anterior (como mostrado no gráfico de histórico de desempenho), para que o município saiba quão grande foi o crescimento ou a queda de um quadrimestre para o outro.',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'indicador_recomendacao',
      headerName: 'Recomendações',
      flex: 240,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
      align: 'center',
      headerAlign: 'center',
      description: 
      '',
      headerClassName: styles.cabecalho,
    },
  ]);

  const linhas = useMemo(() => {
    if (!TabIndicadores) {
      return []; // Retorna um array vazio se TabIndicadores for undefined
    }

    return TabIndicadores.map(({ indicador_score,
      indicador_nome,
      indicador_denominador_utilizado_informado,
      indicador_usuarios_100_porcento_meta,
      indicador_usuarios_cadastrados_sem_atendimento,
      indicador_nota,
      delta_formatado,
      indicador_recomendacao
    }) => ({
      id: uuidV4(),
      indicador_score,
      indicador_nome,
      indicador_denominador_utilizado_informado,
      indicador_usuarios_100_porcento_meta,
      indicador_usuarios_cadastrados_sem_atendimento,
      indicador_nota,
      delta_formatado,
      indicador_recomendacao
    }));
  }, [TabIndicadores]);

  const CustomHeader = () => {
    return (
      <div className={styles.customHeader}>
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </GridToolbarContainer>
      </div>
    );
  };

  return (

    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            fontSize: '12px',
            lineHeight: '1.0rem',
            whiteSpace: 'normal',
            textAlign: 'center',
          },
          '& .MuiDataGrid-toolbarContainer': {
            backgroundColor: '#1B1C1E', // cor de fundo da barra de ferramentas
          },
          '& .MuiButton-root': {
            color: '#D4DBE7', // cor do texto dos botões
          },
          '& .MuiButton-outlined': {
            borderColor: '#D4DBE7', //  cor da borda dos botões
          },
        }}
        rows={linhas}
        columns={colunas}
        density="comfortable"
        components={{
          Toolbar: CustomHeader,
        }}
        autoHeight
        hideFooter
        disableColumnMenu
        initialState={{
          sorting: {
            sortModel: [{ field: 'indicador_score', sort: 'asc' }],
          },
        }}
        rowHeight={400} // altura das linhas
      />
    </div>
  );
};

export default TabelaIndicadores;