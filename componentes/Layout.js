import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { NavBar } from './NavBar/NavBar';
import { Footer } from './Footer/Footer';

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>
      <NavBar 
        theme={{
          logoProjeto : useRouter().pathname == '/' ? "https://github.com/ImpulsoGov/DesignSystem/raw/dev-componente-footer/componentes/estatico/impulso-previne-logo-branco.svg" : "https://github.com/ImpulsoGov/DesignSystem/raw/dev-componente-footer/componentes/estatico/impulso-previne-logo-preto.svg",
          cor : useRouter().pathname == '/' ? "ColorIP" : "White"
        }}
        menu={
            [
              { label: "A Impulso Gov", url: "/impulsogov" },
              { label: "O Previne Brasil", url: "/previnebrasil" },
              { label: "Análise", url: "" },
              { label: "Consultoria", url: "/consultoria" }
            ]
        }
        subtitles = {[
          { label: "Indicadores de Desempenho", url:"/indicadores" },
          { label: "Capitação Ponderada", url:"/capitacao" },
          { label: "Ações Estratégicas", url: "/acoes-estrategicas" },
        ]}
      />

      <div className={props.color}>
        {props.children}
      </div>

      <Footer
        theme={{
          logoProjeto : "https://github.com/ImpulsoGov/DesignSystem/raw/dev-componente-footer/componentes/estatico/impulso-previne-logo-branco.svg",
          logoImpulso: "https://github.com/ImpulsoGov/DesignSystem/raw/dev-componente-footer/componentes/estatico/impulso-gov-logo-branco-color.svg",
          cor : "Black"
        }}
        address={{
            first: "",
            second: "",
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
          { label: "Ações Estratégicas", url: "/acoes-estrategicas" },
          { label: "Consultoria", url: "/consultoria" }
        ]}
        socialMediaURLs={{
            facebook: "/facebook",
            instagram: "/instagram",
            linkedIn: "/linkedin",
            twitter: "/twitter",
        }} 
      />
</div>
  )
}
export default Layout;