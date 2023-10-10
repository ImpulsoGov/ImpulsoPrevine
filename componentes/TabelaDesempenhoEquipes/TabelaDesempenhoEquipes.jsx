import { DataGrid } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import Pagination from '@mui/material/Pagination';
import styles from './TabelaDesempenhoEquipes.module.css';


const TabelaDesempenhoEquipes = ({ TabDesempenhos }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 25;

  const mapearStatusParaEmoji = (status) => {
    console.log('Valor de equipe_status:', status);
    switch (status.toLowerCase()) {
      case 'homologadas':
        return '⚠️';
      case 'válidas':
        return '✔️';
      case 'cadastradas':
        return '❌';
      default:
        return status; 
    }
  };

  const colunas = useMemo(() => [
    {
      field: 'data_inicio',
      headerName: 'Periodo',
      flex: 2,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', padding: "15px" }}>
          {params.value}
        </div>
      ),
      cellClassName: 'multi-line-cell',
      align: 'justify',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'equipe_nome',
      headerName: 'Equipe',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'equipe_id_ine',
      headerName: 'INE',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'equipe_status',
      headerName: 'Status da Equipe',
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', padding: "15px" }}>
          {mapearStatusParaEmoji(params.value)}
        </div>
      ),
      align: 'center',
      headerAlign: 'center',
      description: (
        <div>
          <div>✔️ - Equipes Válidas</div>
          <div>⚠️ - Equipes Homologadas</div>
          <div>❌ - Equipes Cadastradas</div>
        </div>
      ),
      headerClassName: styles.cabecalho,
    },
    {
      field: 'cadastros_com_pontuacao',
      headerName: 'Cadastros com ponderação',
      flex: 1.5,
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'cadastro_total',
      headerName: 'Total de cadastros',
      flex: 1.5,
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
  ]);

  const obterNomeMes = (numeroMes) => {
    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return nomesMeses[numeroMes - 1];
  };

  const linhasPaginadas = useMemo(() => {
    if (!Array.isArray(TabDesempenhos)) {
      return [];
    }

    const dadosOrdenados = [...TabDesempenhos].sort((a, b) => {
      const dataA = new Date(a.data_inicio);
      const dataB = new Date(b.data_inicio);
      return dataB - dataA;
    });

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return dadosOrdenados.slice(startIndex, endIndex).map(({ data_inicio, equipe_nome, equipe_id_ine, equipe_status, cadastros_com_pontuacao, cadastro_total }) => {
   
      const [ano, mes, dia] = data_inicio.split('-');
      const mesNome = obterNomeMes(Number(mes));

      const dataFormatada = `${ano}-${mesNome}-${dia}`;

      return {
        id: uuidV4(),
        data_inicio: dataFormatada,
        equipe_nome,
        equipe_id_ine,
        equipe_status,
        cadastros_com_pontuacao,
        cadastro_total,
      };
    });
  }, [TabDesempenhos, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className={styles['tabelaContainer']} >
      <div >
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

          rows={linhasPaginadas}
          columns={colunas}
          pagination
          rowsPerPageOptions={[10, 25, 50]}
          onPageChange={handleChangePage}
          autoHeight
          hideFooter
          disableColumnMenu
          getRowHeight={() => 'auto'}
          headerHeight={150}

        />
      </div>

      <div className={styles['paginacao']}>
        <Pagination
          count={Math.ceil(TabDesempenhos.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default TabelaDesempenhoEquipes;