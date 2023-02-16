import { getData } from '../../utils/cms';
import { LAYOUT } from '../../utils/QUERYS';
import { getSession,useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { ConteudoTrilha } from '@impulsogov/design-system';
import { consultarAvaliacaoConclusao,concluirConteudo } from '../../services/capacitacao';

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    const AvaliacaoConclusao = await consultarAvaliacaoConclusao(session?.user?.id,ctx?.query?.conteudo_codigo,session?.user?.access_token)
    if(session==null) {
      return {
        redirect: {
          destination: "/",
          permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
        }, 
      }
    }
    const res = [
        await getData(LAYOUT),
    ]
    return {
        props: {
            res : res,
            AvaliacaoConclusao : AvaliacaoConclusao
        }
    }
}


const Index = ({AvaliacaoConclusao}) => {
    const { data: session,status } = useSession()
    const router = useRouter()
    console.log(AvaliacaoConclusao)
      return(
        <>
            <ConteudoTrilha
                avaliacao={{
                    botaoConcluido: {
                    label: 'CONCLUÍDA',
                    },
                    botaoConcluir: {
                    label: 'MARCAR COMO CONCLUÍDA',
                    submit: concluirConteudo,
                    arg:[session?.user?.id,router.query?.conteudo_codigo,session?.user?.access_token]
                    },
                    chamadaAvaliacao: 'Como você avalia esse conteúdo?',
                    concluido: AvaliacaoConclusao?.data ? AvaliacaoConclusao?.data[0]?.concluido : false,
                    nota: AvaliacaoConclusao?.data ? AvaliacaoConclusao?.data[0]?.avaliacao : 0,
                }}
                buttonBar={{
                    botaoDuvidas: {
                    icon: 'https://media.graphassets.com/yaYuyi0KS3WkqhKPUzro',
                    label: 'DÚVIDAS E SUGESTÕES',
                    url: ''
                    },
                    botaoProximo: {
                    icon: 'https://media.graphassets.com/FopDhDizS82SqCD9vD36',
                    label: 'PRÓXIMA',
                    url: ''
                    },
                    botaoVoltar: {
                    icon: 'https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG',
                    label: 'VOLTAR',
                    url: ''
                    }
                }}
                descricao={{
                    modulo: 'MÓDULO 2',
                    moduloTitulo: 'QUALIFICAÇÃO DO REGISTRO DE DADOS',
                    texto: '<p>nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.nisi ut aliquip ex ea commodo consequat.</p>',
                    titulo: 'Introdução aos Indicadores de Hipertensão e Diabetes',
                    trilha: 'HIPERTENSÃO E DIABETES'
                }}
                materialComplementar={{
                    card: {
                    arquivo: 'manual_impulso_previne.pdf',
                    icon: 'https://media.graphassets.com/aFcM8jxSSyStgrfCL8Uw',
                    titulo: 'Manual Impulso Previne',
                    url: 'https://media.graphassets.com/6cOfkxeyT7245Fn19kgU'
                    },
                    titulo: 'Material Complementar'
                }}
                conteudo="https://www.youtube.com/embed/odEX6URNmJ4"
            />        
        </>
    )
}

export default Index;