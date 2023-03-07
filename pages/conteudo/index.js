import { getData, getDataCapacitacao } from '../../services/cms';
import { CONTEUDO_CAPACITACAO, LAYOUT } from '../../utils/QUERYS';
import { getSession,useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { ConteudoTrilha } from '@impulsogov/design-system';
import { consultarAvaliacaoConclusao,concluirConteudo,avaliarConteudo } from '../../services/capacitacao';
import { useEffect, useState } from 'react';
import { redirectHomeNotLooged } from '../../helpers/redirectHome';

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    const redirect = redirectHomeNotLooged(ctx,session)
    if(redirect) return redirect
    const codigo_conteudo = ctx?.req?.url.split('=').length <= 1 ? '' : ctx?.req?.url.split('=')[1].split('&')[0]
    const trilhaID = ctx?.req?.url.split('=').length < 1 ? '' : ctx?.req?.url.split('=')[2].split('&')[0]
    const AvaliacaoConclusao = await consultarAvaliacaoConclusao(session?.user?.id,ctx?.query?.codigo_conteudo,session?.user?.access_token)
    const res = [
        await getData(LAYOUT),
        ctx?.req?.url && await getDataCapacitacao(CONTEUDO_CAPACITACAO(codigo_conteudo,trilhaID))
    ]
    return {
        props: {
            res : res,
            AvaliacaoConclusao : AvaliacaoConclusao
        }
    }
}


const Index = ({res,AvaliacaoConclusao}) => {
    const { data: session,status } = useSession()
    const [concluido,setConcluido] = useState(AvaliacaoConclusao ? AvaliacaoConclusao[0]?.concluido : false);
    const [Avaliacao,setAvaliacao] = useState(AvaliacaoConclusao ? AvaliacaoConclusao[0]?.avaliacao : null);
    const [starHover,setStarHover] = useState(AvaliacaoConclusao ? AvaliacaoConclusao[0]?.avaliacao : null)
    const router = useRouter()
    const codigoConteudo = router.query.proximo.slice(0,80).split("?")[1].split("&")[0].split("=")
    const proximo = {
        pathname: codigoConteudo[0] == 'codigo_conteudo' ? '/conteudo' : '/capacitacao',
        query: {}
    }
    if(codigoConteudo[0] == 'codigo_conteudo') proximo.query['codigo_conteudo'] = codigoConteudo[1]
    proximo.query['trilhaID'] = router.query.trilhaID
    const modulo = Number(router.query.codigo_conteudo?.split('-')[1][3])
    if(codigoConteudo[0] == 'codigo_conteudo') proximo.query['proximo'] = router.query.proximo.slice(80,router.query.proximo.length)
    if(codigoConteudo[0] != 'codigo_conteudo') proximo.query['modulo'] = modulo+1
    const dynamicRoute = router.asPath
    useEffect(() => {
        setConcluido(AvaliacaoConclusao ? AvaliacaoConclusao[0]?.concluido : false);
        setAvaliacao(AvaliacaoConclusao ? AvaliacaoConclusao[0]?.avaliacao : null)
        setStarHover(AvaliacaoConclusao ? AvaliacaoConclusao[0]?.avaliacao : null)
    }, [dynamicRoute])
    return(
        <>
            {
                <ConteudoTrilha
                    avaliacao={{
                        botaoConcluido: {
                        label: 'CONCLUÍDA',
                        },
                        botaoConcluir: {
                        label: 'MARCAR COMO CONCLUÍDA',
                        submit: concluirConteudo,
                        arg:[session?.user?.id,router.query?.codigo_conteudo,session?.user?.access_token]
                        },
                        req:avaliarConteudo,
                        chamadaAvaliacao: 'Como você avalia esse conteúdo?',
                        states : {
                            concluido : concluido,
                            setConcluido : setConcluido,
                            Avaliacao : Avaliacao,
                            setAvaliacao : setAvaliacao,
                            starHover : starHover,
                            setStarHover : setStarHover
                        },
                    }}
                    buttonBar={{
                        botaoDuvidas: {
                        icon: 'https://media.graphassets.com/yaYuyi0KS3WkqhKPUzro',
                        label: 'DÚVIDAS E SUGESTÕES',
                        url: '/duvidas'
                        },
                        botaoProximo: {
                        icon: 'https://media.graphassets.com/FopDhDizS82SqCD9vD36',
                        label: 'PRÓXIMA',
                        url: proximo
                        },
                        botaoVoltar: {
                        icon: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG',
                        label: 'VOLTAR',
                        url: '/capacitacao?trilhaID=cldxqzjw80okq0bkm2we9n1ce'
                        }
                    }}
                    descricao={{
                        modulo: 'MÓDULO '+res[1]?.trilhas[0]?.conteudo[modulo]?.moduloId,
                        moduloTitulo: res[1]?.trilhas[0]?.conteudo[modulo]?.titulo.toUpperCase(),
                        texto: res[1]?.conteudos[0]?.tituloTexto?.texto?.html,
                        titulo: res[1]?.conteudos[0]?.tituloTexto?.titulo,
                        trilha: res[1]?.trilhas[0]?.titulo.toUpperCase()
                    }}
                    materialComplementar={{
                        card: {
                        arquivo: res[1]?.conteudos[0]?.materialComplementar[0]?.label,
                        icon: 'https://media.graphassets.com/aFcM8jxSSyStgrfCL8Uw',
                        titulo: res[1]?.conteudos[0]?.materialComplementar[0]?.label ? res[1]?.conteudos[0]?.materialComplementar[0]?.label : '',
                        url:  res[1]?.conteudos[0]?.materialComplementar[0]?.url ? res[1]?.conteudos[0]?.materialComplementar[0]?.url : ''
                        },
                        titulo: 'Material Complementar'
                    }}
                    conteudo={{
                        url : res[1]?.conteudos[0]?.tipo == 'quizz' ? res[1]?.conteudos[0]?.url+session?.user?.mail : res[1]?.conteudos[0]?.url,
                        tipo : res[1]?.conteudos[0]?.tipo
                    }}
                />         
            } 
        </>
    )
}

export default Index;
