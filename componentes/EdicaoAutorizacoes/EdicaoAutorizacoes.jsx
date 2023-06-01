import React from 'react';
import { MultipleSelectCheckmarks } from '../MultipleSelectCheckmarks';
import { ButtonColorSubmit, TituloSmallTexto } from '@impulsogov/design-system';
import styles from './EdicaoAutorizacoes.module.css';

function EdicaoAutorizacoes({
  nomeUsuario,
  autorizacoes,
  autorizacoesSelecionadas,
  handleSelectChange,
  handleEdicaoAutorizacoes
}) {
  return (
    <div className={styles.EdicaoAutorizacoesContainer}>
      <TituloSmallTexto
        imagem={ {
          posicao: null,
          url: ''
        } }
        texto=''
        titulo={ `Autorizações de <strong>${nomeUsuario}</strong>` }
      />

      <div className={styles.SelectContainer}>
        <MultipleSelectCheckmarks
          label='Autorizações'
          options={ autorizacoes }
          selectedOptions={ autorizacoesSelecionadas }
          handleChange={ handleSelectChange }
        />

        <ButtonColorSubmit
          label='SALVAR'
          submit={ handleEdicaoAutorizacoes }
        />
      </div>
    </div>
  );
}

export default EdicaoAutorizacoes;
