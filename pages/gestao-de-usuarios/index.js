import { ButtonColorSubmit, Spinner, TituloSmallTexto, TituloTexto } from '@impulsogov/design-system';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid, GridRowModes } from '@mui/x-data-grid';
import { getSession, useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { MultipleSelectCheckmarks } from '../../componentes/MultipleSelectCheckmarks';
import { Toolbar } from '../../componentes/Toolbar';
import { redirectHomeGestaoUsuarios } from '../../helpers/redirectHome';
import { getData } from '../../services/cms';
import { atualizarAutorizacoes, atualizarUsuario, listarPerfis, listarUsuarios } from '../../services/gestaoUsuarios';
import { LAYOUT } from '../../utils/QUERYS';

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const redirect = redirectHomeGestaoUsuarios(ctx, session);
  if (redirect) return redirect;
  const res = [
    await getData(LAYOUT)
  ];
  return {
    props: {
      res: res
    }
  };
}

const GestaoDeUsuarios = () => {
  const { data: session } = useSession();
  const [rows, setRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState('');
  const [rowModesModel, setRowModesModel] = useState({});
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [autorizacoes, setAutorizacoes] = useState([]);
  const [selectedRowAutorizacoes, setSelectedRowAutorizacoes] = useState([]);
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    listarPerfis()
      .then((perfis) => setAutorizacoes(perfis));

    listarUsuarios()
      .then((usuarios) => {
        const linhas = transformarDadosEmLinhas(usuarios);
        setRows(linhas);
      });
  }, []);

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
      headerName: 'E-Mail',
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

  const showModal = useCallback(() => {
    setShouldShowModal(true);
  }, []);

  const closeModal = useCallback(() => setShouldShowModal(false), []);

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
      autorizacoes: dado.autorizacoes,
      editarAutorizacoes: showModal,
      isNew: false,
    }));
  }, [showModal]);

  const handleCloseSnackbar = useCallback(() => setSnackbar(null), []);

  const handleRowFocus = useCallback((event) => {
    const rowId = event.currentTarget.dataset.id;
    const { autorizacoes } = rows.find(({ id }) => id === rowId);

    setSelectedRowId(rowId);
    setSelectedRowAutorizacoes([...autorizacoes]);
  }, [rows]);

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

  const processRowUpdate = useCallback(async (newRowData) => {
    const { usuarioId } = newRowData;
    const dadosAtualizados = await atualizarUsuario(usuarioId, newRowData);
    const linhasAtualizadas = rows.map((row) => row.id === newRowData.id
      ? {
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
      }
      : row
    );

    setRows(linhasAtualizadas);
    setSnackbar({ children: 'Usuário salvo com sucesso', severity: 'success' });

    return newRowData;
  }, [rows]);

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
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

  const handleSelectChange = useCallback((event) => {
    const { target: { value } } = event;

    // On autofill we get a stringified value.
    setSelectedRowAutorizacoes(
      typeof value === 'string' ? value.split(', ') : value,
    );
  }, []);

  const getSelectedAutorizacoesIds = useCallback(() => {
    const autorizacoesIds = selectedRowAutorizacoes.map((autorizacao) => {
      const { id } = autorizacoes.find(({ descricao }) => descricao === autorizacao);

      return id;
    });

    return autorizacoesIds;
  }, [selectedRowAutorizacoes, autorizacoes]);

  const handleAutorizacoesEdit = useCallback(async () => {
    const { usuarioId } = rows.find(({ id }) => id === selectedRowId);
    const autorizacoesIds = getSelectedAutorizacoesIds();
    const response = await atualizarAutorizacoes(usuarioId, autorizacoesIds);
    const novasAutorizacoes = response.map(({ descricao }) => descricao);
    const linhasAtualizadas = rows.map((row) => row.id === selectedRowId
      ? { ...row, autorizacoes: novasAutorizacoes }
      : row
    );

    setRows(linhasAtualizadas);
    setSnackbar({
      children: 'Autorizações atualizadas com sucesso',
      severity: 'success'
    });
  }, [getSelectedAutorizacoesIds, selectedRowId, rows]);

  const getSelectedRowNome = useCallback(() => {
    if (selectedRowId) {
      const { nome } = rows.find(({ id }) => id === selectedRowId);

      return nome;
    }
  }, [rows, selectedRowId]);

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
    <>
      { rows.length !== 0
        ? (
          <>
            <TituloTexto imagem={ {
              posicao: null,
              url: ''
            } }
              titulo='Boas-vindas à área de gestão de usuários'
              texto=''
            />

            <Modal
              open={ shouldShowModal }
              onClose={ closeModal }
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <div style={ {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                height: '60vh',
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '30px 40px',
              } }>
                <TituloSmallTexto
                  imagem={ {
                    posicao: null,
                    url: ''
                  } }
                  texto=''
                  titulo={ `Autorizações de <strong>${getSelectedRowNome()}</strong>` }
                />

                <div style={ {
                  display: 'flex',
                  gap: '40px'
                } }>
                  <MultipleSelectCheckmarks
                    label='Autorizações'
                    options={ autorizacoes }
                    selectedOptions={ selectedRowAutorizacoes }
                    handleChange={ handleSelectChange }
                  />

                  <ButtonColorSubmit
                    label='SALVAR'
                    submit={ handleAutorizacoesEdit }
                  />
                </div>
              </div>
            </Modal>

            <div style={ { padding: 80, paddingTop: 0, height: 800, width: '100%' } }>
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

              { snackbar !== null && (
                <Snackbar
                  open
                  anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
                  onClose={ handleCloseSnackbar }
                  autoHideDuration={ 6000 }
                >
                  <Alert { ...snackbar } onClose={ handleCloseSnackbar } />
                </Snackbar>
              ) }
            </div>
          </>
        )
        : <Spinner height='50vh' />
      }
    </>
  );
};

export default GestaoDeUsuarios;
