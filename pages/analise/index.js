import Layout from "../../componentes/Layout";
import { Header } from "@impulsogov/design-system";
import { ButtonBar } from "@impulsogov/design-system";
import { ButtonLight } from "@impulsogov/design-system";
import { getData } from '../../utils/cms';
import { LAYOUT, ANALISE } from '../../utils/QUERYS';

export async function getStaticProps() {
  const res = [
    await getData(LAYOUT),
    await getData(ANALISE),
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
      pageTitle="Previne Brasil | Análise"
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
      <Header
        titulo = {res[1].headers[1].titulo}
        texto = {res[1].headers[1].texto}
        botao = {{label : null,url:null}}
        chamada = {{label : null,url:null}}
        />
        <ButtonBar
            child1 = {<ButtonLight label={res[1].buttonBars[0].label} link={res[1].buttonBars[0].link}/>}
            child2= {<ButtonLight label={res[1].buttonBars[1].label} link={res[1].buttonBars[1].link}/>}
            child3 = {<ButtonLight label={res[1].buttonBars[2].label} link={res[1].buttonBars[2].link}/>}

        />    
        </Layout>
  )
}

export default Index;
