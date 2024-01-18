import { Spinner, TituloTexto } from '@impulsogov/design-system';
import { getSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { ModalCadastroUsuario } from '../../componentes/ModalCadastroUsuario';
import { SnackBar } from '../../componentes/SnackBar';
import { TabelaGestaoUsuarios } from '../../componentes/TabelaGestaoUsuarios';
import { MENSAGENS_DE_ERRO } from '../../constants/gestaoUsuarios';
import { redirectHomeGestaoUsuarios } from '../../helpers/redirectHome';
import { atualizarAutorizacoes, cadastrarUsuario, listarPerfis, listarUsuarios } from '../../services/gestaoUsuarios';

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const redirect = redirectHomeGestaoUsuarios(ctx, session);

  if (redirect) return redirect;

  return {
    props: {}
  };
}

const GestaoDeUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [autorizacoes, setAutorizacoes] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [showModalAutorizacoes, setShowModalAutorizacoes] = useState(false);
  const [showModalCadastro, setShowModalCadastro] = useState(false);

  useEffect(() => {
    listarPerfis()
      .then((perfis) => setAutorizacoes(perfis));

    listarUsuarios()
      .then((usuarios) => {
        setUsuarios(usuarios);
      });
  }, []);

  const handleSnackbarClose = useCallback(() => setSnackbar(null), []);

  const showErrorMessage = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const showSuccessMessage = useCallback((message) => {
    setSnackbar({ children: message, severity: 'success' });
  }, []);

  const openModalAutorizacoes = useCallback(() => {
    setShowModalAutorizacoes(true);
  }, []);

  const closeModalAutorizacoes = useCallback(() => setShowModalAutorizacoes(false), []);

  const closeModalCadastro = useCallback(() => setShowModalCadastro(false), []);

  const openModalCadastro = useCallback(() => setShowModalCadastro(true), []);

  const getSelectedAutorizacoesIds = useCallback((autorizacoesSelecionadas) => {
    const autorizacoesIds = autorizacoesSelecionadas.map((autorizacao) => {
      const { id } = autorizacoes.find(({ descricao }) => descricao === autorizacao);

      return id;
    });

    return autorizacoesIds;
  }, [autorizacoes]);

  const validarAutorizacoesSelecionadas = useCallback((autorizacoesSelecionadas) => {
    if (autorizacoesSelecionadas.length === 0) {
      throw new Error(MENSAGENS_DE_ERRO.autorizacoesVazias);
    }
  }, []);

  const getDescricaoAutorizacoes = useCallback((dadosAutorizacoes) => {
    return dadosAutorizacoes.map(({ descricao }) => descricao);
  }, []);

  const editarAutorizacoesUsuario = useCallback(async ({
    rows, selectedRowId, selectedRowAutorizacoes, setRows
  }) => {
    try {
      const { usuarioId } = rows.find(({ id }) => id === selectedRowId);

      validarAutorizacoesSelecionadas(selectedRowAutorizacoes);

      const autorizacoesIds = getSelectedAutorizacoesIds(selectedRowAutorizacoes);
      const response = await atualizarAutorizacoes(usuarioId, autorizacoesIds);
      const novasAutorizacoes = getDescricaoAutorizacoes(response);
      const linhasAtualizadas = rows.map((row) => row.id === selectedRowId
        ? { ...row, autorizacoes: novasAutorizacoes }
        : row
      );

      setRows(linhasAtualizadas);
      showSuccessMessage('Autorizações atualizadas com sucesso');
    } catch (error) {
      showErrorMessage(error);
    }
  }, [
    getSelectedAutorizacoesIds,
    showErrorMessage,
    validarAutorizacoesSelecionadas,
    showSuccessMessage,
    getDescricaoAutorizacoes
  ]);

  const validarCamposObrigatorios = useCallback((dados) => {
    if (!dados.nome) throw new Error(MENSAGENS_DE_ERRO.nomeVazio);
    if (!dados.mail) throw new Error(MENSAGENS_DE_ERRO.emailVazio);
    if (!dados.cpf) throw new Error(MENSAGENS_DE_ERRO.cpfVazio);
    if (!dados.cargo) throw new Error(MENSAGENS_DE_ERRO.cargoVazio);
    if (!dados.telefone) throw new Error(MENSAGENS_DE_ERRO.telefoneVazio);
    if (!dados.equipe) throw new Error(MENSAGENS_DE_ERRO.equipeVazio);
    if (!dados.municipio) throw new Error(MENSAGENS_DE_ERRO.municipioVazio);
  }, []);

  const cadastrarNovoUsuario = useCallback(async (dados) => {
    try {
      validarCamposObrigatorios(dados);
      validarAutorizacoesSelecionadas(dados.autorizacoesSelecionadas);

      const whatsapp = dados.whatsapp ? '1' : '0';
      const usuarioCadastrado = await cadastrarUsuario({
        ...dados,
        whatsapp,
        municipio: `${dados.municipio.nome} - ${dados.municipio.uf}`,
        municipio_id_sus: dados.municipio.municipio_id_sus
      });
      const { id_usuario: usuarioId } = usuarioCadastrado;
      const autorizacoesIds = getSelectedAutorizacoesIds(dados.autorizacoesSelecionadas);
      const autorizacoesUsuario = await atualizarAutorizacoes(usuarioId, autorizacoesIds);

      const novoUsuario = {
        mail: usuarioCadastrado.mail,
        cpf: usuarioCadastrado.cpf,
        nome_usuario: usuarioCadastrado['nome_usuario'],
        id_usuario: usuarioCadastrado['id_usuario'],
        municipio: usuarioCadastrado.municipio,
        cargo: usuarioCadastrado.cargo,
        telefone: usuarioCadastrado.telefone,
        equipe: usuarioCadastrado.equipe,
        autorizacoes: getDescricaoAutorizacoes(autorizacoesUsuario)
      };

      setUsuarios([...usuarios, novoUsuario]);
      showSuccessMessage('Usuário cadastrado com sucesso');
    } catch (error) {
      showErrorMessage(error);
    }
  }, [
    usuarios,
    showErrorMessage,
    showSuccessMessage,
    getSelectedAutorizacoesIds,
    validarAutorizacoesSelecionadas,
    getDescricaoAutorizacoes,
    validarCamposObrigatorios
  ]);

  return (
    <>
      <TituloTexto
        imagem={ {
          posicao: null,
          url: ''
        } }
        titulo='Boas-vindas à área de gestão de usuários'
        texto=''
      />

      { usuarios.length !== 0
        ? (
          <TabelaGestaoUsuarios
            usuarios={ usuarios }
            autorizacoes={ autorizacoes }
            showSuccessMessage={ showSuccessMessage }
            showErrorMessage={ showErrorMessage }
            handleAddClick={ openModalCadastro }
            openModalAutorizacoes={ openModalAutorizacoes }
            closeModalAutorizacoes={ closeModalAutorizacoes }
            showModalAutorizacoes={ showModalAutorizacoes }
            handleAutorizacoesEdit={ editarAutorizacoesUsuario }
            validarCamposObrigatorios={ validarCamposObrigatorios }
          />
        )
        : <Spinner height='50vh' />
      }

      <ModalCadastroUsuario
        titulo='Adicionar usuário'
        isOpen={ showModalCadastro }
        closeModal={ closeModalCadastro }
        handleAddClick={ cadastrarNovoUsuario }
        autorizacoes={ autorizacoes }
      />

      <SnackBar
        config={ snackbar }
        handleSnackbarClose={ handleSnackbarClose }
      />
    </>
  );
};

export default GestaoDeUsuarios;
