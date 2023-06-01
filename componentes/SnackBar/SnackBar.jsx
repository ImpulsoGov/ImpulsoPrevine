import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const TEMPO_EXIBICAO_MILISEGUNDOS = 6000;

function SnackBar({ config, handleSnackbarClose }) {
  return (
    <>
      { config !== null && (
        <Snackbar
          open
          anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
          onClose={ handleSnackbarClose }
          autoHideDuration={ TEMPO_EXIBICAO_MILISEGUNDOS }
        >
          <Alert { ...config } onClose={ handleSnackbarClose } />
        </Snackbar>
      ) }
    </>
  );
}

export default SnackBar;
