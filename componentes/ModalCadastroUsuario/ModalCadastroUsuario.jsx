import { ButtonColorSubmit, TituloSmallTexto } from '@impulsogov/design-system';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import { CARGOS } from '../../constants/gestaoUsuarios';
import { Select } from '../Select';
import styles from './ModalCadastroUsuario.module.css';
import { MUNICIPIOS } from '../../constants/municipios';

function ModalCadastroUsuario({
  titulo, isOpen, closeModal, handleAddClick, autorizacoes
}) {
  const [nome, setNome] = useState('');
  const [mail, setMail] = useState('');
  const [cpf, setCpf] = useState('');
  const [municipio, setMunicipio] = useState({});
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [equipe, setEquipe] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);
  const [autorizacoesSelecionadas, setAutorizacoesSelecionadas] = useState([]);

  const handleAutorizacoesChange = useCallback((event) => {
    const { target: { value } } = event;

    // On autofill we get a stringified value.
    setAutorizacoesSelecionadas(
      typeof value === 'string' ? value.split(', ') : value,
    );
  }, []);

  const handleAutocompleteChange = (_event, newValue) => {
    setMunicipio(newValue);
  };

  return (
    <Modal
      open={ isOpen }
      onClose={ closeModal }
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={ styles.Container }>
        <TituloSmallTexto
          imagem={ {
            posicao: null,
            url: ''
          } }
          texto=''
          titulo={ titulo }
          botao={{
            label: '',
            url: ''
          }}
        />

        <form className={ styles.Formulario }>
          <TextField
            sx={ { width: '30%', m: 1 } }
            id='outlined-controlled'
            label='Nome'
            value={ nome }
            onChange={ (event) => {
              setNome(event.target.value);
            } }
          />

          <TextField
            sx={ { width: '30%', m: 1 } }
            id='outlined-controlled'
            label='E-mail'
            value={ mail }
            onChange={ (event) => {
              setMail(event.target.value);
            } }
          />

          <TextField
            sx={ { width: '30%', m: 1 } }
            id='outlined-controlled'
            label='CPF'
            value={ cpf }
            onChange={ (event) => {
              setCpf(event.target.value);
            } }
          />

          <Autocomplete
            id="combo-box-demo"
            options={MUNICIPIOS}
            onChange={handleAutocompleteChange}
            getOptionLabel={(({ nome, uf }) => `${nome} - ${uf}`)}
            sx={{ width: "30%", m: 1 }}
            renderInput={(params) => <TextField {...params} label='Município' />}
          />

          <Select
            label='Cargo'
            options={ CARGOS }
            selectedOptions={ cargo }
            handleChange={ (event) => {
              setCargo(event.target.value);
            } }
            width='30%'
          />

          <TextField
            sx={ { width: '30%', m: 1 } }
            id='outlined-controlled'
            label='Telefone'
            value={ telefone }
            onChange={ (event) => {
              setTelefone(event.target.value);
            } }
          />

          <TextField
            sx={ { width: '30%', m: 1 } }
            id='outlined-controlled'
            label='Equipe'
            value={ equipe }
            onChange={ (event) => {
              setEquipe(event.target.value);
            } }
          />

          <Select
            label='Autorizações'
            options={ autorizacoes }
            selectedOptions={ autorizacoesSelecionadas }
            handleChange={ handleAutorizacoesChange }
            width='30%'
            isMulti
          />

          <FormControlLabel
            sx={ { m: 1 } }
            control={
              <Checkbox
                checked={ whatsapp }
                onChange={ (event) => setWhatsapp(event.target.checked) }
              />
            }
            label='Whatsapp'
          />
        </form>

        <ButtonColorSubmit
          label='ADICIONAR'
          submit={ () => handleAddClick({
            nome,
            mail,
            cpf,
            municipio,
            cargo,
            telefone,
            equipe,
            whatsapp,
            autorizacoesSelecionadas
          }) }
        />
      </div>
    </Modal>
  );
}

export default ModalCadastroUsuario;
