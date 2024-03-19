import React from 'react'
import { ButtonColor } from './index'

export default {
  title: "Componentes/ButtonColor",
  component: ButtonColor,
  argTypes: { 
    icone : {
      posicao : { 
        control : 'text',
    },
      tipo : { control : 'text' },
      description: 'Insere Ícone',
    },
    label: { 
      name:"label",
      description: "Rótulo do botão *string*"
    },
    link: {
      name: "link",
      description: "URL do botão *URL*"
    },
  },
};

const Template = (args) => <ButtonColor {...args}/>
export const SemIcone = Template.bind({});
SemIcone.args={
  label :"INDICADORES DE DESEMPENHO",
  link :"indicadores"
} 
export const SemIconeNovaAba = Template.bind({});
SemIconeNovaAba.args={
  label :"INDICADORES DE DESEMPENHO",
  link :"indicadores",
  nova_aba : true
} 

export const ComIconeDireitaWhatsapp = Template.bind({});
ComIconeDireitaWhatsapp.args={
  icone : {
    posicao: 'right',
    url: 'https://media.graphassets.com/M6WOlS0QYt4dEpwPrerQ'
  },
  label : "ENTRAR NO GRUPO DO WHATSAPP",
  link : "/"
}

export const ComIconeEsquerda = Template.bind({});
ComIconeEsquerda.args={
  icone : {
    posicao: 'left',
    url: 'https://media.graphassets.com/Prvnu8ZZSH2w1nmG6cZ5'
  },
  label : "PRÓXIMO",
  link : "/"
}