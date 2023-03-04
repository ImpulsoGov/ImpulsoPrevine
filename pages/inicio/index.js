import { getData, getDataCapacitacao } from '../../services/cms'
import { LAYOUT, CONTEUDOS_TRILHAS } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { Greeting, CardTrilha, CardLargeGrid} from '@impulsogov/design-system'
import { progresso } from '../../helpers/modulosDataTransform'
import { useEffect, useState } from 'react'

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
        await getDataCapacitacao(CONTEUDOS_TRILHAS)
    ]
    return {
        props: {
        res : res
        }
    }
}


const Index = ({res}) => {
    const { data: session,status } = useSession()
    const [data,setData] = useState(false)
    const ProgressoClient = async()=> await progresso(res[1].trilhas,session?.user?.id,session?.user?.access_token)
    useEffect(()=>{
        session && res && 
        ProgressoClient().then((response)=>{
        setData(response)
    })},[session]) 
    const cargo_transform = (cargo)=>{
        if (cargo == "Coordenação de APS") return "coordenador(a) da APS"
        if (cargo == "Coordenação de Equipe") return "coordenador(a) de equipe"
        if (cargo == "Impulser") return cargo
    }
    const cargo = cargo_transform(session?.user?.cargo)
    if (session){
        return(
            <>
                <Greeting
                    cargo = {cargo}
                    greeting = "Bem vindo(a)"
                    municipio_uf = {session?.user.municipio}
                    nome_usuario = {session?.user.nome}
                    texto = "Você está na área logada da Coordenação da APS do seu município. Aqui você vai encontrar um painel com as listas nominais para monitoramento e os possíveis cadastros duplicados de gestantes, referentes aos indicadores de gestantes, hipertensão e diabetes, do Previne Brasil."
                />
                {
                    data &&
                    <CardTrilha
                        titulo="Trilha de Capacitação: Hipertensão e Diabetes"
                        progressao={data[0].progresso }
                        linkTrilha={data[0].progresso>0 ? "/capacitacao?trilhaID="+res[1].trilhas[0].id : 'conteudo-programatico'}
                    />
                }
                <CardLargeGrid
                    cards={[
                        {
                            icon: 'https://media.graphassets.com/jo1S3VXcTCyTFw4Ke697',
                            links: [
                                {
                                    label: 'Pré-Natal',
                                    link: '/busca-ativa?initialTitle=0&painel=0'
                                },
                            ],
                            texto: 'Oferecemos três listas nominais para monitoramento dos seguintes grupos: gestantes, pessoas com hipertensão e pessoas com diabetes. As listas auxiliam no acompanhamento dos indicadores do Previne Brasil relacionados a esses grupos.',
                            titulo: 'Listas Nominais'
                        },
                        {
                            icon: 'https://media.graphassets.com/6cOfkxeyT7245Fn19kgU',
                            links: [
                                {
                                label: 'Gestantes',
                                link: '/cadastros-duplicados?initialTitle=0&painel=0'
                                },
                            ],
                            texto: 'Aqui você encontrará uma lista nominal de possíveis cadastros duplicados de gestantes. Com esta lista você poderá rapidamente identificar estes casos de possíveis duplicações e regularizá-los.',
                            titulo: 'Cadastros Duplicados'
                        }
                    ]}
                    obs="Para sair da área logada, basta ir no seu usuário no menu superior e clicar em ‘SAIR’."
                    theme= "ColorIP"
                    />
            </>
        )
    }
}

export default Index;