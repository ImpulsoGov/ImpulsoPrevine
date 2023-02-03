import { getData } from '../../utils/cms'
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
                botaoWhatsapp= {{label: "ENTRAR NO GRUPO DO WHATSAPP",url : "/grupo-whatsapp"}}
                sobre= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate nunc ut pretium porttitor. Curabitur ac venenatis purus. Curabitur sed varius ligula, congue tempor ligula. Nulla vel erat ut risus imperdiet sodales. Integer justo elit, lacinia vel pretium auctor, consectetur id ex. Phasellus eget tempor nisl. Nulla et eros posuere, vestibulum velit eu, auctor ipsum. Sed vitae lacinia lacus. Cras pharetra interdum ante finibus ullamcorper. Donec non mollis neque, interdum consectetur odio.Sed viverra eu arcu cursus accumsan. Fusce mollis elementum tellus sed vulputate. Duis porta tristique bibendum. Nullam semper maximus velit ut tempus. Cras blandit, est non hendrerit ultrices, nisi massa vulputate erat, ut viverra ligula diam id nisl. Praesent suscipit feugiat lorem a mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec consequat diam id euismod egestas."
                conteudo={[
                        {titulo: "Metodologias desenvolvida por profissionais especializados"},
                        {titulo: "Metodologias inovadoras e 100% online"},
                        {titulo: "Certificado Digital"},
                        {titulo: "Aprenda a hora que quiser e no seu tempo"},
                        {titulo: "Mais de 80 cursos para você se especializar"},
                        {titulo: "Experimente áreas diferentes"}
                ]}
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