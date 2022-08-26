import Layout from "../../../componentes/Layout"
import { ListaArtigos } from "@impulsogov/design-system";

import { getData } from '../../../utils/cms'
import { LAYOUT, POSTS } from '../../../utils/QUERYS'

export async function getStaticProps() {
  const res = [
    await getData(LAYOUT),
    await getData(POSTS),
  ]
  return {
    props: {
      res : res
    }
  }
}



const Index = ({res}) => {
  const artigos = res[1].blogArtigos.map((artigo)=>{
    return (
      {
        id: artigo.id,
        tag : artigo.tag,
        titulo : artigo.titulo,
        texto :artigo.texto.raw.children[0].children[0].text,
        autor : artigo.autor,
        avatar: artigo.avatar.url,  
        data:  artigo.createdAt,
        imagem : artigo.capa.url,
      }
  )})
  return (
    <Layout 
      pageTitle="Previne Brasil | Blog"
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
      <ListaArtigos
        resumo = {false}
        artigos = {artigos}
        titulo = "Outros artigo"
        btn = {{label : "ver todos" , link: "artigos"}}
      />    
    </Layout>
  )
}

export default Index;