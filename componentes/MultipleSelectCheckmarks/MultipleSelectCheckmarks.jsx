import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function MultipleSelectCheckmarks({
  label, options, handleChange, selectedOptions
}) {

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl sx={ { m: 1, width: '75%', height: '20vh' } }>
      <InputLabel id='demo-multiple-checkbox-label'>
        { label }
      </InputLabel>

      <Select
        labelId='demo-multiple-checkbox-label'
        id='demo-multiple-checkbox'
        multiple
        value={ selectedOptions }
        onChange={ handleChange }
        input={ <OutlinedInput label={ label } /> }
        renderValue={ (selected) => selected.join(', ') }
        MenuProps={ MenuProps }
        sx={ { width: '100%' } }
      >
        { options.map((option) => (
          <MenuItem key={ option.id } value={ option.descricao }>
            <Checkbox checked={ selectedOptions.includes(option.descricao) } />
            <ListItemText primary={ option.descricao } />
          </MenuItem>
        )) }
      </Select>
    </FormControl>
  );
}

export default MultipleSelectCheckmarks;
