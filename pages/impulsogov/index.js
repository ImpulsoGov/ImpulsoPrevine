import Layout from "../../componentes/Layout";
import { TituloTexto } from "@impulsogov/design-system";
import { FormConsultoria } from "@impulsogov/design-system";

import { getData } from '../../utils/cms'
import { LAYOUT, IMPULSOGOV } from '../../utils/QUERYS'

export async function getStaticProps() {
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
  console.log(res)
  return (
    <Layout 
      pageTitle="Previne Brasil | Home"
      logoIPColor={res[0].logoIps[0].logo[0].url}
      logoIPWhite = {res[0].logoIps[0].logo[1].url}
      menus = {res[0].menus}
      dropdown = {res[0].dropDownMenus}
      footer = {res[0].footers}
      logoImpulso = {res[0].logoImpulsos[0].logo[0].url}
      socialMedia = { [
        { url: res[0].socialMedias[0].url, logo: res[0].socialMedias[0].logo[0].url},
        { url: res[0].socialMedias[1].url, logo: res[0].socialMedias[1].logo[0].url},
        { url: res[0].socialMedias[2].url, logo: res[0].socialMedias[2].logo[0].url},
      ]}
      copyright = {{
        label: res[0].copyrights[0].copyright,
        contato : res[0].copyrights[0].contato
      }}
    >
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

    </Layout>
  )
}

export default Index;