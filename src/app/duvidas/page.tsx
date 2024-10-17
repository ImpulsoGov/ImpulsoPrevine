'use client'
import { IFrame } from "@impulsogov/design-system";
import { ButtonLight } from "@impulsogov/design-system";
import style from "./Duvidas.module.css"


const DuvidasPage = () => {
  return (
    <>
      <div className={style.BotaoVoltar}>
      <ButtonLight icone={{posicao: 'right',url: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG'}} label="VOLTAR" link="/capacitacoes"/>
      </div>
      <IFrame
        height="2000"
        link="https://docs.google.com/forms/d/e/1FAIpQLSelCjrYy908a4dpluwiTI6uev78eDesDWKiHUixOheKzg1nhQ/viewform"
      />   
    </>
  )
}

export default DuvidasPage;