import { ConteudoBlog } from '@impulsogov/design-system'
import { getData } from '../../../services/cms'
import { LAYOUT,POST, POSTID } from '../../../utils/QUERYS'

export async function getStaticPaths() {
    const res = await getData(POSTID)
    const postID = res.blogArtigos.map((post)=>{return { params: { post: post.id }}})
    return {
      paths: [...postID],
      fallback: false,
    }
  }

export async function getStaticProps({ params }) {
    const res = [
    await getData(LAYOUT),
    await getData(POST(params.post)),
    ]
    return {
    props: {
        res : res
    }
    }
}

const Index = ({res}) => {
    return (<>
      <ConteudoBlog
          titulo = {res[1].blogArtigo.titulo}
          texto = {res[1].blogArtigo.texto.html}
          capa = {res[1].blogArtigo?.capa?.url}
          autor = {{avatar: res[1].blogArtigo?.avatar?.url, nome: res[1].blogArtigo.autor, data:res[1].blogArtigo.createdAt}}
      />
    </>
  )
}

export default Index;
