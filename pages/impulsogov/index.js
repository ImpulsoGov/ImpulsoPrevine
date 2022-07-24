import Layout from "../../componentes/Layout";
import { TituloTexto } from "@impulsogov/design-system";
import { FormConsultoria } from "@impulsogov/design-system";

const Index = () => {
  return (
    <Layout pageTitle="Previne Brasil | O Previne Brasil">
      <TituloTexto
        imagem = {{
          posicao: null,
          url: ''
        }}
        titulo = "A Impulso Gov"
        texto = 
            "Impulso Gov, uma organização sem fins lucrativos e suprapartidária que apoia profissionais do SUS no aprimoramento das políticas públicas por meio do uso de dados e tecnologia, para que todas as pessoas no Brasil tenham acesso a serviços de saúde de qualidade.<br/><br/><b>Quer saber mais sobre a Impulso Gov Acesse o nosso <a style='text-decoration: none' href='impulsogov.org'>site.</a> </b>"
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