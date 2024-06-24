import { TituloTexto,
  Margem,
  FormConsultoria, 
  ToggleList,
  TituloSmallTexto, 
  ParceriasTexto ,
  Slider, 
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
    <Margem 
      componente={
        <>
          <Margem 
            componente={
              <>
                <div style={{paddingTop:80}}></div>
                <NovoTituloTexto
                  titulo="Seja um município parceiro para receber apoio especializado"
                  texto="A cada 3 meses, selecionamos um grupo de municípios para um ciclo de mentorias gratuitas com nosso time de especialistas em saúde pública."
                />
                <div style={{paddingTop:75}}></div>
                <ImagensFull2 imagem="https://media.graphassets.com/FfVjftkQ3SyAspy1BUaE" />
            </>
            } 
            />          
          <div id="espaco150"></div>
          <Margem 
            componente={
              <>
              <NovoTituloTexto
                titulo="Melhore o desempenho do seu município na atenção primária"
                texto="Desenvolvemos formas de facilitar as atividades de rotina dos profissionais da gestão e da assistência que atuam na atenção básica do SUS."
              />
            </>
            } 
          />
          <div style={{paddingTop:50}}></div>
          <Grid12Col
            proporcao="5-7"
            items={ [
              <>
              <img src="https://media.graphassets.com/jIO4zsZmQsOPprUPJyGi"></img>
              <TituloSmallTexto
                key={ uuidv1() }
                botao={{label: '',url: ''}}
                imagem={{posicao: true, width: '45px', url: 'https://media.graphassets.com/M7BvFZfZT62J6SnO3hlr'}}
                supertitulo="<b>Ferramentas de gestão para acelerar o monitoramento nominal e a busca ativa"
                titulo=""
                texto="Gere automaticamente a lista de pacientes com consultas e exames pendentes por equipe de referência para direcionar as visitas do seu agente comunitário de saúde."
              />
              <div style={{paddingTop:30}}></div>
              <img src="https://media.graphassets.com/JLbMSywjQniTURPqAgep"></img>
              <TituloSmallTexto
                key={ uuidv1() }
                botao={{label: '',url: ''}}
                imagem={{posicao: null, url: ''}}
                supertitulo="<b>Encontros de capacitação com dicas e troca de experiências entre municípios"
                titulo=""
                texto="Participe de reuniões com nosso time de sanitaristas para revisar conteúdos importantes e converse com a rede de municípios parceiros do Impulso Previne."
              />
              <div style={{paddingTop:15}}></div>
              <img src="https://media.graphassets.com/FEyQQyfR0aCU7XN5IvnJ"></img>
              <TituloSmallTexto
                key={ uuidv1() }
                botao={{label: '',url: ''}}
                imagem={{posicao: null, url: ''}}
                supertitulo="<b>Treinamentos sobre as principais linhas de cuidado da atenção primária"
                titulo=""
                texto="Veja materiais de apoio sobre gestantes, doenças crônicas, exame citopatológico e cadastro com informações sobre regras, registros e estratégias de cuidado à disposição para consultar quantas vezes quiser."
              />
              </>
              ,
              <>
                <ImagensFull2 imagem="https://media.graphassets.com/aZ5H3ZMjSD88BUdxvMBq" />
              </>
            ] }
          />
          <div id="espaco150"></div>
          <Slider 
            titulo = {res[1].sliders[0].titulo}
            core = {sliderCardsDataTransform(res[1].sliderCards)}
            chamada = {res[1].sliders[0].button}
            link = {res[1].sliders[0].buttonLink}
          />
          <div id="espaco150"></div>
          <Margem 
            componente={
              <>
                <NovoTituloTexto
                  titulo="Siga o passo-a-passo e faça parte da nossa rede"
                  texto="Confira as etapas necessárias para formalizar a sua parceria com o Impulso Previne."
                />
                <div style={{paddingTop:50}}></div>
                <Grid12Col
                  proporcao="6-6"
                  items={ [
                    <>
                      <Margem 
                        componente={
                          <>
                          <ImagensFull2 imagem="https://media.graphassets.com/r43ZVW6rQ3ekuItEUW9P" />
                          <TituloSmallTexto
                              key={ uuidv1() } botao={{label: '',url: ''}} imagem={{posicao: true, url: 'https://media.graphassets.com/RfAzQFuVRhsuaPFSaMHg'}}
                              supertitulo="<b>1. Formulário de inscrição"
                              titulo=""
                              texto="O(a) Coordenador(a) de APS ou Secretário(a) de Saúde do município deve preenchê-lo com as principais informações sobre o município."
                            />
                        </>
                        } 
                      />
                    </>,
                    <>
                      <Margem 
                        componente={
                          <>
                          <ImagensFull2 imagem="https://media.graphassets.com/CCWgGFBEQYugyOYPzPz3" />
                          <TituloSmallTexto
                              key={ uuidv1() } botao={{label: '',url: ''}} imagem={{posicao: null, url: ''}}
                              supertitulo="<b>2. Convite para municípios"
                              titulo=""
                              texto="No próximo ciclo de mentorias, a equipe do Impulso Previne entra em contato com os municípios selecionados por e-mail."
                            />
                        </>
                        } 
                      />
                    </>,
                    <>
                      <Margem 
                        componente={
                          <>
                          <ImagensFull2 imagem="https://media.graphassets.com/ByrE2VoJQsOca0J7NorQ" />
                          <TituloSmallTexto
                              key={ uuidv1() } botao={{label: '',url: ''}} imagem={{posicao: null, url: ''}}
                              supertitulo="<b>3. Reunião de apresentação"
                              titulo=""
                              texto="Realizamos um encontro inicial para apresentação do programa e detalhamento do nosso acordo de cooperação técnica."
                            />
                        </>
                        } 
                      />
                    </>,
                    <>
                      <Margem 
                        componente={
                          <>
                          <ImagensFull2 imagem="https://media.graphassets.com/EYTEyJkxS2yvOcWtDTKC" />
                          <TituloSmallTexto
                              key={ uuidv1() } botao={{label: '',url: ''}} imagem={{posicao: null, url: ''}}
                              supertitulo="<b>4. Parceria formada"
                              titulo=""
                              texto="Pronto! Seu município é nosso parceiro e pode receber nosso apoio gratuito."
                            />
                        </>
                        } 
                      />
                    </>,
                  ] }
                />
            </>
            } 
          />
          <div id="espaco150"></div>
        </>
      } 
    />
    <FormConsultoria
        title="Inscreva-se e melhore o desempenho do seu município na atenção primária"
        mail=""
        link="https://docs.google.com/forms/d/e/1FAIpQLSce3dYZO3tdRmNq-Oy8Z_0IFu5RXtwDDsSw6BXLaWx7BBfv_Q/viewform?embedded=true"
        button="Preencher inscrição" 
        theme="IPVerde"
    />
      
  </div>
  )
}

export default Index;
