'use client'; // Marca este componente como Client Component

import { ConteudoBlog } from '@impulsogov/design-system';

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
    <ConteudoBlog
      titulo={titulo}
      texto={texto}
      capa={capa}
      autor={autor}
    />
  );
};

export default BlogContent;
