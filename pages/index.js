import Layout from "../componentes/Layout";
import { HomeBanner } from "@impulsogov/design-system";
import { ImagemFundo } from "@impulsogov/design-system"
import { ParceriasTexto } from "@impulsogov/design-system";
import { FormConsultoria } from "@impulsogov/design-system";

import { getData } from '../utils/cms'
import { LAYOUT, HOME } from '../utils/QUERYS'

export async function getStaticProps() {
  const res = [
    await getData(LAYOUT),
    await getData(HOME),
  ]
  return {
    props: {
      res : res
    }
  }
}

const Parceiros = (res)=>{
  const parceiros = res.map((logo)=>{
    return(
        {
            alt: logo.fileName,
            src: logo.url
        }
    )
  }).reverse()
  return parceiros
}


const Index = ({res}) => {
  return (
    <Layout 
      pageTitle="Previne Brasil | Home"
      color="layoutColor"
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
      NavBarIconBranco =  {res[0].logoMenuMoblies[0].logo.url}
      NavBarIconDark =  {res[0].logoMenuMoblies[1].logo.url}
    >
      <HomeBanner
        titulo = {res[1].homeBanners[0].titulo}
        tituloDestaque = ""
        texto = ""
      />
      <ImagemFundo
          chamada = {res[1].imagemFundos[0].titulo}
          chamadacolor = {res[1].imagemFundos[0].tituloColor}
          cards = {res[1].imagemfundoContents}
          botao = {
                      {
                          label : res[1].imagemFundos[0].buttonLabel,
                          url : res[1].imagemFundos[0].buttonLink
                      }
          }
      />
      <ParceriasTexto
          text = {res[1].parceirosAll[0].titulo.text}
          label = {res[1].parceirosAll[0].labelImages}
          parceiros = {Parceiros(res[1].logoParceiros[0].logoparceiro)}
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