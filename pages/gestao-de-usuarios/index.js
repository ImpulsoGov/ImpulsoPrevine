import { Spinner, TituloTexto } from '@impulsogov/design-system';
import Modal from '@mui/material/Modal';
import { getSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { EdicaoAutorizacoes } from '../../componentes/EdicaoAutorizacoes';
import { SnackBar } from '../../componentes/SnackBar';
import { TabelaGestaoUsuarios } from '../../componentes/TabelaGestaoUsuarios';
import { redirectHomeGestaoUsuarios } from '../../helpers/redirectHome';
import { atualizarAutorizacoes, atualizarUsuario, listarPerfis, listarUsuarios } from '../../services/gestaoUsuarios';

const MENSAGENS_DE_ERRO = {
  nomeVazio: 'O campo "Nome" não pode ser vazio',
  municipioVazio: 'O campo "Municipio" não pode ser vazio',
  emailVazio: 'O campo "E-mail" não pode ser vazio',
  cpfVazio: 'O campo "CPF" não pode ser vazio',
  cargoVazio: 'O campo "Cargo" não pode ser vazio',
  telefoneVazio: 'O campo "Telefone" não pode ser vazio',
  equipeVazio: 'O campo "Equipe" não pode ser vazio',
  autorizacoesVazias: 'Selecione ao menos uma autorização',
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const redirect = redirectHomeGestaoUsuarios(ctx, session);

  if (redirect) return redirect;

  return {
    props: {

    }
  };
}

const GestaoDeUsuarios = () => {
  const [rows, setRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState('');
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

  const handleSnackbarClose = useCallback(() => setSnackbar(null), []);

  const handleTableRowFocus = useCallback((event) => {
    const rowId = event.currentTarget.dataset.id;
    const { autorizacoes } = rows.find(({ id }) => id === rowId);

    setSelectedRowId(rowId);
    setSelectedRowAutorizacoes([...autorizacoes]);
  }, [rows]);

  const validarCamposDadosUsuario = useCallback((dados) => {
    if (!dados.nome) throw new Error(MENSAGENS_DE_ERRO.nomeVazio);
    if (!dados.municipio) throw new Error(MENSAGENS_DE_ERRO.municipioVazio);
    if (!dados.mail) throw new Error(MENSAGENS_DE_ERRO.emailVazio);
    if (!dados.cpf) throw new Error(MENSAGENS_DE_ERRO.cpfVazio);
    if (!dados.cargo) throw new Error(MENSAGENS_DE_ERRO.cargoVazio);
    if (!dados.telefone) throw new Error(MENSAGENS_DE_ERRO.telefoneVazio);
    if (!dados.equipe) throw new Error(MENSAGENS_DE_ERRO.equipeVazio);
  }, []);

  const processRowUpdate = useCallback(async (newRowData) => {
    const { usuarioId } = newRowData;

    validarCamposDadosUsuario(newRowData);

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
  }, [rows, validarCamposDadosUsuario]);

  const handleError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

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

  const validarAutorizacoesSelecionadas = useCallback(() => {
    if (selectedRowAutorizacoes.length === 0) {
      throw new Error(MENSAGENS_DE_ERRO.autorizacoesVazias);
    }
  }, [selectedRowAutorizacoes]);

  const handleAutorizacoesEdit = useCallback(async () => {
    try {
      const { usuarioId } = rows.find(({ id }) => id === selectedRowId);
      const autorizacoesIds = getSelectedAutorizacoesIds();

      validarAutorizacoesSelecionadas();

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
    } catch (error) {
      handleError(error);
    }
  }, [getSelectedAutorizacoesIds, selectedRowId, rows, handleError, validarAutorizacoesSelecionadas]);

  const getSelectedRowNome = useCallback(() => {
    if (!selectedRowId) {
      return;
    }

    const { nome } = rows.find(({ id }) => id === selectedRowId);

    return nome;
  }, [rows, selectedRowId]);

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

            <TabelaGestaoUsuarios
              rows={ rows }
              selectedRowId={ selectedRowId }
              processRowUpdate={ processRowUpdate }
              handleProcessRowUpdateError={ handleError }
              handleRowFocus={ handleTableRowFocus }
            />

            <Modal
              open={ shouldShowModal }
              onClose={ closeModal }
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <EdicaoAutorizacoes
                nomeUsuario={ getSelectedRowNome() }
                autorizacoes={ autorizacoes }
                autorizacoesSelecionadas={ selectedRowAutorizacoes }
                handleSelectChange={ handleSelectChange }
                handleEdicaoAutorizacoes={ handleAutorizacoesEdit }
              />
            </Modal>

            <SnackBar
              config={ snackbar }
              handleSnackbarClose={ handleSnackbarClose }
            />
          </>
        )
        : <Spinner height='50vh' />
      }
    </>
  );
};

export default GestaoDeUsuarios;
