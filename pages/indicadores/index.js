import Layout from "../../componentes/Layout";
import { Footer } from "../../componentes/Footer/Footer.jsx";
import { NavBar } from "../../componentes/NavBar/NavBar.jsx";
import { IFrame } from "../../componentes/IFrame/IFrame.jsx";

const Index = () => {
  return (
    <Layout pageTitle="Previne Brasil | Indicadores">
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
        link="https://datastudio.google.com/embed/reporting/3fa46357-727b-440c-b9f2-b0696ca1c193/page/p_1i1fd8auvc"
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