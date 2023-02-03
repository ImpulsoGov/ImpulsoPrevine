import { getData } from '../../utils/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { TituloTexto, CardTrilha } from '@impulsogov/design-system'


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
            <TituloTexto
                titulo="Trilhas de Capacitação"
                texto="Você está na área logada da Coordenação da APS do seu município. Aqui você vai encontrar um painel de cadastros duplicados, listas nominais para monitoramento, referentes a cada um dos indicadores do Previne Brasil."
                imagem = {{posicao: null,url: ''}}
            />
            <CardTrilha
                titulo="Hipertensão e Diabetes"
                progressao={0}
                linkTrilha="/capacitacao"
                linkSobre="/conteudo-programatico"
            />
        </>
    )
}

export default Index;