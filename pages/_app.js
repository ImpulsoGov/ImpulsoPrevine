import { Footer, NavBar, SearchBar } from '@impulsogov/design-system';
import { SessionProvider, getSession, signIn, signOut, useSession } from "next-auth/react";
import App from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TagManager from "react-gtm-module";
import Analytics from '../componentes/Analytics/Analytics';
import { useWindowWidth } from '../helpers/useWindowWidth';
import { addUserDataLayer } from '../hooks/addUserDataLayer';
import { getCity } from '../hooks/getCity';
import { rotaDinamica } from '../hooks/rotaDinamica';
import { getData } from '../services/cms';
import { alterarSenha, solicitarNovaSenha, validarCodigo } from '../services/esqueciMinhaSenha';
import { criarSenha, primeiroAcesso } from '../services/primeiroAcesso';
import { validacao, validateCredentials } from "../services/validateCredentials";
import '../styles/globals.css';
import Context from '../utils/Context';
import { data } from '../utils/Municipios';
import { LAYOUT } from '../utils/QUERYS';

const tagManagerArgs = {
  gtmId: "GTM-W8RVZBL",
};

function MyApp(props) {
  const { Component, pageProps: { session, ...pageProps } } = props;
  const router = useRouter();
  const dynamicRoute = router.asPath;
  let path = router.pathname;
  const nome = props.ses == null || typeof (props.ses) == undefined ? "" : props.ses.user.nome;
  let width = useWindowWidth();
  const [cidade, setCidade] = useState("São Paulo - SP");
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  const [active, setMode] = useState(true);
  useEffect(() => TagManager.initialize(tagManagerArgs), []);
  useEffect(() => rotaDinamica(router), [router.events]);
  useEffect(() => addUserDataLayer(props.ses), [props.ses]);
  //useEffect(() => getCity(cidade, setCidade, setLoading), [cidade]);
  useEffect(() => setMode(true), [dynamicRoute]);
  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SessionProvider session={ session } refetchInterval={ 60 * 60 } refetchOnWindowFocus={ true } clientMaxAge={ 8 * 60 * 60 }>
        <Context.Provider value={ [cidade, setCidade] }>
          <Auth setStatus={ setStatus }>
            { isLoading &&
              <NavBar
                login={ { titulo: "Faça o login para ver o painel de busca ativa" } }
                user={
                  {
                    nome: nome,
                    cargo: props.ses != null ? props.ses.user.cargo : "",
                    button: { label: "sair" },
                    label: props.ses == null || typeof (props.ses) == undefined ? "Acesso Restrito" : nome[0],
                    equipe: props.ses?.user?.equipe,
                    login: signIn,
                    logout: signOut,
                    validarCredencial: validateCredentials,
                    validacao: validacao
                  }
                }
                municipio={ cidade }
                setMunicipio={ setCidade }
                data={ data }
                theme={ {
                  logoProjeto: width > 1000 ?
                    path == '/' ? "https://media.graphassets.com/3Vvlszx1RraNWFWyfgaT" : props.res[0].logoIps[0].logo[0].url :
                    props.res[0].logoIps[1].logo[0].url,
                  cor: (path == '/' || path == '/apoio' || path == '/analise') ? "Cinza" : "White",
                  logoLink: props.ses ? '/inicio' : '/'
                } }
                showMenuMobile={ {
                  states: {
                    active: active,
                    setMode: setMode
                  }
                } }
                menu={
                  props.ses ?
                    [{ label: "Início", url: "/inicio" }]
                      .concat(
                        (props.ses?.user.perfis.includes(5) || props.ses?.user.perfis.includes(8) || props.ses?.user.perfis.includes(9)) ?
                          [{
                            label: "Dados Restritos", url: "",
                            sub: [
                              { label: "Listas Nominal Citopatológico", url: "/busca-ativa/citopatologico" },                              { label: "Listas Nominal Diabetes", url: "/busca-ativa/diabeticos?initialTitle=0&painel=0" },
                              { label: "Listas Nominal Hipertensão", url: "/busca-ativa/hipertensos?initialTitle=0&painel=0" },
                              { label: "Listas Nominal Pré-Natal", url: "/busca-ativa/gestantes?initialTitle=0&painel=0" },
                              { label: "Cadastros Duplicados", url: "/cadastros-duplicados?initialTitle=0&painel=0" }
                            ]
                          }] : [])
                      .concat(props.ses?.user.perfis.includes(7) ? [{ label: "Trilhas", url: "/capacitacoes" }] : [])
                      .concat([{ label: "Dados Públicos - Q1/23", url: "/analise" }])
                    : [props.res[0].menus[0], props.res[0].menus[1]].concat([{ label: "Apoio aos Municípios", url: "/apoio" },{ label: "FAQ", url: "/faq" } , { label: "Blog", url: "/blog" }]) }
                NavBarIconBranco={ props.res[0].logoMenuMoblies[0].logo.url }
                NavBarIconDark={ props.res[0].logoMenuMoblies[1].logo.url }
                esqueciMinhaSenha={ {
                  reqs: {
                    mail: solicitarNovaSenha,
                    codigo: validarCodigo,
                    alterarSenha: alterarSenha
                  },
                  chamadas: {
                    sucesso: "Agora é só entrar na área restrita com seu e-mail e a senha criada."
                  }
                } }
                ModalInicio={ {
                  titulo: "Faça o login para ver os dados restritos.",
                  chamada: "Se esse é o seu primeiro acesso e sua senha ainda não foi criada, clique abaixo em ‘primeiro acesso’. Se você já possui uma senha, clique em ‘entrar’.",
                  cardAlert: "<p style='font-size:14px;'>A área logada é de acesso exclusivo para municípios parceiros. Para ver os resultados públicos do seu município, do Q3/22, <a href='analise' style='text-decoration:underline !important;'>clique aqui.</a></p>",
                  botaoPrincipal: {
                    label: "entrar",
                    theme: 'ColorIP'
                  },
                  botaoSecundario: {
                    label: "primeiro acesso",
                  },
                  botaoAjuda: {
                    label: 'ESTOU COM PROBLEMAS NO LOGIN',
                    link: 'https://docs.google.com/forms/d/e/1FAIpQLSe1i7zkVOz-T24xfD3F4XCM2J-hYnoTKYCMHG3EVMLUoBNpMg/viewform?usp=sf_link'
                  },
                } }
                primeiroAcesso={ {
                  reqs: {
                    mail: primeiroAcesso,
                    codigo: validarCodigo,
                    alterarSenha: criarSenha,
                  },
                  chamadas: {
                    sucesso: "Agora é só entrar na área restrita com seu e-mail e a senha criada."
                  }
                } }
              />
            }
            <div 
              style={{
                  paddingTop: width > 1000  ? "76px" :  path == '/' ? "0px" : path == '/apoio' ? "0px" :"30px",
                  height: "100%"
              }}
            >
              <Component { ...pageProps } />
            </div>
            <Footer
              theme={ {
                logoProjeto: props.res[0].logoIps[0].logo[1].url,
                logoImpulso: props.res[0].logoImpulsos[0].logo[0].url,
                cor : "Black"
              }}
              logoLink = {props.ses ? '/inicio' : '/'}
              address={{
                  first: "",
                  second: "",
              }}
              contactCopyright={{
                  copyright: "© 2023 Impulso",
                  email: "contato@impulsogov.org",
              }}
              links={ [props.res[0].menus[0],props.res[0].menus[7]] }
              socialMediaURLs={[
                { url: props.res[0].socialMedias[0].url, logo: props.res[0].socialMedias[0].logo[0].url},
                { url: props.res[0].socialMedias[1].url, logo: props.res[0].socialMedias[1].logo[0].url},
                { url: props.res[0].socialMedias[2].url, logo: props.res[0].socialMedias[2].logo[0].url},
              ]} 
            />
          </Auth>
        </Context.Provider>
        <Analytics />
      </SessionProvider>
    </>
  );
}
function Auth({ children, setStatus }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: status } = useSession({ required: false });
  setStatus(status);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
MyApp.getInitialProps = async (context) => {
  const pageProps = await App.getInitialProps(context);
  const res = [
    await getData(LAYOUT),
  ];
  const ses = await getSession(context);
  return {
    ...pageProps,
    res,
    ses,
  };
};
export default MyApp;
