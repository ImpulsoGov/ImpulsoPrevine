import React from 'react'
import { ButtonColor } from './index'

export default {
  title: "Componentes/ButtonColor",
  component: ButtonColor,
  argTypes: { label: { control: 'text' }}
}

export const Default = () => {
  return <ButtonColor
    label = "INDICADORES DE DESEMPENHO"
    link = "indicadores"
  />

}