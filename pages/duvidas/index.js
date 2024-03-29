import { getSession } from "next-auth/react";
import { IFrame } from "@impulsogov/design-system";
import { ButtonLight } from "@impulsogov/design-system";
import style from "./Duvidas.module.css"
import { redirectHomeTrilha } from "../../helpers/redirectHome";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const redirect = redirectHomeTrilha(ctx,session)
  if(redirect) return redirect
  return { props: {} }
}


const Index = () => {
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

export default Index;