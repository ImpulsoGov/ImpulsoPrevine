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
          titulo = {res[0].blogArtigo.titulo}
          texto = {res[0].blogArtigo.texto.html}
          capa = {res[0].blogArtigo?.capa?.url}
          autor = {{avatar: res[0].blogArtigo?.avatar?.url, nome: res[0].blogArtigo.autor, data:res[0].blogArtigo.createdAt}}
      />
    </>
  )
}

export default Index;
