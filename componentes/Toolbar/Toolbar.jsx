import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Toolbar({ selectedRowId, rowMode, save, edit, cancel }) {
  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={ {
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
      } }
    >
      <Button
        onClick={ rowMode === 'edit' ? save : edit }
        onMouseDown={ handleMouseDown }
        disabled={ !selectedRowId }
        variant='outlined'
      >
        { rowMode === 'edit' ? 'Salvar' : 'Editar' }
      </Button>

      <Button
        onClick={ cancel }
        onMouseDown={ handleMouseDown }
        disabled={ rowMode === 'view' }
        variant='outlined'
        sx={ { ml: 1 } }
      >
        Cancelar
      </Button>
    </Box>
  );
}

export default Toolbar;
