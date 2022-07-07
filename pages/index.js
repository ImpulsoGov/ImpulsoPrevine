import Layout from "../componentes/Layout";
import { Footer } from "../componentes/Footer/Footer.jsx";
import { HomeBanner } from "../componentes/HomeBanner/HomeBanner.jsx";
import { ImagemFundo } from "../componentes/ImagemFundo/ImagemFundo"
import { ParceriasTexto } from "../componentes/ParceriasTexto/ParceriasTexto";
import { FormConsultoria } from "../componentes/FormConsultoria/FormConsultoria";

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
      />
    <FormConsultoria
        title="Receba um manual gratuito e simplificado com todos os detalhes sobre o Previne Brasil."
        mail=""
        link="/formulario"
        button="Baixar manual"
    />      
    </Layout>
  )
}

export default Index;