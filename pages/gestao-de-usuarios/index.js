import { Spinner, TituloTexto } from '@impulsogov/design-system';
import { getSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { ModalCadastroUsuario } from '../../componentes/ModalCadastroUsuario';
import { SnackBar } from '../../componentes/SnackBar';
import { TabelaGestaoUsuarios } from '../../componentes/TabelaGestaoUsuarios';
import { redirectHomeGestaoUsuarios } from '../../helpers/redirectHome';
import { cadastrarUsuario, listarPerfis, listarUsuarios } from '../../services/gestaoUsuarios';

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
          />
        )
        : <Spinner height='50vh' />
      }

      <ModalCadastroUsuario
        titulo='Adicionar usuário'
        isOpen={ showModalCadastro }
        closeModal={ closeModalCadastro }
      />

      <SnackBar
        config={ snackbar }
        handleSnackbarClose={ handleSnackbarClose }
      />
    </>
  );
};

export default GestaoDeUsuarios;
