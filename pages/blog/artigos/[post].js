import Layout from "../../../componentes/Layout"
import { ConteudoBlog } from '@impulsogov/design-system'
import { getData } from '../../../utils/cms'
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
        <ConteudoBlog
            titulo = {res[1].blogArtigo.titulo}
            texto = {res[1].blogArtigo.texto.html}
            capa = {res[1].blogArtigo.capa.url}
            autor = {{avatar: res[1].blogArtigo.avatar.url, nome: res[1].blogArtigo.autor, data:res[1].blogArtigo.createdAt}}
        />

    </Layout>
  )
}

export default Index;