import { getData } from '../../services/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { useSession,getSession } from "next-auth/react"
import { SobreTrilha } from '@impulsogov/design-system'
import { redirectHomeTrilha } from '../../helpers/redirectHome'


export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    const redirect = redirectHomeTrilha(ctx,session)
    if(redirect) return redirect
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
            <SobreTrilha
                tituloTrilha= "Hipertensão e Diabetes"
                botaoVoltar= {{label: "VOLTAR",url : "/capacitacao?trilhaID=cldxqzjw80okq0bkm2we9n1ce"}}
                botaoIniciar= {{label: "INICIAR CAPACITAÇÃO",url : "/capacitacao?trilhaID=cldxqzjw80okq0bkm2we9n1ce"}}
                botaoWhatsapp= {{label: "ENTRAR NO GRUPO DO WHATSAPP",url : "https://chat.whatsapp.com/HMky15GvFczLGSSNZAlJCb"}}
                sobre= {{titulo: "Sobre", texto:"<p>Na trilha de capacitação sobre os indicadores de hipertensão e diabetes do Previne Brasil, vamos falar sobre:<ul><li>Particularidades dos indicadores focados em hipertensão e diabetes para o financiamento da Atenção Primária;</li><li>As melhores práticas de registro e extração de relatórios para acompanhar as pessoas com hipertensão e diabetes;<li>Dicas para captar e identificar usuários, para conduzir a consulta e para dar continuidade ao tratamento com foco na promoção da saúde;</li><li>E formas de gerenciar as atividades e agendas dos profissionais para adaptar a rotina da sua unidade de saúde e garantir mais produtividade.</li></ul>"}}
                conteudo={{
                    titulo : "Cronograma",
                    texto : [
                        {texto: "Fórum 1: 10/05 às 14h"},
                        {texto: "Fórum 2: 24/05 às 14h"},
                    ]
                }}
                nossoTime={{
                    titulo: "Nosso Time",
                    membros:[
                        {
                            foto:"https://media.graphassets.com/Qn3jx6jxSiun4A9PjyM1",
                            nome:"Juliana Ramalho",
                            titulo:"Responsável Técnica"
                        },
                        {
                            foto:"https://media.graphassets.com/XHc9FnRR5ycU6LmzBRJO",
                            nome:"Isabela dos Santos",
                            titulo:"Especialista em saúde"
                        },
                        {
                            foto:"https://media.graphassets.com/rMzefbmrQ7SXzZeUf39n",
                            nome:"Kleverson Miranda",
                            titulo:"Especialista em saúde"
                        },
                        {
                            foto:"https://media.graphassets.com/1UChvJwVQG83514nI3FI",
                            nome:"Camila Coelho",
                            titulo:"Especialista em saúde"
                        },
                        {
                            foto:"https://media.graphassets.com/6hUfUhefTXSSwdHkJpBN",
                            nome:"Fernanda Soares",
                            titulo:"Especialista em saúde"
                        },
                        {
                            foto:"https://media.graphassets.com/B3TEL5HTZut9F44mRMkE",
                            nome:"Murilo Celli",
                            titulo:"Especialista em Negócios"
                        }
                    ]
                }}
            />   
        </>
    )
}

export default Index;
