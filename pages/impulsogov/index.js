import Layout from "../../componentes/Layout";
import { TituloTexto } from "../../componentes/TituloTexto/TituloTexto.jsx";
import { FormConsultoria } from "../../componentes/FormConsultoria/FormConsultoria";

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
            "A Impulso Gov é uma organização brasileira de saúde pública, sem fins lucrativos, e que trabalha ao lado de gestores municipais e estaduais para impulsionar o uso de dados e tecnologia no setor público, assegurando o direito à uma vida saudável a todas as brasileiras e brasileiros, sem exceção.<br/><br/><b>Quer saber mais sobre a Impulso Gov Acesse o nosso <a style='text-decoration: none' href='impulsogov.org'>site.</a> </b>"
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