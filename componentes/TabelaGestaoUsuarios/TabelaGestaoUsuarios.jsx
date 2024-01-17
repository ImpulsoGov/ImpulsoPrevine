import { Badge, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid, GridRowModes, useGridApiContext } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { atualizarUsuario } from '../../services/gestaoUsuarios';
import { data } from '../../utils/Municipios';
import { ModalAutorizacoes } from '../ModalAutorizacoes';
import { Toolbar } from '../Toolbar';
import styles from './TabelaGestaoUsuarios.module.css';

function CheckboxPerfilAtivo(props) {
  const { id, value, field, hasFocus } = props;
  const apiRef = useGridApiContext();
  const estados = {
    'Sim': true,
    'Não': false,
    'Primeiro acesso pendente': null
  };

  const handleChange = (_event, newValue) => {
    apiRef.current.setEditCellValue({
      id,
      field,
      value: newValue ? 'Sim' : 'Não'
      // value: newValue
    });
  };

  return (
    <Checkbox
      checked={ estados[value] }
      // checked={ value }
      onChange={ handleChange }
    />
  );
}

function AutocompleteMunicipios(props) {
  const { id, value, field, hasFocus } = props;
  const apiRef = useGridApiContext();
  // const ref = React.useRef();

  const handleChange = (_event, newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      options={[
        ...data,
        {nome: "Demo - Viçosa", uf: "MG", municipio_id_sus: "111111"}
      ]}
      onChange={handleChange}
      getOptionLabel={(({ nome, uf }) => `${nome} - ${uf}`)}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} />}
    />
  )
}

function TabelaGestaoUsuarios({
  usuarios,
  autorizacoes,
  showSuccessMessage,
  showErrorMessage,
  handleAddClick,
  openModalAutorizacoes,
  closeModalAutorizacoes,
  showModalAutorizacoes,
  handleAutorizacoesEdit,
  validarCamposObrigatorios
}) {
  const [rows, setRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectedRowAutorizacoes, setSelectedRowAutorizacoes] = useState([]);

  useEffect(() => {
    const linhas = transformarDadosEmLinhas(usuarios);
    setRows(linhas);
  }, [usuarios, transformarDadosEmLinhas]);

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
      editable: true,
      // type: 'singleSelect',
      // valueOptions: data.map(({ nome, uf }) => `${nome} - ${uf}`),
      renderEditCell: (params) => {
        return <AutocompleteMunicipios {...params} />;
      }
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
      field: 'perfilAtivo',
      headerName: 'Perfil ativo',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      // type: 'singleSelect',
      // valueOptions: ['Sim', 'Não'],
      // type: 'boolean',
      renderEditCell: (params) => {
        if (params.value !== 'Primeiro acesso pendente') {
          return <CheckboxPerfilAtivo {...params} />
        }
        // if (typeof params.value !== 'object' && params.value !== null) {
        //   return <CheckboxPerfilAtivo {...params} />
        // }

        return 'Primeiro acesso pendente';
      },
      // valueGetter: (params) => {
      //   const { value } = params;

      //   if (typeof value === 'boolean' && value === true) {
      //     return 'Sim';
      //   }

      //   if (typeof value === 'boolean' && value === false) {
      //     return 'Não';
      //   }

      //   return 'Primeiro acesso pendente';
      // },
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

  const checarPerfilAtivo = (perfilAtivo) => {
    if (typeof perfilAtivo === 'boolean' && perfilAtivo === true) {
      return 'Sim';
    }

    if (typeof perfilAtivo === 'boolean' && perfilAtivo === false) {
      return 'Não';
    }
    // if (typeof value === 'object' && value === null) {
    return 'Primeiro acesso pendente';
    // }
  }

  const transformarDadosEmLinhas = useCallback((dados) => {
    return dados.map((dado) => ({
      id: uuidV4(),
      usuarioId: dado['id_usuario'],
      mail: dado.mail,
      cpf: dado.cpf,
      nome: dado['nome_usuario'],
      municipio: dado.municipio,
      cargo: dado.cargo,
      telefone: dado.telefone,
      equipe: dado.equipe,
      perfilAtivo: checarPerfilAtivo(dado.perfil_ativo),
      // perfilAtivo: dado.perfil_ativo,
      autorizacoes: dado.autorizacoes,
      editarAutorizacoes: openModalAutorizacoes,
      isNew: false,
    }));
  }, [openModalAutorizacoes]);

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

  const getSelectedRowNome = useCallback(() => {
    if (!selectedRowId) {
      return;
    }

    const { nome } = rows.find(({ id }) => id === selectedRowId);

    return nome;
  }, [rows, selectedRowId]);

  const handleRowFocus = useCallback((event) => {
    const rowId = event.currentTarget.dataset.id;
    const { autorizacoes } = rows.find(({ id }) => id === rowId);

    setSelectedRowId(rowId);
    setSelectedRowAutorizacoes([...autorizacoes]);
  }, [rows]);

  const processRowUpdate = useCallback(async (newRowData) => {
    const { usuarioId } = newRowData;

    validarCamposObrigatorios(newRowData);

    const dadosAtualizados = await atualizarUsuario(usuarioId, {
      ...newRowData,
      municipio: `${newRowData.municipio.nome} - ${newRowData.municipio.uf}`,
      municipio_id_sus: newRowData.municipio.municipio_id_sus
    });
    const linhaAtualizada = {
      id: newRowData.id,
      usuarioId: dadosAtualizados['id_usuario'],
      mail: dadosAtualizados.mail,
      cpf: dadosAtualizados.cpf,
      nome: dadosAtualizados['nome_usuario'],
      municipio: dadosAtualizados.municipio,
      cargo: dadosAtualizados.cargo,
      telefone: dadosAtualizados.telefone,
      equipe: dadosAtualizados.equipe,
      autorizacoes: newRowData.autorizacoes,
      editarAutorizacoes: newRowData.editarAutorizacoes,
      isNew: false,
    };
    const linhasAtualizadas = rows.map((row) => row.id === newRowData.id
      ? linhaAtualizada
      : row
    );

    setRows(linhasAtualizadas);
    showSuccessMessage('Usuário salvo com sucesso');

    return linhaAtualizada;
  }, [rows, validarCamposObrigatorios, showSuccessMessage]);

  const handleAutorizacoesChange = useCallback((event) => {
    const { target: { value } } = event;

    // On autofill we get a stringified value.
    setSelectedRowAutorizacoes(
      typeof value === 'string' ? value.split(', ') : value,
    );
  }, []);

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
        onProcessRowUpdateError={ showErrorMessage }
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
            add: handleAddClick
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

      <ModalAutorizacoes
        titulo={ `Autorizações de <strong>${getSelectedRowNome()}</strong>` }
        autorizacoes={ autorizacoes }
        autorizacoesSelecionadas={ selectedRowAutorizacoes }
        handleSelectChange={ handleAutorizacoesChange }
        handleEditClick={ () => handleAutorizacoesEdit({
          rows, selectedRowId, selectedRowAutorizacoes, setRows
        }) }
        isOpen={ showModalAutorizacoes }
        closeModal={ closeModalAutorizacoes }
      />
    </div>
  );
}

export default TabelaGestaoUsuarios;
