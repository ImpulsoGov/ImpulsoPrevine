import { v1 as uuidv1 } from 'uuid';
import React, { useState, useEffect, useContext } from 'react';
import {TituloSmallTexto } from "@impulsogov/design-system"


const Cadastros = () => {

  return (
    <div>
      <TituloSmallTexto
        key={uuidv1()}
        imagem={{
          posicao: null,
          url: ''
        }}
        texto="  "
        titulo="<b> Estamos passando por melhorias. Essa página volta em breve (previsto para o fim de Setembro). </b>"
        botao={{
          label: '',
          url: ''
        }}
      />
    </div>
  )
}

export default Cadastros;