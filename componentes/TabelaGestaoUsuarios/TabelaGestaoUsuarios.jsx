import { Badge, Button } from '@mui/material';
import { DataGrid, GridRowModes } from '@mui/x-data-grid';
import React, { useCallback, useMemo, useState } from 'react';
import { Toolbar } from '../Toolbar';
import styles from './TabelaGestaoUsuarios.module.css';

function TabelaGestaoUsuarios({
  rows,
  selectedRowId,
  processRowUpdate,
  handleProcessRowUpdateError,
  handleRowFocus
}) {
  const [rowModesModel, setRowModesModel] = useState({});

  const columns = useMemo(() => [
    {
      field: 'nome',
      headerName: 'Nome',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'municipio',
      headerName: 'Município',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'mail',
      headerName: 'E-mail',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'cargo',
      headerName: 'Cargo',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'telefone',
      headerName: 'Telefone',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'equipe',
      headerName: 'Equipe (INE)',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      editable: true
    },
    {
      field: 'autorizacoes',
      headerName: 'Autorizações',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div>
            {
              params.value.map((autorizacao) => (
                <div key={ autorizacao }>
                  <Badge
                    key={ autorizacao }
                    badgeContent={ autorizacao }
                    color='primary'
                    sx={ {
                      '& .MuiBadge-colorPrimary': {
                        backgroundColor: '#2EB280'
                      },
                    } }
                  />
                </div>
              ))
            }
          </div>
        );
      }
    },
    {
      field: 'editarAutorizacoes',
      headerName: 'Editar autorizações',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Button
            onClick={ params.value }
            variant='text'
            sx={ {
              ml: 1,
              fontSize: '20px',
              color: '#606E78'
            } }
          >
            ✎
          </Button>
        );
      }
    }
  ], []);

  const rowMode = useMemo(() => {
    if (!selectedRowId) {
      return 'view';
    }

    return rowModesModel[selectedRowId]?.mode || 'view';
  }, [rowModesModel, selectedRowId]);

  const handleRowKeyDown = useCallback(
    (_params, event) => {
      if (rowMode === 'edit') {
        // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
        event.defaultMuiPrevented = true;
      }
    },
    [rowMode],
  );

  const handleRowEditStop = useCallback((_params, event) => {
    event.defaultMuiPrevented = true;
  }, []);

  const handleSaveClick = useCallback(() => {
    if (!selectedRowId) {
      return;
    }

    setRowModesModel({
      ...rowModesModel,
      [selectedRowId]: { mode: GridRowModes.View },
    });
  }, [rowModesModel, selectedRowId]);

  const handleEditClick = useCallback(() => {
    if (!selectedRowId) {
      return;
    }

    setRowModesModel({
      ...rowModesModel,
      [selectedRowId]: { mode: GridRowModes.Edit },
    });
  }, [rowModesModel, selectedRowId]);

  const handleCancelClick = useCallback(() => {
    if (!selectedRowId) {
      return;
    }

    setRowModesModel({
      ...rowModesModel,
      [selectedRowId]: {
        mode: GridRowModes.View, ignoreModifications: true
      },
    });

    // const selectedRow = rows.find((row) => row.id === selectedRowId);

    // if (selectedRow.isNew) {
    //   setRows(rows.filter((row) => row.id !== selectedRowId));
    // }
  }, [rowModesModel, selectedRowId]);

  // const handleAddClick = useCallback(() => {
  //   const id = 'randomId()';
  //   setRows((oldRows) => [...oldRows, {
  //     id,
  //     mail: '',
  //     cpf: '',
  //     nome: '',
  //     municipio: '',
  //     cargo: '',
  //     telefone: '',
  //     equipe: '',
  //     autorizacoes: [],
  //     editarAutorizacoes: showModal,
  //     isNew: true
  //   }]);
  //   setRowModesModel((oldModel) => ({
  //     ...oldModel,
  //     [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nome' },
  //   }));
  // }, [showModal]);

  return (
    <div className={ styles.Container }>
      <DataGrid
        rows={ rows }
        columns={ columns }
        editMode='row'
        onRowKeyDown={ handleRowKeyDown }
        rowModesModel={ rowModesModel }
        onRowEditStop={ handleRowEditStop }
        onRowModesModelChange={ (model) => setRowModesModel(model) }
        processRowUpdate={ processRowUpdate }
        onProcessRowUpdateError={ handleProcessRowUpdateError }
        rowHeight={ 100 }
        slots={ {
          toolbar: Toolbar,
        } }
        slotProps={ {
          toolbar: {
            rowMode,
            selectedRowId,
            save: handleSaveClick,
            edit: handleEditClick,
            cancel: handleCancelClick,
            // add: handleAddClick
          },
          row: {
            onFocus: handleRowFocus,
          },
        } }
        initialState={ {
          pagination: { paginationModel: { pageSize: 50 } },
        } }
        sx={ {
          '& .MuiDataGrid-columnHeaderTitle': {
            textOverflow: 'clip',
            whiteSpace: 'break-spaces',
            lineHeight: 1,
            textAlign: 'center'
          },
        } }
      />
    </div>
  );
}

export default TabelaGestaoUsuarios;
