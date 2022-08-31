import Layout from "../../componentes/Layout";
import { IFrame } from "@impulsogov/design-system";

import { getData } from '../../utils/cms'
import { LAYOUT } from '../../utils/QUERYS'

export async function getStaticProps() {
  const res = [
    await getData(LAYOUT),
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
      pageTitle="Busca Ativa | Gestantes"
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
      <IFrame
        height="2000"
        link="https://datastudio.google.com/embed/reporting/bf7923fb-24b9-4cbf-81ab-8ba507d13a97/page/NvkxC"
      />
    </Layout>
  )
}

export default Index;