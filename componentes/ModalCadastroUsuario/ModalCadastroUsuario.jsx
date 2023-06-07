import { ButtonColorSubmit, Spinner, TituloSmallTexto } from '@impulsogov/design-system';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import { CARGOS } from '../../constants/gestaoUsuarios';
import { Select } from '../Select';
import styles from './ModalCadastroUsuario.module.css';

function ModalCadastroUsuario({
  titulo, isOpen, closeModal, handleAddClick, autorizacoes, isLoading
}) {
  const [nome, setNome] = useState('');
  const [mail, setMail] = useState('');
  const [cpf, setCpf] = useState('');
  const [municipio, setMunicipio] = useState('');
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

  const limparInputs = useCallback(() => {
    setNome('');
    setMail('');
    setCpf('');
    setMunicipio('');
    setCargo('');
    setTelefone('');
    setEquipe('');
    setWhatsapp(false);
    setAutorizacoesSelecionadas([]);
  }, []);

  return (
    <Modal
      open={ isOpen }
      onClose={ closeModal }
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={ styles.Container }>
        { isLoading
          ? <Spinner height='50vh' />
          : (
            <>
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

                <TextField
                  sx={ { width: '30%', m: 1 } }
                  id='outlined-controlled'
                  label='Município'
                  value={ municipio }
                  onChange={ (event) => {
                    setMunicipio(event.target.value);
                  } }
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
                }, limparInputs) }
              />
            </>
          )
        }
      </div>
    </Modal>
  );
}

export default ModalCadastroUsuario;
