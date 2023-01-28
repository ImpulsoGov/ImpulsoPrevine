import Layout from "../../componentes/Layout";
import { TituloTexto } from "@impulsogov/design-system";
import { CardTrilha } from "@impulsogov/design-system";

const Index = ({res}) => {
  return (
    <>
    <TituloTexto
        imagem = {{
          posicao: null,
          url: ''
        }}
        titulo = "Trilhas de Capacitação"
        texto = "Você está na área logada da Coordenação da APS do seu município. Aqui você vai encontrar um painel de cadastros duplicados, listas nominais para monitoramento, referentes a cada um dos indicadores do Previne Brasil."
        />
    <CardTrilha
      linkSobre="/sobre"
      linkTrilha="/sobre"
      progressao={0}
      titulo="Hipertensão e Diabetes"
    />
  </>
  )
}

export default Index;
