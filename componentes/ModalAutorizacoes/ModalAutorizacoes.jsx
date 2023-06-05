import { ButtonColorSubmit, TituloSmallTexto } from '@impulsogov/design-system';
import Modal from '@mui/material/Modal';
import React from 'react';
import { MultipleSelectCheckmarks } from '../MultipleSelectCheckmarks';
import styles from './ModalAutorizacoes.module.css';

function ModalAutorizacoes({
  nomeUsuario,
  autorizacoes,
  autorizacoesSelecionadas,
  handleSelectChange,
  handleEditClick,
  isOpen,
  closeModal
}) {
  return (
    <Modal
      open={ isOpen }
      onClose={ closeModal }
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={ styles.EdicaoAutorizacoesContainer }>
        <TituloSmallTexto
          imagem={ {
            posicao: null,
            url: ''
          } }
          texto=''
          titulo={ `Autorizações de <strong>${nomeUsuario}</strong>` }
        />

        <div className={ styles.SelectContainer }>
          <MultipleSelectCheckmarks
            label='Autorizações'
            options={ autorizacoes }
            selectedOptions={ autorizacoesSelecionadas }
            handleChange={ handleSelectChange }
          />

          <ButtonColorSubmit
            label='SALVAR'
            submit={ handleEditClick }
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalAutorizacoes;
