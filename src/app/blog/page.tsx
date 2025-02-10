import { getData } from "@services/cms";
import { LISTA_ARTIGOS, POSTS } from "@utils/QUERYS";
import dynamic from 'next/dynamic';

const HomeBlog = dynamic(() => import('./HomeBlog').then(mod => mod.HomeBlog));

interface Artigo {
  id: string;
  tag: string;
  titulo: string;
  texto: {
    raw: {
      children: {
        children: {
          text: string;
        }[];
      }[];
    };
  };
  autor: string;
  avatar?: {
    url: string;
  };
  createdAt: string;
  capa?: {
    url: string;
  };
}

interface ArtigosListaData {
	listaArtigos: {
		titulo: string;
		buttonLabel: string;
		buttonLink: string;
	}[];
}

const HomeBlogPage = async () => {
	const artigosData = (await getData(POSTS)) as { blogArtigos: Artigo[] };
	const artigos = artigosData
		? artigosData.blogArtigos.map((artigo: Artigo) => {
				return {
					id: artigo.id,
					tag: artigo.tag,
					titulo: artigo.titulo,
					texto: artigo.texto.raw.children[0].children[0].text,
					autor: artigo.autor,
					avatar: artigo?.avatar?.url,
					data: artigo.createdAt,
					imagem: artigo?.capa?.url,
				};
			})
		: [];
	const artigoDestaque = artigos.sort(
			(a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
		)[0];
	const artigosListaData = (await getData(LISTA_ARTIGOS)) as ArtigosListaData;
	return (
		<>
			<HomeBlog
				artigosListaData={artigosListaData}
				artigos={artigos}
				artigoDestaque={artigoDestaque}
			/>
		</>
	);
};

export default HomeBlogPage;
