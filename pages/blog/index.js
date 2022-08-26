import Layout from "../../componentes/Layout";
import { PreviewArtigoDestaque } from "@impulsogov/design-system"
import { ListaArtigos } from "@impulsogov/design-system";

import { getData } from '../../utils/cms'
import { LAYOUT, LISTA_ARTIGOS, POSTS } from '../../utils/QUERYS'

export async function getStaticProps() {
  const res = [
    await getData(LAYOUT),
    await getData(POSTS),
    await getData(LISTA_ARTIGOS),

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
    const artigoDestaque = artigos.sort((a,b) => new Date(b.data) - new Date(a.data))[0]
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
        <PreviewArtigoDestaque
            id = {artigoDestaque.id}
            tag = {artigoDestaque.tag}
            titulo = {artigoDestaque.titulo}
            texto = {artigoDestaque.texto}
            autor = {{avatar: artigoDestaque.avatar, nome: artigoDestaque.autor, data:artigoDestaque.data}}
            imagem = {artigoDestaque.imagem}
        />
        <ListaArtigos
            resumo = {true}
            artigos = {artigos}
            titulo = {res[2].listaArtigos[0].titulo}
            btn = {{label : res[2].listaArtigos[0].buttonLabel , link: res[2].listaArtigos[0].buttonLink}}
        />
    </Layout>
    
  )
}

export default Index;