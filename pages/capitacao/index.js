import Layout from "../../componentes/Layout";
import { Footer } from "../../componentes/Footer/Footer.jsx";
import { NavBar } from "../../componentes/NavBar/NavBar.jsx";
import { IFrame } from "../../componentes/IFrame/IFrame.jsx";

const Index = () => {
  return (
    <Layout pageTitle="Previne Brasil | Capitação Ponderada">
      <NavBar 
        links={[
          { label: "A Impulso Gov", url: "/impulsogov" },
          { label: "O Previne Brasil", url: "/previnebrasil" },
          { label: "Indicadores", url: "/indicadores" },
          { label: "Capitação", url: "/capitacao" },
          { label: "Consultoria", url: "/consultoria" }
        ]}
        />
      <IFrame
        link="https://datastudio.google.com/embed/reporting/12fb288f-4955-4930-b091-63da3f846c51/page/p_wbmkd7yvuc"
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