import Layout from "../../componentes/Layout";
import { Footer } from "../../componentes/Footer/Footer.jsx";
import { NavBar } from "../../componentes/NavBar/NavBar.jsx";
import { TituloTexto } from "../../componentes/TituloTexto/TituloTexto.jsx";

const Index = () => {
  return (
    <Layout pageTitle="Previne Brasil | O Previne Brasil">
      <NavBar 
        links={[
          { label: "A Impulso Gov", url: "/impulsogov" },
          { label: "O Previne Brasil", url: "/previnebrasil" },
          { label: "Indicadores", url: "/indicadores" },
          { label: "Capitação", url: "/capitacao" },
          { label: "Consultoria", url: "/consultoria" }
        ]}
        />
      <TituloTexto
        titulo = "A Impulso Gov"
        texto = 
            "A Impulso Gov é uma organização brasileira de saúde pública, sem fins lucrativos, e que trabalha ao lado de gestores municipais e estaduais para impulsionar o uso de dados e tecnologia no setor público, assegurando o direito à uma vida saudável a todas as brasileiras e brasileiros, sem exceção.

            Quer saber mais sobre a Impulso Gov? Acesse o nosso site: impulsogov.org"
        />
      <Footer
        address={{
            first: "Rua Aracaju 100 - Vila Madalena",
            second: "São Paulo - SP, 01010-100",
        }}
        contactCopyright={{
            copyright: "© 2022 Impulso",
            email: "contato@impulsogov.org",
        }}
        links={[
          { label: "A Impulso Gov", url: "/impulsogov" },
          { label: "O Previne Brasil", url: "/previnebrasil" },
          { label: "Indicadores", url: "/indicadores" },
          { label: "Capitação", url: "/capitacao" },
          { label: "Consultoria", url: "/consultoria" }
        ]}
        socialMediaURLs={{
            facebook: "/facebook",
            instagram: "/instagram",
            linkedIn: "/linkedin",
            twitter: "/twitter",
        }} />
    </Layout>
  )
}

export default Index;