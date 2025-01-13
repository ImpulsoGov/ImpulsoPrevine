import BlogContent from './BlogContent';
import { getData } from '@/services/cms';
import { POST, POSTID } from '@/utils/QUERYS';

interface BlogPost {
  id: string;
  titulo: string;
  texto: { html: string };
  capa?: { url: string };
  avatar?: { url: string };
  autor: string;
  createdAt: string;
}

interface Params {
  params: {
    post: string;
  };
}

export async function generateStaticParams() {
  const res = await getData(POSTID) as { blogArtigos: { id: string }[] };
  return res.blogArtigos.map((post: { id: string }) => ({ post: post.id }));
}

const BlogPost = async ({ params }: Params) => {
  const res = await getData(POST(params?.post)) as { blogArtigo: BlogPost };

  if(res?.blogArtigo) return (
    <BlogContent
      titulo={res?.blogArtigo?.titulo}
      texto={res?.blogArtigo?.texto.html}
      capa={res?.blogArtigo?.capa?.url}
      autor={{
        avatar: res?.blogArtigo?.avatar?.url,
        nome: res?.blogArtigo?.autor,
        data: res?.blogArtigo?.createdAt,
      }}
    />
  );
  return <p style={{padding: "60px", width: "100%", textAlign: "center"}}>Erro no carregamento de dados</p>
};

export default BlogPost;
