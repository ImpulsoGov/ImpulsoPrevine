import { TituloTexto } from "@impulsogov/design-system";
import { ToggleList } from "@impulsogov/design-system";
import { redirectHomeNotLooged } from "../../helpers/redirectHome";
import { getData } from '../../services/cms'
import { LAYOUT, FAQ } from '../../utils/QUERYS'

export async function getServerSideProps(ctx) {
  const userIsActive = ctx.req.cookies['next-auth.session-token']
  const userIsActiveSecure = ctx.req.cookies['__Secure-next-auth.session-token']
  let redirect = !userIsActive && !userIsActiveSecure 
  if(!redirect) {
    return {
      redirect: {
        destination: "/inicio",
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      }, 
    }
  }
  const res = [
    await getData(LAYOUT),
    await getData(FAQ),
  ]
  return {
    props: {
      res : res
    }
  }
}

const Index = () => {
  return (
    <>
      <TituloTexto
        imagem = {{
          posicao: null,
          url: ''
        }}
        titulo = "FAQ"
        texto = "Veja aqui as respostas para suas principais dúvidas"
        />
        <ToggleList
          title="Geral"
          list={[
            {
              title: 'Os produtos do Impulso Previne são gratuitos?',
              blocks: [
                {
                  subTitle: '',
                  description: 'Sim, todos os produtos do Impulso Previne são gratuitos. Na nossa área pública você encontra dados quadrimestralmente atualizados sobre os resultados dos indicadores de desempenho de todos os municípios no Previne Brasil, além dos dados de Capitação Ponderada e Incentivos a Ações Estratégicas. Atualizamos essa área do nosso site através dos dados públicos do SISAB (Sistema de Informação em Saúde para a Atenção Primária). Basta clicar no menu superior DADOS PÚBLICOS - Q3/22 e selecionar seu município. Na nossa área logada (acesso restrito), oferecemos produtos de monitoramento nominal para os municípios parceiros.',
                  source: '',
                },
              ],
            },
          ]}
        />
        <ToggleList
          title="Sobre a área logada"
          list={[
            {
              title: 'O que é a área logada (acesso restrito) do site do Impulso Previne?',
              blocks: [
                {
                  subTitle: '',
                  description: 'A área de acesso restrito do site é um espaço gratuito e exclusivo para municípios parceiros. Após a realização da parceria, temos acesso aos dados restritos dos municípios para oferecer produtos de tecnologia, como o monitoramento de usuários via listas nominais. A área logada pode ser utilizada pelas coordenações de equipe e pelas coordenações da APS.',
                  source: '',
                },
              ],
            },
            {
              title: 'O que é um município parceiro?',
              blocks: [
                {
                  subTitle: '',
                  description: 'A Impulso Gov oferece, através do Impulso Previne, um serviço de consultoria gratuita. Qualquer município pode se inscrever e entrar na lista de espera para participar. A cada novo ciclo, fazemos uma seleção, de acordo com alguns critérios, dos municípios que receberão esse serviço. Os municípios selecionados se tornam parceiros da Impulso Gov e ganham acesso à área logada do Impulso Previne.',
                  source: '',
                },
              ],
            },
            {
              title: 'Posso me tornar um município parceiro?',
              blocks: [
                {
                  subTitle: '',
                  description: 'Qualquer município pode se inscrever para ser nosso parceiro. Para isso, vá no menu superior CONSULTORIA e se inscreva na lista de espera. Se o seu município se encaixar nos critérios que estabelecemos, entraremos em contato para formalizar a parceria através de um acordo de cooperação técnica (ACT). Efetivada a parceria, ofereceremos ao seu município os outros produtos gratuitos do Impulso Previne que são restritos a parceiros.',
                  source: '',
                },
              ],
            },
          ]}
        />
        <ToggleList
          title="Sou município parceiro"
          list={[
            {
              title: 'Esqueci qual é o meu e-mail cadastrado',
              blocks: [
                {
                  subTitle: '',
                  description: 'Caso não se lembre do e-mail que nos forneceu para a criação do seu login e senha, entre em contato conosco pelo grupo de mensagens da Impulso Gov com o seu município que nós te reenviaremos o seu e-mail cadastrado.',
                  source: '',
                },
              ],
            },
            {
              title: 'Esqueci minha senha',
              blocks: [
                {
                  subTitle: '',
                  description: 'Caso não se lembre da senha cadastrada, você pode cadastrar uma nova senha diretamente da tela de login. Na parte superior do site https://www.impulsoprevine.org/, clique em “Acesso Restrito” e depois em “Esqueci minha senha”,  seguindo posteriormente os passos que aparecerão na tela.',
                  source: '',
                },
              ],
            },
            {
              title: 'Estou fazendo meu primeiro acesso como município parceiro e ainda não tenho uma senha',
              blocks: [
                {
                  subTitle: '',
                  description: 'Para realizar o seu primeiro acesso à área restrita, vá na parte superior do site https://www.impulsoprevine.org/ e clique em “Acesso Restrito”. Insira o e-mail que nos forneceu para a criação do seu cadastro e na tela seguinte clique em “Primeiro Acesso". Nós te enviaremos um código de validação para o seu e-mail cadastrado. Digite o código de validação que você receberá. Em seguida, crie sua senha e realize o login na área restrita.',
                  source: '',
                },
              ],
            },
          ]}
        />
    </>
  )
}

export default Index;