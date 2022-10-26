import Layout from "../../componentes/Layout";
import { Header } from "@impulsogov/design-system";
import { Content3Col } from "@impulsogov/design-system";
import { TextCol } from "@impulsogov/design-system";
import { Slider } from "@impulsogov/design-system";
import { FormConsultoria } from "@impulsogov/design-system";

import { getData } from '../../utils/cms'
import { LAYOUT, CONSULTORIA} from '../../utils/QUERYS'

export async function getServerSideProps() {
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
      <Content3Col
        titulo = {res[1].content3Cols[0].titulo}
        child1 = {
            <TextCol
                titulo = {res[1].cards[0].titulo}
                corpo = {res[1].cards[0].texto}
            />
        }
        child2 = {
            <TextCol
                titulo = {res[1].cards[1].titulo}
                corpo = {res[1].cards[1].texto}
            />
        }
        child3 = {
            <TextCol
                titulo = {res[1].cards[2].titulo}
                corpo = {res[1].cards[2].texto}
            />
        }        
      />
    <FormConsultoria
        title={res[1].formConsultorias[0].titulo}
        mail={res[1].formConsultorias[0].tituloColor}
        link={res[1].formConsultorias[0].link}
        button={res[1].formConsultorias[0].button}
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
  </>
  )
}

export default Index;
