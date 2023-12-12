import { v1 as uuidv1 } from 'uuid';
import React, { useState, useEffect, useContext } from 'react';
import {TituloSmallTexto } from "@impulsogov/design-system"


const Cadastros = () => {

  return (
    <div style={{margin : "0px 80px"}}>
      <TituloSmallTexto
        key={uuidv1()}
        imagem={{
          posicao: null,
          url: ''
        }}
        texto=""
        titulo="<b>Estamos passando por melhorias. Essa página volta em breve.</b>"
        botao={{
          label: '',
          url: ''
        }}
      />
    </div>
  )
}

export default Cadastros;
