"use client";
import dynamic from 'next/dynamic';

const ListaArtigos = dynamic<{
	resumo: boolean;
	artigos: {
		id: string;
		tag: string;
		titulo: string;
		texto: string;
		autor: string;
		avatar?: string;
		data: string;
		imagem?: string;
	}[];
	titulo: string;
	btn: {
		label: string;
		link: string;
	};
}>(() => import('@impulsogov/design-system').then(mod => mod.ListaArtigos));
const PreviewArtigoDestaque = dynamic<{
	id: string;
	tag: string;
	titulo: string;
	texto: string;
	autor: {
		avatar?: string;
		nome: string;
		data: string;
	};
	imagem?: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.PreviewArtigoDestaque));
const Spinner = dynamic(() => import('@impulsogov/design-system').then(mod => mod.Spinner));
const TituloTexto = dynamic<{
	imagem: {
		posicao: boolean | null;
		url: string;
	};
	titulo: string;
	texto: string;
}>(() => import('@impulsogov/design-system').then(mod => mod.TituloTexto));

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
