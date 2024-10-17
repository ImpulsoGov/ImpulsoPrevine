import { getDataCapacitacao } from '@services/cms';
import { CONTEUDO_CAPACITACAO } from '@utils/QUERYS';
import { consultarAvaliacaoConclusao } from '@services/capacitacao';
import { acessoModulosTrilhasClient } from "@services/acessoTrilha";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { headers } from 'next/headers';
import { Conteudo } from './Conteudo';

const ConteudoPage = async() => {
    const session = await getServerSession(nextAuthOptions);
    const header = headers();
    const url = header.get('x-current-url')

    if(!url) return <></>
    const codigo_conteudo = url.split('=').length <= 1 ? '' : url.split('=')[1].split('&')[0]
    const trilhaID = url.split('=').length < 1 ? '' : url.split('=')[2].split('&')[0]
    const modulo = Number(codigo_conteudo?.split('-')[1][3])

    if(!session) return <></>
    const AvaliacaoConclusao = await consultarAvaliacaoConclusao(session?.user?.id,codigo_conteudo,session?.user?.access_token)
    const ModulosLiberados = await acessoModulosTrilhasClient(session?.user?.id,trilhaID,session?.user?.access_token)
    const res = await getDataCapacitacao(CONTEUDO_CAPACITACAO(codigo_conteudo,trilhaID))

    const proximo = decodeURIComponent(url.split('&proximo=')[1])

    return <Conteudo 
        res={res} 
        ModulosLiberados={ModulosLiberados} 
        session={session} 
        modulo={modulo} 
        codigo_conteudo={codigo_conteudo} 
        trilhaID={trilhaID}
        avaliacaoConclusao={AvaliacaoConclusao}
        proximo={proximo}
    />
}

export default ConteudoPage;
