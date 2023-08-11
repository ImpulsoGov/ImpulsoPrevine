import { TituloTexto,
  Slider,
  FormConsultoria, 
  ToggleList,
  TituloSmallTexto, 
  ParceriasTexto ,
  CardIP, 
  Grid12Col, 
  NovoTituloTexto,
  ImagensFull2
} from "@impulsogov/design-system";
import { v1 as uuidv1 } from "uuid";

import { sliderCardsDataTransform } from "../../helpers/slidersDataTransform";
import { getData } from '../../services/cms'
import { LAYOUT, CONSULTORIA} from '../../utils/QUERYS'

export async function getServerSideProps({req}) {
  let redirect 
  const userIsActive = req.cookies['next-auth.session-token']
  const userIsActiveSecure = req.cookies['__Secure-next-auth.session-token']
  if(userIsActive){
    redirect=true
  }else{
      if(userIsActiveSecure){redirect=true}else{redirect=false}
  }
  if(redirect) {
    return {
      redirect: {
        destination: "/inicio",
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      }, 
    }
  }
  const res = [
    await getData(LAYOUT),
    await getData(CONSULTORIA),
  ]
  return {
    props: {
      res : res
    }
  }
}


const Index = ({res}) => {
  return (
    <div style={{backgroundColor: "#E6ECF0"}}>
      <div style={{paddingTop:100, paddingBottom:150, paddingLeft:80, paddingRight:80}}>
        <NovoTituloTexto
          titulo="Seja um município parceiro para receber apoio especializado"
          texto="A cada 3 meses, selecionamos um grupo de municípios para um ciclo de mentorias gratuitas com nosso time de especialistas em saúde pública."
        />
        <div style={{paddingTop:75}}></div>
        <ImagensFull2 imagem="https://media.graphassets.com/E153wwplTJe02eMPPMip" />
        <div style={{paddingTop:150}}></div>
        <NovoTituloTexto
          titulo="Melhore o seu desempenho nos componentes do Previne Brasil"
          texto="Desenvolvemos formas de facilitar as atividades que influenciam nos critérios do modelo de financiamento da atenção primária à saúde."
        />
        <div style={{paddingTop:50}}></div>
        <Grid12Col
          proporcao="6-6"
          items={ [
            <>
            <TituloSmallTexto
              key={ uuidv1() }
              botao={{label: '',url: ''}}
              imagem={{posicao: true, url: 'https://media.graphassets.com/M7BvFZfZT62J6SnO3hlr'}}
              supertitulo="<b>Ferramentas de gestão para acelerar o monitoramento nominal e a busca ativa"
              titulo=""
              texto="Gere automaticamente a lista de pacientes com consultas e exames pendentes por área de referência para direcionar as visitas do seu agente comunitário."
            />
            <TituloSmallTexto
              key={ uuidv1() }
              botao={{label: '',url: ''}}
              imagem={{posicao: null, url: ''}}
              supertitulo="<b>Treinamentos exclusivos sobre boas práticas nos indicadores e capitação ponderada"
              titulo=""
              texto="Veja materiais de apoio sobre os indicadores e tenha à disposição para consultar quantas vezes quiser todas as informações sobre regras, registro e estratégias de cuidado."
            />
            <TituloSmallTexto
              key={ uuidv1() }
              botao={{label: '',url: ''}}
              imagem={{posicao: null, url: ''}}
              supertitulo="<b>Encontros de capacitação com dicas e troca de experiências entre municípios"
              titulo=""
              texto="Participe de reuniões com nosso time de sanitaristas para revisar conteúdos importantes e converse com a rede de municípios parceiros da ImpulsoGov."
            />
            </>
            ,
            <>
              <ImagensFull2 imagem="https://media.graphassets.com/E153wwplTJe02eMPPMip" />
            </>
          ] }
        />
        <div style={{paddingTop:50}}></div>
        <Grid12Col
          proporcao="6-6"
          items={ [
            <>
            <TituloSmallTexto
                key={ uuidv1() }
                botao={{label: '',url: 'https://impulsogov.org/'}}
                imagem={{posicao: null, url: 'https://media.graphassets.com/RfAzQFuVRhsuaPFSaMHg'}}
                supertitulo=""
                titulo="<b>Mais de 70 municípios já foram apoiados diretamente pelo Impulso Previne</b>"
                texto="Com o nosso apoio, ajudamos a construir histórias de sucesso<br>"
              />
              </>
            ,
            <>
            <CardIP
              key={ uuidv1() }
              titulo="PARCEIRO DESDE 2022"
              indicador="Brejo de Areia/MA"
              descricao="O uso das ferramentas nas reuniões de gestão ajudou os coordenadores a identificar pendências e rendeu no 1º quadrimestre de 2023 um resultado 35% melhor que seus 4 municípios vizinhos."
              height={210}
            />
            <CardIP
              key={ uuidv1() }
              titulo="PARCEIRO DESDE 2022"
              indicador="Minaçu/GO"
              descricao="Com apoio da nossa equipe de especialistas em saúde, no 3º quadrimestre de 2022, o município obteve o primeiro lugar na Regional Norte de Goiás no ranking do Previne Brasil!"
              height={210}
            />
            </>
          ] }
        />
        <div style={{paddingTop:150}}></div>
        <NovoTituloTexto
          titulo="Siga o passo-a-passo e faça parte da nossa rede"
          texto="Confira as etapas necessárias para formalizar a sua parceria com o Impulso Previne."
        />
        <Grid12Col
          proporcao="6-6"
          items={ [
            <TituloSmallTexto
                key={ uuidv1() } botao={{label: '',url: ''}} imagem={{posicao: null, url: ''}}
                supertitulo="<b>1. Formulário de inscrição"
                titulo=""
                texto="O Coordenador de Atenção Primária à Saúde do município deve preenchê-lo com as principais informações sobre o município."
              />,
            <TituloSmallTexto
                key={ uuidv1() } botao={{label: '',url: ''}} imagem={{posicao: null, url: ''}}
                supertitulo="<b>2. Convite para municípios"
                titulo=""
                texto="No próximo ciclo de mentorias, a equipe do Impulso Previne entra em contato com os municípios selecionados por e-mail."
              />,
              <TituloSmallTexto
                key={ uuidv1() } botao={{label: '',url: ''}} imagem={{posicao: null, url: ''}}
                supertitulo="<b>3. Reunião de apresentação"
                titulo=""
                texto="Realizamos um encontro inicial para apresentação do programa e detalhamento do nosso acordo de cooperação técnica"
              />,
              <TituloSmallTexto
                key={ uuidv1() } botao={{label: '',url: ''}} imagem={{posicao: null, url: ''}}
                supertitulo="<b>4. Parceria formada</b>"
                titulo=""
                texto="O Coordenador de Atenção Primária à Saúde do município deve preenchê-lo com as principais informações sobre o município"
              />,
          ] }
        />
      </div>
      <FormConsultoria
          title="Inscreva-se e melhore o desempenho do seu município na atenção primária"
          mail=""
          link="https://www.impulsoprevine.org/manual-impulso-previne"
          button="Preencher inscrição"
          theme="IPVerde"
      />
      <ToggleList
        title="<strong>Dúvidas sobre a parceria da Impulso com os municípios?</strong>"
        list={[
          {
            title: 'Geral',
            blocks: [
              {
                subTitle: 'Os produtos do Impulso Previne são gratuitos?',
                description: 'Sim, todos os produtos do Impulso Previne são gratuitos. Na nossa área pública você encontra dados quadrimestralmente atualizados sobre os resultados dos indicadores de desempenho de todos os municípios no Previne Brasil, além dos dados de Capitação Ponderada e Incentivos a Ações Estratégicas. Atualizamos essa área do nosso site através dos dados públicos do SISAB (Sistema de Informação em Saúde para a Atenção Primária). Basta clicar no menu superior DADOS PÚBLICOS - Q3/22 e selecionar seu município. Na nossa área logada (acesso restrito), oferecemos produtos de monitoramento nominal para os municípios parceiros.',
                source: '',
              },
            ],
          },
          {
            title: 'Sobre a área logada',
            blocks: [
              {
                subTitle: 'O que é a área logada (acesso restrito) do site do Impulso Previne?',
                description: 'A área de acesso restrito do site é um espaço gratuito e exclusivo para municípios parceiros. Após a realização da parceria, temos acesso aos dados restritos dos municípios para oferecer produtos de tecnologia, como o monitoramento de usuários via listas nominais. A área logada pode ser utilizada pelas coordenações de equipe e pelas coordenações da APS.',
                source: '',
              },
              {
                subTitle: 'O que é um município parceiro?',
                description: 'A Impulso Gov oferece, através do Impulso Previne, um serviço de consultoria gratuita. Qualquer município pode se inscrever e entrar na lista de espera para participar. A cada novo ciclo, fazemos uma seleção, de acordo com alguns critérios, dos municípios que receberão esse serviço. Os municípios selecionados se tornam parceiros da Impulso Gov e ganham acesso à área logada do Impulso Previne.',
                source: '',
              },
              {
                subTitle: 'Posso me tornar um município parceiro?',
                description: 'Qualquer município pode se inscrever para ser nosso parceiro. Para isso, vá no menu superior CONSULTORIA e se inscreva na lista de espera. Se o seu município se encaixar nos critérios que estabelecemos, entraremos em contato para formalizar a parceria através de um acordo de cooperação técnica (ACT). Efetivada a parceria, ofereceremos ao seu município os outros produtos gratuitos do Impulso Previne que são restritos a parceiros.',
                source: '',
              },
            ],
          },
          {
            title: 'Sou município parceiro',
            blocks: [
              {
                subTitle: 'Esqueci qual é o meu e-mail cadastrado',
                description: 'Caso não se lembre do e-mail que nos forneceu para a criação do seu login e senha, entre em contato conosco pelo grupo de mensagens da Impulso Gov com o seu município que nós te reenviaremos o seu e-mail cadastrado.',
                source: '',
              },
              {
                subTitle: 'Esqueci minha senha',
                description: 'Caso não se lembre da senha cadastrada, você pode cadastrar uma nova senha diretamente da tela de login. Na parte superior do site https://www.impulsoprevine.org/, clique em “Acesso Restrito” e depois em “Esqueci minha senha”,  seguindo posteriormente os passos que aparecerão na tela.',
                source: '',
              },
              {
                subTitle: 'Estou fazendo meu primeiro acesso como município parceiro e ainda não tenho uma senha',
                description: 'Para realizar o seu primeiro acesso à área restrita, vá na parte superior do site https://www.impulsoprevine.org/ e clique em “Acesso Restrito”. Insira o e-mail que nos forneceu para a criação do seu cadastro e na tela seguinte clique em “Primeiro Acesso". Nós te enviaremos um código de validação para o seu e-mail cadastrado. Digite o código de validação que você receberá. Em seguida, crie sua senha e realize o login na área restrita.',
                source: '',
              },
            ],
          },
        ]}
      />
  </div>
  )
}

export default Index;
