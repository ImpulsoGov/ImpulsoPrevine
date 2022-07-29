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
      pageTitle="Previne Brasil | Ações Estratégicas"
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
      <IFrame
        height="700"
        link="https://datastudio.google.com/embed/reporting/d28c7264-d346-4b64-9042-4455f0235f35/page/p_mdgdcavlwc"
      />
    </Layout>
  )
}

export default Index;
