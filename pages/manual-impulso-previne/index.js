import Layout from "../../componentes/Layout";
import { IFrame } from "@impulsogov/design-system";
import { HomeBanner } from "@impulsogov/design-system"

import { getData } from '../../utils/cms'
import { LAYOUT, MANUAL} from '../../utils/QUERYS'

export async function getStaticProps() {
  const res = [
    await getData(LAYOUT),
    await getData(MANUAL),
  ]
  return {
    props: {
      res : res
    }
  }
}


const Index = ({res}) => {
  return (
    <Layout 
      pageTitle="Impulso Previne | Manual"
      logoIPColor={res[0].logoIps[0].logo[0].url}
      logoIPWhite = {res[0].logoIps[0].logo[1].url}
      menus = {res[0].menus}
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
        texto = {res[1].homeBanners[0].texto}
      />
      <IFrame
        height="1200"
        link="https://docs.google.com/forms/d/e/1FAIpQLSd4kBY09SxlM2IaTZ7CAa5IUdmqE-7HK2IEzIPTMJNVnbtFwQ/viewform?embedded=true"
      />
    </Layout>
  )
}

export default Index;