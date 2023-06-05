import { Spinner, TituloTexto } from '@impulsogov/design-system';
import { getSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { SnackBar } from '../../componentes/SnackBar';
import { TabelaGestaoUsuarios } from '../../componentes/TabelaGestaoUsuarios';
import { redirectHomeGestaoUsuarios } from '../../helpers/redirectHome';
import { listarPerfis, listarUsuarios } from '../../services/gestaoUsuarios';

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

  return (
    <>
      { usuarios.length !== 0
        ? (
          <>
            <TituloTexto
              imagem={ {
                posicao: null,
                url: ''
              } }
              titulo='Boas-vindas à área de gestão de usuários'
              texto=''
            />

            <TabelaGestaoUsuarios
              usuarios={ usuarios }
              autorizacoes={ autorizacoes }
              showSuccessMessage={ showSuccessMessage }
              showErrorMessage={ showErrorMessage }
            />

            {/* <CadastroUsuario
              titulo='Adicionar usuário'
            /> */}

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
