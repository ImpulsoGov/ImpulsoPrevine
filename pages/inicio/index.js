import { getData } from '../../services/cms'
import { LAYOUT } from '../../utils/QUERYS'
import { useSession } from "next-auth/react"
import { Greeting, CardAlert, CardLargeGrid} from '@impulsogov/design-system'


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
    const cargo_transform = (cargo)=>{
        if (cargo == "Coordenação de APS") return "coordenador(a) da APS"
        if (cargo == "Coordenação de Equipe") return "coordenador(a) de equipe"
        if (cargo == "Impulser") return cargo
    }
    const cargo = cargo_transform(session?.user?.cargo)
    if (session){
        return (
            <>
                <Greeting
                    cargo = {cargo}
                    greeting = "Bem vindo(a)"
                    municipio_uf = {session?.user.municipio}
                    nome_usuario = {session?.user.nome}
                    texto = "Você está na área logada da Coordenação da APS do seu município. Aqui você vai encontrar um painel com as listas nominais para monitoramento e os possíveis cadastros duplicados de gestantes, referentes aos indicadores de gestantes, hipertensão e diabetes, do Previne Brasil."
                />
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
                />
            </>
        )
    }
}

export default Index;