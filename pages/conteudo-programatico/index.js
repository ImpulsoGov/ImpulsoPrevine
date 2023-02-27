import { getData } from '../../services/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { SobreTrilha } from '@impulsogov/design-system'


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
            <SobreTrilha
                tituloTrilha= "Hipertensão e Diabetes"
                botaoVoltar= {{label: "VOLTAR",url : "/capacitacoes"}}
                botaoIniciar= {{label: "INICIAR CAPACITAÇÃO",url : "/capacitacao?trilhaID=cldxqzjw80okq0bkm2we9n1ce"}}
                botaoWhatsapp= {{label: "ENTRAR NO GRUPO DO WHATSAPP",url : "https://chat.whatsapp.com/IFHycLwyfwwCLlRrNZ9bsp"}}
                sobre= {{titulo: "Sobre", texto:"<p>A Trilha de Capacitação da Impulso Gov é uma coletânea de materiais produzidos por especialistas em saúde com ampla experiência na gestão e na rotina de unidades de Atenção Primária à Saúde.</p><p>Para essa edição, exploramos os indicadores 6 e 7 do Previne Brasil, que são focados no atendimento de pessoas com hipertensão e diabetes. Com materiais em formatos variados, a proposta da nossa trilha de capacitação é fortalecer a atuação da APS no acompanhamento de pessoas com essas condições por meio da capacitação dos profissionais que atuam nessa frente de cuidado.</p>Vamos falar sobre as particularidades dos indicadores focados em hipertensão e diabetes para o financiamento da Atenção Primária, sobre as melhores práticas de registro e extração de relatórios para acompanhar as pessoas com hipertensão e diabetes; sobre dicas para captar e identificar usuários, para conduzir a consulta e para dar continuidade ao tratamento com foco na promoção da saúde e sobre formas de gerenciar as atividades e agendas dos profissionais para adaptar a rotina da sua unidade de saúde e garantir mais produtividade."}}
                conteudo={{
                    titulo : "Agenda",
                    texto : [
                        {texto: "06/03 | Módulos I e II liberados"},
                        {texto: "21/03 | Encontro ao vivo"},
                        {texto: "20/03 | Módulos III e IV liberados"},
                        {texto: "07/04 | Encontro ao vivo"},
                    ]
                }}
                nossoTime={{
                    titulo: "Nosso Time",
                    membros:[
                        {
                            foto:"https://media.graphassets.com/XHc9FnRR5ycU6LmzBRJO",
                            nome:"Isabela dos Santos",
                            titulo:"Especialista em saúde"
                        },
                        {
                            foto:"https://media.graphassets.com/Qn3jx6jxSiun4A9PjyM1",
                            nome:"Juliana Ramalho",
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
                        }
                    ]
                }}
            />   
        </>
    )
}

export default Index;
