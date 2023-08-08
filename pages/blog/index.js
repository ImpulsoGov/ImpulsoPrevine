import Layout from "../../componentes/Layout";
import { PreviewArtigoDestaque } from "@impulsogov/design-system"
import { ListaArtigos, TituloTexto } from "@impulsogov/design-system";

import { getData } from '../../services/cms'
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
            avatar: artigo.avatar?.url,  
            data:  artigo.createdAt,
            imagem : artigo.capa?.url,
          }
    )});
    const artigoDestaque = artigos.sort((a,b) => new Date(b.data) - new Date(a.data))[0];
    
    
    return (
      <>
        <PreviewArtigoDestaque
            id = {artigoDestaque.id}
            tag = {artigoDestaque.tag}
            titulo = {artigoDestaque.titulo}
            texto = {artigoDestaque.texto}
            autor = {{avatar: artigoDestaque.avatar, nome: artigoDestaque.autor, data:artigoDestaque.data}}
            imagem = {artigoDestaque.imagem}
        />
        <TituloTexto
        imagem = {{
          posicao: null,
          url: ''
        }}
        titulo = ' '
        texto = ''
        />
        <TituloTexto
        imagem = {{
          posicao: null,
          url: ''
        }}
        titulo = 'Outros artigos'
        texto = ''
        />
        <ListaArtigos
            resumo = {true}
            artigos = {artigos}
            titulo = {res[2].listaArtigos[0].titulo}
            btn = {{label : res[2].listaArtigos[0].buttonLabel , link: res[2].listaArtigos[0].buttonLink}}
        />
      </>
    );
}

export default Index;