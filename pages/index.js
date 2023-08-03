import { FormConsultoria, 
  TituloSmallTexto, 
  ParceriasTexto ,
  CardIP, 
  Grid12Col, 
  NovoTituloTexto,
  ImagensFull2
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
      {/* <div style={{paddingTop:80}}></div> */}
      <div style={{paddingTop:100, textAlign:"center", paddingBottom:150, paddingLeft:80, paddingRight:80}}>
        <div style={{maxWidth:1000, textAlign:"center"}}>
          <NovoTituloTexto
            titulo="Ajudamos profissionais do SUS na gestão da atenção primária"
            texto="Somos parte de uma organização não governamental financiada por entidades filantrópicas para desenvolver a saúde pública <b>de forma totalmente gratuita.</b>"
          />
        </div>
        <div style={{paddingTop:75}}></div>
        <ImagensFull2 imagem="https://media.graphassets.com/E153wwplTJe02eMPPMip" />
      </div>
      <ParceriasTexto
          text = "“A ImpulsoGov, uma organização sem fins lucrativos que atua fomentando uso de dados e tecnologia na gestão pública, tem apoiado gratuitamente municípios na melhoria de seus processos…”"
          parceiros = {[{"alt": "folha","src": "https://media.graphassets.com/07YT7KxzQR6zW8LR4qOM"}]}
      />
      <div style={{paddingTop:150, paddingBottom:150, paddingLeft:80, paddingRight:80}}>
          <TituloSmallTexto
            botao={{label: '',url: ''}}
            imagem={{posicao: null,url: ''}}
            supertitulo=""
            titulo="<b>Suporte para coordenação e assistência da APS</b>"
            texto="Melhore a atuação da sua unidade e do seu município com:"
          />
          <Grid12Col
            proporcao="7-5"
            items={ [
              <ImagensFull2 key={ uuidv1() } imagem="https://media.graphassets.com/2ygpjbc4T2yPmyMOfvKD" />,
              <><div style={{alignContent:"center"}}>
                  <TituloSmallTexto
                    key={ uuidv1() }
                    botao={{label: 'VER DESEMPENHO DOS MUNICÍPIOS',url: '/analise'}}
                    imagem={{posicao: null,url: ''}}
                    supertitulo="<b>Análises do Previne</b>"
                    titulo=""
                    texto="Veja o desempenho de qualquer município nas categorias do Previne Brasil e sugestões para alcançar as metas definidas.<br><br>"
                  />
                </div></>,
            ] }
          />
          <Grid12Col
            proporcao="5-7"
            items={ [
              <TituloSmallTexto
                key={ uuidv1() }
                botao={{label: 'VER MATERIAIS',url: '/blog'}}
                imagem={{posicao: null,url: ''}}
                supertitulo="<b>Conteúdos gratuitos</b>"
                titulo=""
                texto="Confira informações atualizadas sobre atenção primária à saúde nos artigos do nosso blog e em nossas capacitações.<br><br>"
              />,
              <ImagensFull2 key={ uuidv1() } imagem="https://media.graphassets.com/2ygpjbc4T2yPmyMOfvKD" />
            ] }
          />
          <Grid12Col
            proporcao="7-5"
            items={ [
              <ImagensFull2 key={ uuidv1() } imagem="https://media.graphassets.com/2ygpjbc4T2yPmyMOfvKD" />,
              <TituloSmallTexto
                key={ uuidv1() }
                botao={{label: 'SER MUNICÍPIO PARCEIRO',url: '/consultoria'}}
                imagem={{posicao: null,url: ''}}
                supertitulo="<b>Mentorias exclusivas</b>"
                titulo=""
                texto="Seja nosso parceiro para receber apoio especializado da nossa equipe e treinamentos focados nos seus desafios.<br/><br/>"
              />
            ] }
          />
          
          <div style={{paddingTop:150}}></div>
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
                    titulo="<b>Somos uma rede com</b>"
                    texto=""
                  />
                </>,
                <CardIP
                  key={ uuidv1() }
                  titulo=""
                  indicador="+12 mil profissionais"
                  descricao="que recebem dicas semanais sobre APS"
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
                  descricao="apoiados diretamente por especialistas"
                />
              ] }
            />
          <div style={{paddingTop:75}}></div>
          <TituloSmallTexto
            key={ uuidv1() }
            botao={{label: '',url: ''}}
            imagem={{posicao: null,url: ''}}
            supertitulo=""
            titulo="<b>Resultados na prática</b>"
            texto=""
          />
          <Grid12Col
              proporcao="6-6"
              items={ [
                <CardIP
                  key={ uuidv1() }
                  titulo="PARCEIRO DESDE 2022"
                  indicador="Brejo de Areia/MA"
                  descricao="O uso das ferramentas nas reuniões de gestão ajudou os coordenadores a identificar pendências e rendeu no 1º quadrimestre de 2023 um resultado 35% melhor que seus 4 municípios vizinhos."
                />,
                <CardIP
                  key={ uuidv1() }
                  titulo="PARCEIRO DESDE 2022"
                  indicador="Minaçu/GO"
                  descricao="Com apoio da nossa equipe de especialistas em saúde, no 3º quadrimestre de 2022, o município obteve o primeiro lugar na Regional Norte de Goiás no ranking do Previne Brasil!"
                />
              ] }
            />
          
          <div style={{paddingTop:150}}></div>
          <Grid12Col
              proporcao="6-6"
              items={ [
                <ImagensFull2 key={ uuidv1() } imagem="https://media.graphassets.com/TxOWmwUSBOO1fnpZfRlu" />,
                <TituloSmallTexto
                  key={ uuidv1() }
                  botao={{label: 'CONHECER MAIS DA IMPULSOGOV',url: 'https://impulsogov.org/'}}
                  imagem={{posicao: null,url: ''}}
                  supertitulo=""
                  titulo="<b>Impulsionamos o SUS com tecnologia</b>"
                  texto="Na ImpulsoGov, acreditamos que tecnologia deve facilitar o dia a dia da profissional do SUS e permitir que ela foque naquilo que importa: o cuidado oferecido às pessoas.<br/><br/>O Impulso Previne é um de seus projetos e foca nos critérios do Previne Brasil, o atual modelo de financiamento da atenção primária à saúde no Brasil.<br/><br/>"
                />
              ] }
            />
      </div>
      
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
