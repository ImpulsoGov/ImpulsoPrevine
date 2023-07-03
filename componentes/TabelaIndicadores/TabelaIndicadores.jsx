import { DataGrid } from '@mui/x-data-grid';
import React, { useCallback, useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import styles from './Tabelas.module.css';

const TabelaIndicadores = ({ TabIndicadores }) => {

  const colunas = useMemo(() => [
    {
      field: 'ordenacao',
      headerName: 'Ordenação',
      flex: 75
    },
    {
      field: 'indicador',
      headerName: 'Indicador',
      flex: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'dominadorInformado',
      headerName: 'Denominador utilizado (Denominador informado)',
      flex: 140,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'N_totaldePessoas_baterMeta',
      headerName: 'Nº total de pessoas para bater a meta',
      flex: 85,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'PessoasNaoCadastradas',
      headerName: 'Quantas pessoas ainda não foram cadastradas no denominador desse indicador, precisam ser atendidas para bater a meta?',
      flex: 280,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'Nota',
      headerName: 'Nota',
      flex: 60,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'VariacaoDesempenho',
      headerName: 'Variação de desempenho de Q1-23/Q3-22',
      flex: 95,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'Recomendacoes',
      headerName: 'Recomendações',
      flex: 100,
      align: 'center',
      headerAlign: 'center',
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

  return (
    <div>
      <DataGrid
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            fontSize: '16px',
            lineHeight: '1.2rem',
            whiteSpace: 'normal',
            textAlign: 'center'
          },
        }}
        rows={linhas}
        columns={colunas}
        autoHeight
        hideFooter
        disableColumnMenu
        initialState={{
          sorting: {
            sortModel: [{ field: 'ordenacao', sort: 'asc' }],
          },
        }}
      />
    </div>
  );
};

export default TabelaIndicadores;