import { getData } from '../../utils/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { ConteudoTrilha } from '@impulsogov/design-system'


export async function getServerSideProps({req}) {
    let redirect 
    const userIsActive = req.cookies['next-auth.session-token']
    const userIsActiveSecure = req.cookies['__Secure-next-auth.session-token']
    if(userIsActive){
      redirect=true
    }else{
        if(userIsActiveSecure){redirect=true}else{redirect=false}
    }
    if(!redirect) {
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
        res : res
        }
    }
}


const Index = ({res}) => {
    const { data: session,status } = useSession()
    return(
        <>
            <ConteudoTrilha
                avaliacao={{
                    botaoConcluido: {
                    label: 'CONCLUÍDA',
                    submit: ()=>console.log('')
                    },
                    botaoConcluir: {
                    label: 'MARCAR COMO CONCLUÍDA',
                    submit: ()=>console.log('')
                    },
                    chamadaAvaliacao: 'Como você avalia esse conteúdo?',
                    concluido: false
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
                video="https://www.youtube.com/embed/odEX6URNmJ4"
            />        
        </>
    )
}

export default Index;