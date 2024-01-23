import { Badge, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { DataGrid, GridRowModes, useGridApiContext } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ESTADOS_PERFIL_ATIVO, MENSAGENS_DE_ERRO } from '../../constants/gestaoUsuarios';
import { MUNICIPIOS } from '../../constants/municipios';
import { atualizarUsuario } from '../../services/gestaoUsuarios';
import { ModalAutorizacoes } from '../ModalAutorizacoes';
import { Toolbar } from '../Toolbar';
import styles from './TabelaGestaoUsuarios.module.css';

function CheckboxPerfilAtivo(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = (_event, newValue) => {
    apiRef.current.setEditCellValue({
      id,
      field,
      value: newValue ? 'Sim' : 'Não'
    });
  };

  return (
    <Checkbox
      checked={ ESTADOS_PERFIL_ATIVO[value] }
      onChange={ handleChange }
    />
  );
}

function AutocompleteMunicipios(props) {
  const { id, value, field } = props;
  const municipioSelecionado = MUNICIPIOS.find(({ nome, uf }) => `${nome} - ${uf}` === value);
  const apiRef = useGridApiContext();
  const [selectedValue, setSelectedValue] = useState(municipioSelecionado);
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (_event, newValue) => {
    setSelectedValue(newValue);

    if (newValue !== null) {
      apiRef.current.setEditCellValue({ id, field, value: `${newValue.nome} - ${newValue.uf}` });
    } else {
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    }
  };

  const handleInputChange = (_event, newInputValue) => {
    setInputValue(newInputValue);

    if (
      selectedValue !== null &&
      newInputValue !== `${selectedValue.nome} - ${selectedValue.uf}`
    ) {
      apiRef.current.setEditCellValue({ id, field, value: null });
    }
  }

  return (
    <Autocomplete
      id="combo-box-demo"
      value={selectedValue}
      inputValue={inputValue}
      options={MUNICIPIOS}
      onChange={handleChange}
      onInputChange={handleInputChange}
      getOptionLabel={(({ nome, uf }) => `${nome} - ${uf}`)}
      sx={{ width: "100%" }}
      renderInput={(params) => <TextField {...params} />}
    />
  )
}

function TabelaGestaoUsuarios({
  rows,
  setRows,
  autorizacoes,
  showSuccessMessage,
  showErrorMessage,
  handleAddClick,
  checarPerfilAtivo,
  closeModalAutorizacoes,
  showModalAutorizacoes,
  handleAutorizacoesEdit,
  validarCamposObrigatorios
}) {
  const { data: session } = useSession();
  const [selectedRowId, setSelectedRowId] = useState('');
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectedRowAutorizacoes, setSelectedRowAutorizacoes] = useState([]);
  const [selectedRowNome, setSelectedRowNome] = useState('');

  useEffect(() => {
    const linhaEncontrada = rows.find(({ id }) => id === selectedRowId);

    if (linhaEncontrada) {
      setSelectedRowNome(linhaEncontrada.nome);
    }
  }, [rows, selectedRowId]);

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
      renderEditCell: (params) => {
        if (params.value !== 'Primeiro acesso pendente') {
          return <CheckboxPerfilAtivo {...params} />
        }

        return 'Primeiro acesso pendente';
      },
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
  }, [rowModesModel, selectedRowId]);

  const handleRowFocus = useCallback((event) => {
    const rowId = event.currentTarget.dataset.id;
    const { autorizacoes } = rows.find(({ id }) => id === rowId);

    setSelectedRowId(rowId);
    setSelectedRowAutorizacoes([...autorizacoes]);
  }, [rows]);

  const processRowUpdate = useCallback(async (newRowData) => {
    const { usuarioId } = newRowData;

    validarCamposObrigatorios(newRowData);

    const {municipioIdSus} = MUNICIPIOS.find(({ nome, uf }) => `${nome} - ${uf}` === newRowData.municipio);

    if (!municipioIdSus) throw new Error(MENSAGENS_DE_ERRO.municipioVazio);

    const dadosAtualizados = await atualizarUsuario(
      usuarioId,
      {
        ...newRowData,
        municipioIdSus,
        perfilAtivo: ESTADOS_PERFIL_ATIVO[newRowData.perfilAtivo]
      },
      session?.user?.access_token
    );
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
      perfilAtivo: checarPerfilAtivo(dadosAtualizados['perfil_ativo']),
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
  }, [
    rows,
    setRows,
    validarCamposObrigatorios,
    showSuccessMessage,
    session?.user?.access_token,
    checarPerfilAtivo
  ]);

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

      {
        showModalAutorizacoes && selectedRowId &&
        <ModalAutorizacoes
          titulo={ `Autorizações de <strong>${selectedRowNome}</strong>` }
          autorizacoes={ autorizacoes }
          autorizacoesSelecionadas={ selectedRowAutorizacoes }
          handleSelectChange={ handleAutorizacoesChange }
          handleEditClick={ () => handleAutorizacoesEdit({
            selectedRowId, selectedRowAutorizacoes
          }) }
          isOpen={ showModalAutorizacoes }
          closeModal={ closeModalAutorizacoes }
        />
      }
    </div>
  );
}

export default TabelaGestaoUsuarios;
