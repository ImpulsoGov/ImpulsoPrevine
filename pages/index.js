import { 
  FormConsultoria, 
  TituloSmallTexto, 
  ParceriasTexto ,
  CardIP, 
  Grid12Col, 
  NovoTituloTexto,
  ImagensFull2,
  Margem,
  ModalAlert,
  Alert,
} from "@impulsogov/design-system";
import { v1 as uuidv1 } from "uuid";


import { getData } from '../services/cms'
import { LAYOUT, HOME } from '../utils/QUERYS'

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
    await getData(HOME),
  ]
  return {
    props: {
      res : res
    }
  }
}

const Parceiros = (res)=>{
  const parceiros = res.map((logo)=>{
    return(
        {
            alt: logo.fileName,
            src: logo.url
        }
    )
  }).reverse()
  return parceiros
}



const Index = ({res}) => {
  return (
    <div style={{backgroundColor: "#E6ECF0"}}>
      <ModalAlert
        Child = {Alert}
        childProps = {{
          titulos : {
              Titulo : "Vacinação Infantil",
              SubTitulo : "Capacitação sobre o Previne Brasil:"
          },
          Info : [
              {
                  icon : "https://media.graphassets.com/mK0XWA2qSyK3tSPER5SM",
                  info : "23/08"
              },
              {
                  icon : "https://media.graphassets.com/Bsq3OasQQxWNFuN0Ldhs",
                  info : "19hs"
              },
              {
                  icon : "https://media.graphassets.com/wb3wQPKRQY6o1Mb7pLzE",
                  info : "Online"
              },
              {
                  icon : "https://media.graphassets.com/Ui2qHF9IR9WyqEQv8H1v",
                  info : "Gratuito"
              },
          ],
          cardProfissional : {
              profissional : "https://media.graphassets.com/2sqDyLFbTJylgJKYorEy",
              logo : "https://media.graphassets.com/et6MBNobT9OA39JxsjNi",
              nome : "Isabela dos Santos",
              cargo : "Especialista em Saúde Coletiva"
          },
          botao : {
              label : "QUERO ME INSCREVER",
              url : "https://bit.ly/inscricao-webinar-14"
          }
        }
        }
      />
      <Margem 
        componente={
          <>
            <div style={{paddingTop:80}}></div>
            <NovoTituloTexto
              titulo="Ajudamos profissionais do SUS na gestão da atenção primária"
              texto="O Impulso Previne é uma iniciativa realizada pela ImpulsoGov, uma organização não governamental sem fins lucrativos que apoia municípios na gestão da saúde pública <b>de forma totalmente gratuita.</b>"
            />
            <div style={{paddingTop:75}}></div>
            <ImagensFull2 imagem="https://media.graphassets.com/xGxFkzz9Q5eTik6An7uJ" />
            <div style={{paddingTop:75}}></div>
          </>
        } 
      />
      <ParceriasTexto
          text = "“A ImpulsoGov, uma organização sem fins lucrativos que atua fomentando uso de dados e tecnologia na gestão pública, tem apoiado gratuitamente municípios na melhoria de seus processos…”"
          parceiros = {[{"alt": "folha","src": "https://media.graphassets.com/07YT7KxzQR6zW8LR4qOM"}]}
      />
      
      <Margem 
        componente={
          <>
            <div style={{paddingTop:75}}></div>
              <TituloSmallTexto
                botao={{label: '',url: ''}}
                imagem={{posicao: null,url: ''}}
                supertitulo=""
                titulo="<b>Suporte para coordenação e assistência da APS</b>"
                texto="Melhore a atuação da sua unidade de saúde e do seu município com:"
              />
            <Grid12Col
            proporcao="7-5"
            items={ [
              <ImagensFull2 key={ uuidv1() } imagem="https://media.graphassets.com/55Ovc152SoahfSNlqFIZ" />,
              <><div style={{alignContent:"center"}}>
                  <TituloSmallTexto
                    key={ uuidv1() }
                    botao={{label: 'VER DESEMPENHO DOS MUNICÍPIOS',url: '/analise'}}
                    imagem={{posicao: null,url: ''}}
                    supertitulo="<b>Análises do Previne</b>"
                    titulo=""
                    texto="Veja o desempenho de qualquer município nos componentes do Previne Brasil e sugestões para alcançar as metas definidas.<br><br>"
                  />
                </div></>,
            ] }
          />
          <Grid12Col
            proporcao="5-7"
            items={ [
              <TituloSmallTexto
                key={ uuidv1() }
                botao={{label: 'SER MUNICÍPIO PARCEIRO',url: '/consultoria'}}
                imagem={{posicao: null,url: ''}}
                supertitulo="<b>Mentorias exclusivas</b>"
                titulo=""
                texto="Informações sempre atualizadas sobre atenção primária à saúde diretamente por e-mail, no nosso blog e em nossas capacitações.<br/><br/>"
              />,
              <ImagensFull2 key={ uuidv1() } imagem="https://media.graphassets.com/myRTKSALRUChuOhlEnQT" />
            ] }
          />
          <Grid12Col
            proporcao="7-5"
            items={ [
              <ImagensFull2 key={ uuidv1() } imagem="https://media.graphassets.com/kuiOKdlR5iR2nFrnAjsk" />,
              <TituloSmallTexto
                key={ uuidv1() }
                botao={{label: 'VER MATERIAIS',url: '/blog'}}
                imagem={{posicao: null,url: ''}}
                supertitulo="<b>Conteúdos gratuitos</b>"
                titulo=""
                texto="Seja nosso(a) parceiro(a) para receber apoio especializado da nossa equipe e treinamentos focados nos desafios do seu município.<br><br>"
              />
            ] }
          />
          
          <div id="espaco150"></div>
          </>
        } 
      />

      <Margem 
        componente={
          <>
            <Grid12Col
              proporcao="3-3-3-3"
              items={ [
                <>
                  <ImagensFull2 key={ uuidv1() } imagem="https://media.graphassets.com/0SldadgShetVZtLRwCpE" />
                  <TituloSmallTexto
                    key={ uuidv1() }
                    botao={{label: '',url: ''}}
                    imagem={{posicao: null,url: ''}}
                    supertitulo=""
                    titulo="<b>Nós somos uma rede!</b>"
                    texto=""
                  />
                </>,
                <CardIP
                  key={ uuidv1() }
                  titulo=""
                  indicador="+12 mil profissionais do SUS"
                  descricao="recebem dicas semanais sobre APS"
                />,
                <CardIP
                  key={ uuidv1() }
                  titulo=""
                  indicador="+300 gestores"
                  descricao="usam diariamente nossas ferramentas"
                />,
                <CardIP
                  key={ uuidv1() }
                  titulo=""
                  indicador="+70 municípios"
                  descricao="são apoiados diretamente por especialistas"
                />
              ] }
            />
            <div style={{paddingTop:75}}></div>
            <Grid12Col
                proporcao="6-6"
                items={ [
                  <TituloSmallTexto
                    key={ uuidv1() }
                    botao={{label: '',url: ''}}
                    imagem={{posicao: null,url: ''}}
                    supertitulo=""
                    titulo="<b>Estamos fazendo a diferença nos municípios</b>"
                    texto=""
                  />,
                  <></>,
                  <CardIP
                    key={ uuidv1() }
                    titulo="PARCEIRO DESDE 2022"
                    indicador="Brejo de Areia/MA"
                    descricao="O uso das ferramentas nas reuniões de gestão ajudou os coordenadores a identificar pendências e gerou  um resultado 35% melhor que seus 4 municípios vizinhos no 1º quadrimestre de 2023."
                  />,
                  <CardIP
                    key={ uuidv1() }
                    titulo="PARCEIRO DESDE 2022"
                    indicador="Minaçu/GO"
                    descricao="Com apoio da nossa equipe de especialistas em saúde, o município obteve o primeiro lugar na Regional Norte de Goiás no ranking do Previne Brasil no 3º quadrimestre de 2022!"
                  />
                ] }
              />
            <div id="espaco150" ></div>
          </>
        } 
      />

      <Margem 
        componente={
          <>
            <Grid12Col
              proporcao="6-6"
              items={ [
                <ImagensFull2 key={ uuidv1() } imagem="https://media.graphassets.com/TxOWmwUSBOO1fnpZfRlu" />,
                <TituloSmallTexto
                  key={ uuidv1() }
                  botao={{label: 'CONHECER MAIS DA IMPULSOGOV',url: 'https://impulsogov.org/'}}
                  imagem={{posicao: null,url: ''}}
                  supertitulo=""
                  titulo="<b>Impulsionamos o SUS com dados e tecnologia</b>"
                  texto="Na ImpulsoGov, acreditamos que os dados são necessários para facilitar a tomada de decisões e a tecnologia deve facilitar o dia a dia da profissional do SUS e permitir que ela foque naquilo que importa: o cuidado oferecido às pessoas.<br/><br/>
                  O Impulso Previne é um projeto da ImpulsoGov focado em promover o uso de dados e indicadores na gestão da atenção primária, com destaque para o Previne Brasil, atual modelo de financiamento federal da APS no Brasil <br/><br/>"
                />
              ] }
            />
            <div style={{paddingTop:75}}></div>
          </>
        } 
      />
      
      <FormConsultoria
          title="Faça parte da nossa lista de transmissão e receba toda semana em seu e-mail dicas e atualizações sobre indicadores, portarias, registro e boas práticas na APS."
          mail=""
          link="https://www.impulsoprevine.org/manual-impulso-previne"
          button="Fazer inscrição na lista"
          theme="IPVerde"
      />
    </div>
  )
}

export default Index;
