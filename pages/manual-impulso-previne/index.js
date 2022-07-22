import Layout from "../../componentes/Layout";
import { IFrame } from "../../componentes/IFrame/IFrame.jsx";
import { HomeBanner } from "@impulsogov/design-system"

const Index = () => {
  return (
    <Layout pageTitle="Impulso Previne | Manual">
      <HomeBanner
        titulo = "Quer saber mais sobre o programa Previne Brasil e entender tudo o que mudou no financiamento federal da Atenção Primária?"
        tituloDestaque = ""
        texto = "Baixe o manual gratuito desenvolvido pelos especialistas da Impulso Gov."
      />
      <IFrame
        height="1200"
        link="https://docs.google.com/forms/d/e/1FAIpQLSd4kBY09SxlM2IaTZ7CAa5IUdmqE-7HK2IEzIPTMJNVnbtFwQ/viewform?embedded=true"
      />
    </Layout>
  )
}

export default Index;