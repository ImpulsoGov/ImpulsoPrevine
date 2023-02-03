import { useState,useEffect } from 'react'
import { getData } from '../../utils/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { ModulosTrilha } from '@impulsogov/design-system'


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

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth ] = useState(undefined);
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
  
        window.addEventListener('resize', handleWindowResize);
        handleWindowResize()
        return () => window.removeEventListener('resize', handleWindowResize);
      
    },[]);
    return windowWidth;
  };
  

const Index = ({res}) => {
    const { data: session,status } = useSession()
    let width = useWindowWidth()
    return(
        <>
            <ModulosTrilha
                      tituloTrilha= "Hipertensão e Diabetes"
                      botaoVoltar= {{label: "VOLTAR",url:"/capacitacoes"}}
                      botaoWhatsapp= {{label: "ENTRAR NO GRUPO DO WHATSAPP",url:"/grupo-whatsapp"}}
                      modulos={[
                            {id: 1, titulo: "Introdução aos indicadores de Hipertensão e Diabetes na APS"},
                            {id: 2, titulo: "Qualificação do registro e monitoramento de dados"},
                            {id: 3, titulo: "Qualificação do cuidado"},
                            {id: 4, titulo: "Gestão de processos de trabalho"}
                      ]}
                      modulo={[
                            {id: 1, moduloID: 1, formato:"VIDEO", titulo:"Introdução sobre a Capacitação", concluido: true, link:"/conteudo"},
                            {id: 2, moduloID: 1, formato:"PPT", titulo:"Introdução ao Indicador de Hipertensão + Introdução ao Indicador de Diabetes", concluido: false, link:"/conteudo"},
                            {id: 3, moduloID: 1, formato:"PDF", titulo:"Introdução ao Previne Brasil", concluido: false, link:"/conteudo"},
                            {id: 4, moduloID: 1, formato:"QUIZ", titulo:"Quizz de avaliação desses conteúdos", concluido: false, link:"/conteudo"}
                      ]}
                      ultimoModulo = {1}
                      mobile= {width < 1023}
                
            />
        </>
    )
}

export default Index;
