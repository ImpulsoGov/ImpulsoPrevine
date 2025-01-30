"use client"; // Marca este componente como Client Component

import dynamic from 'next/dynamic';

const ConteudoBlog = dynamic<{
	titulo: string;
	texto: string;
	capa?: string;
	autor: {
		avatar?: string;
		nome: string;
		data: string;
	};
}>(() => import('@impulsogov/design-system').then(mod => mod.ConteudoBlog));

interface BlogContentProps {
	titulo: string;
	texto: string;
	capa?: string;
	autor: {
		avatar?: string;
		nome: string;
		data: string;
	};
}

const BlogContent = ({ titulo, texto, capa, autor }: BlogContentProps) => {
	return (
		<ConteudoBlog titulo={titulo} texto={texto} capa={capa} autor={autor} />
	);
};

export default BlogContent;
