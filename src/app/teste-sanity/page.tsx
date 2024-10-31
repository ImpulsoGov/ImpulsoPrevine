import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const options = { next: { revalidate: 60 } };

const QUERY = defineQuery(`*[
    _type == "TituloTextoTeste"
  ]{titulo,texto,imagem}`);

const TesteSanityPage = async () => {
    const conteudo = await client.fetch(QUERY, {}, options);
    const imageURL = urlFor(conteudo[0].imagem).url();
    return <>
        <h1 style={{marginTop : "10px"}}>Teste Sanity Page</h1>
        <h2>{conteudo[0].titulo}</h2>
        <div>{conteudo[0].texto}</div>
        <Image src={imageURL} alt={conteudo[0].titulo} width={600} height={400} />

    </>;
};

export default TesteSanityPage;