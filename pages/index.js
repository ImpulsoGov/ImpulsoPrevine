import Layout from "../componentes/Layout";
import { Footer } from "../componentes/Footer/Footer.jsx";
import { HomeBanner } from "../componentes/HomeBanner/HomeBanner.jsx";
import { NavBar } from "../componentes/NavBar/NavBar.jsx";
import { FileDownloader } from "../componentes/FileDownloader/Filedownloader";

const Index = () => {
  return (
    <Layout pageTitle="Previne Brasil | Home">
      <NavBar 
        links={[
          { label: "A Impulso Gov", url: "/impulsogov" },
          { label: "O Previne Brasil", url: "/previnebrasil" },
          { label: "Indicadores", url: "/indicadores" },
          { label: "Capitação", url: "/capitacao" },
          { label: "Consultoria", url: "/consultoria" }
        ]}
        />
      <HomeBanner
        titulo = "Uma ferramenta gratuita para transformar seu desempenho no Previne Brasil."
        tituloDestaque = ""
        texto = ""
      />
      <FileDownloader />
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