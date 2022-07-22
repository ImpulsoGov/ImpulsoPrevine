import Layout from "../componentes/Layout";
import { HomeBanner } from "@impulsogov/design-system";
import { ImagemFundo } from "@impulsogov/design-system"
import { ParceriasTexto } from "@impulsogov/design-system";
import { FormConsultoria } from "@impulsogov/design-system";

let importAll = (r)=> {
  return r.keys().map(r);
}
const images = importAll(require.context("../public/parceiros", false, /\.(png|svg)$/));
const parceiros = images.map((image)=>{
  return(
      {
          alt: image.default.src.split("/").slice(-1)[0].split(".")[0],
          src: image.default.src
      }
  )
})

const Index = () => {
  return (
    <Layout 
      pageTitle="Previne Brasil | Home"
      color="layoutColor"
    >
      <HomeBanner
        titulo = "Uma ferramenta gratuita para transformar seu desempenho no Previne Brasil."
        tituloDestaque = ""
        texto = ""
      />
      <ImagemFundo
          chamada = "Com uma forma eficiente de monitorar e agir sobre indicadores, "
          chamadacolor = "queremos ajudar gestores a transformar a saúde pública do país."
          cards = {[
              {
                  title : "Análises",
                  body : "Dados detalhados e recomendações pensadas para diferentes contextos de município. Em um só lugar."
              },
              {
                  title : "Consultoria",
                  body : "Profissionais capacitados e prontos para auxiliar, sem custo, os municípios na gestão do Previne Brasil."
              },
              {
                  title : "Previne Brasil",
                  body : "Todas as informações que o gestor precisa ter sobre o Programa, cálculo de metas, repasses financeiros e mais."
              }
          ]}
          botao = {
                      {
                          label : "Saiba mais sobre o impulso previne",
                          url : "/previnebrasil"
                      }
          }
      />
      <ParceriasTexto
          text = "O Impulso Previne é uma realização da <span style='color:#1D856C'>ImpulsoGov</span>, uma organização brasileira de saúde pública, sem fins lucrativos, que trabalha ao lado de gestores municipais e estaduais para impulsionar o uso de dados e tecnologia no setor público."
          label = "Junto à Impulso Gov, o projeto conta com uma rede de apoio institucional e financiadores:"
          parceiros = {parceiros}
      />
    <FormConsultoria
        title="Receba um manual gratuito e simplificado com todos os detalhes sobre o Previne Brasil."
        mail=""
        link="/manual-impulso-previne"
        button="Baixar manual"
    />      
    </Layout>
  )
}

export default Index;