import { getData } from '../../utils/cms'
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
    const cargo = (usuario)=>{
        if (usuario.cargo == "Coordenação APS") return "coordenador(a) da APS"
        if (usuario.cargo == "Coordenação de Equipe") return "coordenador(a) de equipe"
        if (usuario.cargo == "Impulser") return usuario.cargo
    }
    if (session){
        return (
            <>
                <Greeting
                    cargo = {cargo(session.user)}
                    greeting = "Bem vindo(a)"
                    municipio_uf = {session.user.municipio}
                    nome_usuario = {session.user.nome}
                    texto = "Você está na área logada da Coordenação da APS do seu município. Aqui você vai encontrar um painel com uma lista de possíveis cadastros duplicados de gestantes e listas nominais para monitoramento, referentes aos indicadores de gestantes, hipertensão e diabetes, do Previne Brasil."
                />
                <CardAlert
                    destaque="IMPORTANTE: "
                    msg="Os dados exibidos nesta plataforma refletem a base de dados local do município e podem divergir dos divulgados quadrimestralmente pelo SISAB. O Ministério da Saúde aplica regras de vinculação e validações cadastrais do usuário, profissional e estabelecimento que não são replicadas nesta ferramenta."
                />   
                <CardLargeGrid
                    cards={[
                        {
                        icon: 'https://media.graphassets.com/6cOfkxeyT7245Fn19kgU',
                        links: [
                            {
                                label: 'Pré-Natal',
                                link: '/busca-ativa?initialTitle=0&painel=0'
                            },
                        ],
                        texto: '',
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
                        texto: '',
                        titulo: 'Cadastros Duplicados'
                        }
                    ]}
                />
                <p>Para sair da área logada, basta ir no seu usuário no menu superior e clicar em ‘SAIR’.</p>         
            </>
        )
    }
}

export default Index;