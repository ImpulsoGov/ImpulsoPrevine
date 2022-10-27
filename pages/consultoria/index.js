import Layout from "../../componentes/Layout";
import { Header } from "@impulsogov/design-system";
import { Content3Col } from "@impulsogov/design-system";
import { TextCol } from "@impulsogov/design-system";
import { Slider } from "@impulsogov/design-system";
import { FormConsultoria } from "@impulsogov/design-system";
import { TituloTexto } from "@impulsogov/design-system";
import { ImagemFundo } from "@impulsogov/design-system";

import { getData } from '../../utils/cms'
import { LAYOUT, CONSULTORIA} from '../../utils/QUERYS'

export async function getStaticProps() {
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
    <>
      <Header
        titulo = {res[1].headers[0].titulo}
        texto = {res[1].headers[0].texto} 
        botao = { { label: res[1].headers[0].button, url: res[1].headers[0].buttonLink}}
        chamada = {{ label: "", url: "" }}
        />
      <TituloTexto
        imagem = {{
          posicao: null,
          url: ''
        }}
        titulo = "3 encontros com estratégias únicas e um plano de ação para o seu município."
        texto = "Nas <b>consultorias do Impulso Previne</b>, escolhemos municípios periodicamente para uma sequência de mentorias com nossa equipe de especialistas para monitorar seus indicadores.<br><br>Você faz a inscrição e assim que o município atender aos critérios da próxima rodada, você receberá um convite."
        />
    <Slider 
        titulo = {res[1].sliders[0].titulo}
        core = {[
            {
                titulo : res[1].sliderCards[0].nome,
                subtitulo : res[1].sliderCards[0].cargo + " | " +res[1].sliderCards[0].municipio + " - " +res[1].sliderCards[0].uf,
                corpo : res[1].sliderCards[0].texto
            },
            {
              titulo : res[1].sliderCards[0].nome,
              subtitulo : res[1].sliderCards[0].cargo + " | " +res[1].sliderCards[0].municipio + " - " +res[1].sliderCards[0].uf,
              corpo : res[1].sliderCards[0].texto
            },

        ]}
        chamada = {res[1].sliders[0].button}
        link = {res[1].sliders[0].buttonLink}
    />
    <TituloTexto
        imagem = {{
          posicao: null,
          url: ''
        }}
        titulo = "Mais sobre nós"
        texto = "A Impulso Gov é uma organização sem fins lucrativos e suprapartidária que apoia governos e gestores públicos no aprimoramento das políticas públicas de saúde por meio do uso inteligente de dados e tecnologia.<br><br>O Impulso Previne, por sua vez, é uma ferramenta gratuita desenvolvida pela Impulso Gov, financiada pela Umane e com apoio institucional do Conasems e da Frente Nacional dos Prefeitos (FNP), para apoiar os municípios na gestão do Previne Brasil. A solução centraliza, em uma única plataforma, informações, dados e análises dos componentes do programa para apresentá-los de forma descomplicada e didática aos gestores públicos."
        />
  </>
  )
}

export default Index;
