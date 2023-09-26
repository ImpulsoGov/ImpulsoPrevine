import { useContext } from "react";
import { TituloTexto } from "@impulsogov/design-system";
import { FormConsultoria } from "@impulsogov/design-system";
import Context from "../../utils/Context"
import { getData } from '../../services/cms'
import { LAYOUT, IMPULSOGOV } from '../../utils/QUERYS'

export async function getServerSideProps(ctx) {
  const userIsActive = ctx.req.cookies['next-auth.session-token']
  const userIsActiveSecure = ctx.req.cookies['__Secure-next-auth.session-token']
  let redirect = !userIsActive && !userIsActiveSecure 
  if(!redirect) {
    return {
      redirect: {
        destination: "/inicio",
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      }, 
    }
  }
  const res = [
    await getData(LAYOUT),
    await getData(IMPULSOGOV),
  ]
  return {
    props: {
      res : res
    }
  }
}

const Index = ({res}) => {
  const [cidade, setCidade] = useContext(Context);
  return (
    <>
      <TituloTexto
        imagem = {{
          posicao: null,
          url: ''
        }}
        titulo = {res[1].tituloTextos[0].titulo}
        texto = {res[1].tituloTextos[0].texto.html}
        />
        <FormConsultoria
          title={res[1].formConsultorias[0].titulo}
          mail=""
          link={res[1].formConsultorias[0].link}
          button={res[1].formConsultorias[0].button}
        />      
    </>
  )
}

export default Index;