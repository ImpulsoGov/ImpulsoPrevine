import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import React, { useCallback, useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import styles from './Tabelas.module.css';

const TabelaIndicadores = ({ TabIndicadores }) => {

  const colunas = useMemo(() => [
    {
      field: 'ordenacao',
      headerName: 'Ordenação',
      flex: 110,
      description:
        'A ordenação dos indicadores é uma sugestão feita, levando em consideração o peso do indicador, duração, nota do indicador e quanto falta para alcançar a meta.',
      headerClassName: styles.cabecalho,
      
    },
    {
      field: 'indicador',
      headerName: 'Indicador',
      flex: 105,
      align: 'center',
      headerAlign: 'center',
      description: 
      '',
      headerClassName: styles.cabecalho,      
    },
    {
      field: 'dominadorInformado',
      headerName: 'Denominador utilizado (Denominador informado)',
      flex: 130,
      align: 'center',
      headerAlign: 'center',
      description:'O denominador utilizado pode ser o informado (identificado) ou o estimado.'+
      'O denominador informado - é o número de pessoas cadastradas informado pelo município, que impactam o indicador (ex.: o número de gestantes cadastradas é utilizado como referência para o indicador de pré-natal).' +
      'O denominador estimado -  é uma estimativa criada pelo ministério da saúde de quantas pessoas o município deveria ter cadastradas naquela categoria. O denominador utilizado será o informado caso o valor seja igual ou maior que 85% do denominador estimado. Caso ele seja menor, o denominador estimado será utilizado para cálculo da meta.'+
      'Nesse campo, é possível comparar o denominador utilizado e o informado, para saber quão próximo dos 85% está, caso o utilizado seja o estimado.',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'N_totaldePessoas_baterMeta',
      headerName: 'Nº total de pessoas para bater a meta',
      flex: 110,
      align: 'center',
      headerAlign: 'center',
      description: 
      'A partir de dados do SISAB, fazemos um cálculo de quantas pessoas devem ser atendidas dentro de cada indicador, para que o município atinja a meta estabelecida. Se o número indicado for igual a zero, isso significa que o município já atingiu ou ultrapassou a meta estabelecida pelo Previne Brasil.',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'PessoasNaoCadastradas',
      headerName: 'Quantas pessoas ainda não foram cadastradas no denominador desse indicador, precisam ser atendidas para bater a meta?',
      flex: 290,
      align: 'center',
      headerAlign: 'center',
      description: 
      'A partir dos denominadores informado e estimado, calculamos dentro do número total de pessoas para bater a meta e quantas o município ainda não cadastrou (de acordo com o denominador estimado) e ainda precisam ser cadastradas, acompanhadas e atendidas, para que a meta seja cumprida.',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'Nota',
      headerName: 'Nota',
      flex: 80,
      align: 'center',
      headerAlign: 'center',
      description: 
      '',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'VariacaoDesempenho',
      headerName: 'Variação de desempenho de Q1-23/Q3-22',
      flex: 125,
      align: 'center',
      headerAlign: 'center',
      description: 
      'Calculamos a variação percentual entre o desempenho da competência atual e da competência anterior (como mostrado no gráfico de histórico de desempenho), para que o município saiba quão grande foi o crescimento ou a queda de um quadrimestre para o outro.',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'Recomendacoes',
      headerName: 'Recomendações',
      flex: 155,
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

    return TabIndicadores.map(({ ordenacao,
      indicador,
      dominadorInformado,
      N_totaldePessoas_baterMeta,
      PessoasNaoCadastradas,
      Nota,
      VariacaoDesempenho,
      Recomendacoes
    }) => ({
      id: uuidV4(),
      ordenacao,
      indicador,
      dominadorInformado,
      N_totaldePessoas_baterMeta,
      PessoasNaoCadastradas,
      Nota,
      VariacaoDesempenho,
      Recomendacoes
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
            fontSize: '14px',
            lineHeight: '1.0rem',
            whiteSpace: 'normal',
            textAlign: 'center',
          },
          '& .MuiDataGrid-toolbarContainer': {
            backgroundColor: 'black', // cor de fundo da barra de ferramentas
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
            sortModel: [{ field: 'ordenacao', sort: 'asc' }],
          },
        }}
        rowHeight={30} // altura das linhas
      />
    </div>
  );
};

export default TabelaIndicadores;