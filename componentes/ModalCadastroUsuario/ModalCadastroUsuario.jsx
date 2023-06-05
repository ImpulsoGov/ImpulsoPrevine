import { ButtonColorSubmit, TituloSmallTexto } from '@impulsogov/design-system';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { CARGOS } from '../../constants/gestaoUsuarios';
import styles from './ModalCadastroUsuario.module.css';

function ModalCadastroUsuario({ titulo, isOpen, closeModal }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [equipe, setEquipe] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);

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
        />

        <form className={ styles.Formulario }>
          <TextField
            sx={ { width: '30%' } }
            id='outlined-controlled'
            label='Nome'
            value={ nome }
            onChange={ (event) => {
              setNome(event.target.value);
            } }
          />

          <TextField
            sx={ { width: '30%' } }
            id='outlined-controlled'
            label='E-mail'
            value={ email }
            onChange={ (event) => {
              setEmail(event.target.value);
            } }
          />

          <TextField
            sx={ { width: '30%' } }
            id='outlined-controlled'
            label='CPF'
            value={ cpf }
            onChange={ (event) => {
              setCpf(event.target.value);
            } }
          />

          <TextField
            sx={ { width: '30%' } }
            id='outlined-controlled'
            label='Município'
            value={ municipio }
            onChange={ (event) => {
              setMunicipio(event.target.value);
            } }
          />

          <TextField
            sx={ { width: '30%' } }
            id='outlined-controlled'
            label='Cargo'
            select
            value={ cargo }
            onChange={ (event) => {
              setCargo(event.target.value);
            } }
          >
            { CARGOS.map((cargo) => (
              <MenuItem key={ cargo } value={ cargo }>{ cargo }</MenuItem>
            )) }
          </TextField>

          <TextField
            sx={ { width: '30%' } }
            id='outlined-controlled'
            label='Telefone'
            value={ telefone }
            onChange={ (event) => {
              setTelefone(event.target.value);
            } }
          />

          <TextField
            sx={ { width: '30%' } }
            id='outlined-controlled'
            label='Equipe'
            value={ equipe }
            onChange={ (event) => {
              setEquipe(event.target.value);
            } }
          />

          <label>
            <Checkbox
              checked={ whatsapp }
              onChange={ (event) => setWhatsapp(event.target.checked) }
            />
            Whatsapp
          </label>
        </form>

        <ButtonColorSubmit
          label='ADICIONAR'
          submit={ () => console.log() }
        />
      </div>
    </Modal>
  );
}

export default ModalCadastroUsuario;
