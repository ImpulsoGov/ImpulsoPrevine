import { DataGrid } from '@mui/x-data-grid';
import React, { useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';
import styles from './TabelaCadastroPreliminar.module.css';
import { Spinner } from '@impulsogov/design-system';

const TabelaCadastroPreliminar = ({ TabCadPreliminar }) => {
  const colunas = useMemo(() => [
    {
      field: 'validacao_nome',
      headerName: 'Validação',
      flex: 3,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', padding: "15px" }}>
          {params.value}
        </div>
      ),
      cellClassName: 'multi-line-cell',
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'recomendacao',
      headerName: 'Recomendação',
      flex: 4,
      align: 'justify',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
    {
      field: 'validacao_quantidade',
      headerName: 'Quantidade',
      flex: 2,
      align: 'center',
      headerAlign: 'center',
      headerClassName: styles.cabecalho,
    },
  ]);

  const linhas = useMemo(() => {
    if (!Array.isArray(TabCadPreliminar)) {
      return [];
    }
  
    const linhasUnicas = new Set();
  
    const linhasFiltradas = TabCadPreliminar
      .filter((item) => item.validacao_nome === "Preliminar>Reprovado(PROF)")
      .map((item) => {
        const chave = `${item.validacao_nome}-${item.recomendacao}`;
        if (!linhasUnicas.has(chave)) {
          linhasUnicas.add(chave);
          return {
            id: uuidV4(),
            validacao_nome: item.validacao_nome,
            recomendacao: item.recomendacao,
            validacao_quantidade: TabCadPreliminar
              .filter((elem) => elem.validacao_nome === item.validacao_nome && elem.recomendacao === item.recomendacao)
              .reduce((acc, elem) => acc + elem.validacao_quantidade, 0),
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  
    return linhasFiltradas;
  }, [TabCadPreliminar]);

  return (
    <div >
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

          rows={linhas}
          columns={colunas}
          autoHeight
          hideFooter
          disableColumnMenu
          getRowHeight={() => 'auto'} 
          headerHeight={150}

        />
      </div>
    </div>
  );
};

export default TabelaCadastroPreliminar;