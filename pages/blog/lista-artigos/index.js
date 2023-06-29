import { ListaArtigos, TituloTexto } from "@impulsogov/design-system";

import { getData } from '../../../services/cms'
import { LAYOUT, LISTA_ARTIGOS, POSTS } from '../../../utils/QUERYS'

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
            avatar: artigo?.avatar?.url,  
            data:  artigo.createdAt,
            imagem : artigo?.capa?.url,
          }
    )});    
    
    return (
      <>
        <TituloTexto
        imagem = {{
          posicao: null,
          url: ''
        }}
        titulo = 'Todos os artigos'
        texto = ''
        />
        <ListaArtigos
            resumo = {true}
            artigos = {artigos}
            titulo = {res[2].listaArtigos[0].titulo}
            btn = {{label : 'Voltar para Blog', link: '/blog'}}
        />
      </>
    );
}

export default Index;