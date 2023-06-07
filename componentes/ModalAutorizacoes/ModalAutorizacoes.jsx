import { ButtonColorSubmit, Spinner, TituloSmallTexto } from '@impulsogov/design-system';
import Modal from '@mui/material/Modal';
import React from 'react';
import { Select } from '../Select';
import styles from './ModalAutorizacoes.module.css';

function ModalAutorizacoes({
  titulo,
  autorizacoes,
  autorizacoesSelecionadas,
  handleSelectChange,
  handleEditClick,
  isOpen,
  closeModal,
  isLoading
}) {
  return (
    <Modal
      open={ isOpen }
      onClose={ closeModal }
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={
        `${styles.EdicaoAutorizacoesContainer} ${isLoading && styles.Loading}`
      }>
        { isLoading
          ? <Spinner />
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

              <div className={ styles.SelectContainer }>
                <Select
                  label='Autorizações'
                  options={ autorizacoes }
                  selectedOptions={ autorizacoesSelecionadas }
                  handleChange={ handleSelectChange }
                  width='75%'
                  isMulti
                />

                <ButtonColorSubmit
                  label='SALVAR'
                  submit={ handleEditClick }
                />
              </div>
            </>
          )
        }
      </div>
    </Modal>
  );
}

export default ModalAutorizacoes;
