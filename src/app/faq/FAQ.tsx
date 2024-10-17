'use client'
import { TituloTexto,ToggleList } from "@impulsogov/design-system";

export const FAQ = () => {
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
                  title: 'Nossos produtos são gratuitos?',
                  blocks: [
                    {
                      subTitle: '',
                      description: 'Sim, todos os produtos e serviços oferecidos pela ImpulsoGov são 100% gratuitos. Hoje nós temos em nosso site dados públicos de qualquer município do Brasil com informações sobre os indicadores do antigo Previne Brasil. Já para os nossos municípios parceiros, criamos uma ferramenta de monitoramento nominal automática para que os gestores possam acompanhar seus pacientes com consultas, exames e procedimentos em atraso.',
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
                      description: 'A ImpulsoGov oferece, através do Impulso Previne, um serviço de mentorias gratuita. O(A) Coordenador(a) de Atenção Primária à Saúde (APS) ou Secretário(a) de Saúde de qualquer município pode se inscrever e entrar na lista de espera para participar. A cada novo ciclo, fazemos uma seleção de novos municípios parceiros que participam de mentorias especializadas com nossa equipe e ganham acesso às ferramentas de monitoramento nominal na área logada do nosso site.',
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