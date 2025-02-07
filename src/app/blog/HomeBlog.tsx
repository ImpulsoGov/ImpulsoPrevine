"use client";
import {
	ListaArtigos,
	PreviewArtigoDestaque,
	Spinner,
	TituloTexto,
} from "@impulsogov/design-system";

interface Artigo {
	id: string;
	tag: string;
	titulo: string;
	texto: string;
	autor: string;
	avatar?: string;
	data: string;
	imagem?: string;
}

interface ArtigosListaData {
	listaArtigos: {
		titulo: string;
		buttonLabel: string;
		buttonLink: string;
	}[];
}

interface HomeBlogProps {
	artigosListaData?: ArtigosListaData;
	artigos?: Artigo[];
	artigoDestaque?: Artigo;
}
export const HomeBlog: React.FC<HomeBlogProps> = ({
	artigosListaData,
	artigos,
	artigoDestaque,
}) => {
	return (
		<>
			{artigoDestaque ? (
				<PreviewArtigoDestaque
					id={artigoDestaque.id}
					tag={artigoDestaque.tag}
					titulo={artigoDestaque.titulo}
					texto={artigoDestaque.texto}
					autor={{
						avatar: artigoDestaque.avatar,
						nome: artigoDestaque.autor,
						data: artigoDestaque.data,
					}}
					imagem={artigoDestaque.imagem}
				/>
			) : (
				<Spinner />
			)}
			<TituloTexto
				imagem={{
					posicao: null,
					url: "",
				}}
				titulo=" "
				texto=""
			/>
			<TituloTexto
				imagem={{
					posicao: null,
					url: "",
				}}
				titulo="Outros artigos"
				texto=""
			/>
			{artigosListaData && artigos ? (
				<ListaArtigos
					resumo={false}
					artigos={artigos}
					titulo={artigosListaData.listaArtigos[0].titulo}
					btn={{
						label: artigosListaData.listaArtigos[0].buttonLabel,
						link: artigosListaData.listaArtigos[0].buttonLink,
					}}
				/>
			) : (
				<Spinner />
			)}
		</>
	);
};
