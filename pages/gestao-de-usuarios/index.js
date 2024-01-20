import { Spinner, TituloTexto } from '@impulsogov/design-system';
import { getSession, useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
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
  const { data: session } = useSession();
  const [usuarios, setUsuarios] = useState([]);
  const [autorizacoes, setAutorizacoes] = useState([]);
  const [rows, setRows] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [showModalAutorizacoes, setShowModalAutorizacoes] = useState(false);
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.access_token) {
      listarPerfis(session?.user?.access_token)
        .then((perfis) => setAutorizacoes(perfis));

      listarUsuarios(session?.user?.access_token)
        .then((usuarios) => {
          setUsuarios(usuarios);
        });
    }
  }, [session?.user?.access_token]);

  const openModalAutorizacoes = useCallback(() => {
    setShowModalAutorizacoes(true);
  }, []);

  const checarPerfilAtivo = (perfilAtivo) => {
    if (typeof perfilAtivo === 'boolean' && perfilAtivo === true) {
      return 'Sim';
    }

    if (typeof perfilAtivo === 'boolean' && perfilAtivo === false) {
      return 'Não';
    }

    return 'Primeiro acesso pendente';
  };

  useEffect(() => {
    const transformarDadosEmLinhas = (dados) => {
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
        autorizacoes: dado.autorizacoes,
        editarAutorizacoes: openModalAutorizacoes,
        isNew: false,
      }));
    };

    const linhas = transformarDadosEmLinhas(usuarios);
    setRows(linhas);
  }, [usuarios, openModalAutorizacoes]);

  const handleSnackbarClose = useCallback(() => setSnackbar(null), []);

  const showErrorMessage = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const showSuccessMessage = useCallback((message) => {
    setSnackbar({ children: message, severity: 'success' });
  }, []);

  // const openModalAutorizacoes = useCallback(() => {
  //   setShowModalAutorizacoes(true);
  // }, []);

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
    selectedRowId, selectedRowAutorizacoes
  }) => {
    try {
      const { usuarioId } = rows.find(({ id }) => id === selectedRowId);

      validarAutorizacoesSelecionadas(selectedRowAutorizacoes);
      setLoading(true);

      const autorizacoesIds = getSelectedAutorizacoesIds(selectedRowAutorizacoes);
      const response = await atualizarAutorizacoes(
        usuarioId,
        autorizacoesIds,
        session?.user?.access_token
      );
      const novasAutorizacoes = getDescricaoAutorizacoes(response);
      const linhasAtualizadas = rows.map((row) => row.id === selectedRowId
        ? { ...row, autorizacoes: novasAutorizacoes }
        : row
      );

      setRows(linhasAtualizadas);
      setLoading(false);
      showSuccessMessage('Autorizações atualizadas com sucesso');
      closeModalAutorizacoes();
    } catch (error) {
      setLoading(false);
      showErrorMessage(error);
    }
  }, [
    rows,
    getSelectedAutorizacoesIds,
    showErrorMessage,
    validarAutorizacoesSelecionadas,
    showSuccessMessage,
    getDescricaoAutorizacoes,
    session?.user?.access_token,
    closeModalAutorizacoes
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

  const cadastrarNovoUsuario = useCallback(async (dados, limparInputs) => {
    try {
      validarCamposObrigatorios(dados);
      validarAutorizacoesSelecionadas(dados.autorizacoesSelecionadas);
      setLoading(true);

      if (!dados.municipioIdSus) throw new Error(MENSAGENS_DE_ERRO.municipioVazio);

      const whatsapp = dados.whatsapp ? '1' : '0';
      const usuarioCadastrado = await cadastrarUsuario(
        {
          ...dados,
          whatsapp,
          municipioIdSus: dados.municipioIdSus
        },
        session?.user?.access_token
      );
      const { id_usuario: usuarioId } = usuarioCadastrado;
      const autorizacoesIds = getSelectedAutorizacoesIds(dados.autorizacoesSelecionadas);
      const autorizacoesUsuario = await atualizarAutorizacoes(
        usuarioId,
        autorizacoesIds,
        session?.user?.access_token
      );

      const novaLinha = {
        id: uuidV4(),
        mail: usuarioCadastrado.mail,
        cpf: usuarioCadastrado.cpf,
        nome: usuarioCadastrado['nome_usuario'],
        usuarioId: usuarioCadastrado['id_usuario'],
        municipio: usuarioCadastrado.municipio,
        cargo: usuarioCadastrado.cargo,
        telefone: usuarioCadastrado.telefone,
        equipe: usuarioCadastrado.equipe,
        perfilAtivo: usuarioCadastrado['perfil_ativo'],
        autorizacoes: getDescricaoAutorizacoes(autorizacoesUsuario),
        editarAutorizacoes: openModalAutorizacoes,
        isNew: false,
      };

      setRows([...rows, novaLinha]);
      setLoading(false);
      limparInputs();
      showSuccessMessage('Usuário cadastrado com sucesso');
    } catch (error) {
      setLoading(false);
      showErrorMessage(error);
    }
  }, [
    rows,
    openModalAutorizacoes,
    showErrorMessage,
    showSuccessMessage,
    getSelectedAutorizacoesIds,
    validarAutorizacoesSelecionadas,
    getDescricaoAutorizacoes,
    validarCamposObrigatorios,
    session?.user?.access_token
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

      { rows.length !== 0
        ? (
          <TabelaGestaoUsuarios
            rows={ rows }
            setRows={ setRows }
            autorizacoes={ autorizacoes }
            showSuccessMessage={ showSuccessMessage }
            showErrorMessage={ showErrorMessage }
            handleAddClick={ openModalCadastro }
            closeModalAutorizacoes={ closeModalAutorizacoes }
            showModalAutorizacoes={ showModalAutorizacoes }
            handleAutorizacoesEdit={ editarAutorizacoesUsuario }
            validarCamposObrigatorios={ validarCamposObrigatorios }
            checarPerfilAtivo={ checarPerfilAtivo }
            isLoading={ loading }
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
        isLoading={ loading }
      />

      <SnackBar
        config={ snackbar }
        handleSnackbarClose={ handleSnackbarClose }
      />
    </>
  );
};

export default GestaoDeUsuarios;
