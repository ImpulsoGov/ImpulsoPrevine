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
import { alterarSenha, solicitarNovaSenha, validarCodigo, verificarCPF } from '../services/esqueciMinhaSenha';
import { criarSenha, primeiroAcesso, verificarCPFPrimeiroAcesso } from '../services/primeiroAcesso';
import { validacao, validateCredentials } from "../services/validateCredentials";
import '../styles/globals.css';
import Context from '../utils/Context';
import { data } from '../utils/Municipios';
import { LAYOUT } from '../utils/QUERYS';

import mixpanel from 'mixpanel-browser';
import { log_out } from '../hooks/log_out';
import Hotjar from '@hotjar/browser';

const hotjarVersion = 6;

Hotjar.init(Number(process.env["NEXT_PUBLIC_HOTJAR_SITE_ID"]), hotjarVersion);

const tagManagerArgs = {
  gtmId: "GTM-W8RVZBL",
};

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN);

function MyApp(props) {
  const { Component, pageProps: { session, ...pageProps } } = props;
  const router = useRouter();
  const dynamicRoute = router.asPath;
  let path = router.pathname;
  const nome = props.ses == null || typeof (props.ses) == undefined ? "" : props.ses.user.nome;
  let width = useWindowWidth();
  const [cidade, setCidade] = useState("João Pessoa - PB");
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  const [active, setMode] = useState(true);
  useEffect(() => TagManager.initialize(tagManagerArgs), []);
  useEffect(() => rotaDinamica(router), [router.events]);
  useEffect(() => addUserDataLayer(props.ses), [props.ses]);
  useEffect(() => setMode(true), [dynamicRoute]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Expõe o mixpanel globalmente para permitir integração com o hotjar
      window.mixpanel = mixpanel;
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      mixpanel.track('Page View', {
        'Page Title': props.pageTitle,
        'Logged': !!props.ses,
      });
    };

    // Quando a rota muda, chama handleRouteChange
    router.events.on('routeChangeComplete', handleRouteChange);

    // Limpa o evento de escuta quando o componente é desmontado
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, props.pageTitle]);

  useEffect(() => {
    if (props.ses && props.ses.user) {
      const atributos = {
        "cargo": props.ses.user.cargo,
        "municipio": props.ses.user.municipio,
        "equipe": props.ses.user.equipe,
        "municipio_id_sus": props.ses.user.municipio_id_sus,
        "is_test_user": (props.ses.user.cargo == 'Impulser')
          || props.ses.user.mail.includes('@impulsogov.org')
          || props.ses.user.municipio.includes('Impulsolândia')
          || (props.ses.user.municipio_id_sus === '111111')
      };

      mixpanel.identify(props.ses.user.id);
      mixpanel.people.set({
        "$email": props.ses.user.mail,
        "$name": props.ses.user.nome,
        ...atributos
      });
      Hotjar.identify(props.ses.user.id, {
        "email": props.ses.user.mail,
        "name": props.ses.user.nome,
        ...atributos
      });
    }
  }, [props.ses]);

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
                projeto = "IP"
                trackObject = {mixpanel}
                login={ { titulo: "Faça o login para ver os dados restritos." } }
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
                    validacao: validacao,
                    botaoAuxiliar: props.ses?.user.perfis.includes(2)
                      ? {
                        label: "GESTÃO DE USUÁRIOS",
                        handelClick: () => router.push("/gestao-usuarios")
                      }
                      : null
                  }
                }
                municipio={ cidade }
                setMunicipio={ setCidade }
                data={ data }
                theme={ {
                  logoProjeto: width > 900 ?
                    path == '/' ? "https://media.graphassets.com/3Vvlszx1RraNWFWyfgaT" : props.res[0].logoIps[0].logo[0].url :
                    props.res[0].logoIps[1].logo[0].url,
                  cor: (path == '/' || path == '/apoio' || path == '/analise' || path == '/quem-somos') ? "Cinza" : "White",
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
                            label: "Listas Nominais", url: "",
                            sub: [
                              { label: "Citopatológico", url: "/busca-ativa/citopatologico" },                              
                              { label: "Diabetes", url: "/busca-ativa/diabeticos?initialTitle=0&painel=0" },
                              { label: "Hipertensão", url: "/busca-ativa/hipertensos?initialTitle=0&painel=0" },
                              { label: "Pré-Natal", url: "/busca-ativa/gestantes?initialTitle=0&painel=0" },
                              { label: "Vacinação", url: "/busca-ativa/vacinacao" },
                              { label: "Cadastros Duplicados", url: "/cadastros-duplicados?initialTitle=0&painel=0" }
                            ]
                          }] : [])
                      .concat(props.ses?.user.perfis.includes(7) ? [{ label: "Trilhas", url: "/capacitacoes" }] : [])
                      .concat([{ label: "Dados Públicos - Q1/24", url: "/analise" }])
                    : [props.res[0].menus[0], props.res[0].menus[1]].concat([{ label: "Apoio aos Municípios", url: "/apoio" },{ label: "FAQ", url: "/faq" } , { label: "Blog", url: "/blog" }]) }
                NavBarIconBranco={ props.res[0].logoMenuMoblies[0].logo.url }
                NavBarIconDark={ props.res[0].logoMenuMoblies[1].logo.url }
                esqueciMinhaSenha={{
                  reqs: {
                    verificacao : verificarCPF,
                    mail: solicitarNovaSenha,
                    codigo: async (cpf, codigo) => {
                      const response = await validarCodigo(cpf,codigo)
                      mixpanel.track('button_click', {
                        'button_action': 'proximo_inseriu_codigo_telefone',
                        'login_flow': 'esqueceu_senha'
                      });
                      !response.success &&
                      mixpanel.track('validation_error', {
                        'button_action': "proximo_inseriu_codigo_telefone",
                        'error_message': response.mensagem,
                        'login_flow' : "esqueceu_senha",
                      });
                      return response
                    },
                    alterarSenha: alterarSenha
                  },
                  titulos : {
                    mail : "Recuperação de senha",
                    verificacao : "Recuperação de senha",
                    senha : "Recuperação de senha",
                    codigo : "Recuperação de senha",
                    sucesso : "Nova senha criada com sucesso!"
                  },
                  chamadas: {
                      mail : "Digite o seu CPF para receber um código de autorização de recuperação da senha.",
                      aviso : " ",
                      verificacao : "É necessário que um código de verificação seja enviado por mensagem de SMS para o telefone cadastrado ",
                      trocar_telefone : { texto : "Quero atualizar meu número de telefone cadastrado.", link : "https://bit.ly/login-alterar-telefone"},
                      codigo : "Digite abaixo o código recebido por mensagem de SMS no número de telefone cadastrado: ",
                      senha : "Escolha uma nova senha",
                      sucesso: "Agora é só entrar na área restrita com seu CPF e a senha criada."
                  }
                }}
                ModalInicio={ {
                  titulo: "Faça o login para ver os dados restritos.",
                  chamada: "Se esse é o seu primeiro acesso e sua senha ainda não foi criada, clique abaixo em ‘primeiro acesso’. Se você já possui uma senha, clique em ‘entrar’.",
                  cardAlert: "<p style='font-size:14px;'>A área logada é de acesso exclusivo para municípios parceiros. Para ver os resultados públicos do seu município <a href='analise' style='text-decoration:underline !important;'>clique aqui.</a></p>",
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
                    verificacao : verificarCPFPrimeiroAcesso,
                    mail: primeiroAcesso,
                    codigo: async(cpf,codigo)=>{
                      mixpanel.track('button_click', {
                        'button_action': 'proximo_inseriu_codigo_telefone',
                        'login_flow': 'primeiro_acesso'
                      });
                      const response = await validarCodigo(cpf,codigo)
                      !response.success &&
                      mixpanel.track('validation_error', {
                        'button_action': "proximo_inseriu_codigo_telefone",
                        'error_message': response.mensagem,
                        'login_flow' : "primeiro_acesso",
                      });
                      return response
                    },
                    alterarSenha: criarSenha,
                  },
                  titulos : {
                    mail : "Bem-vindo(a)! Precisamos que você crie uma senha para acessar os dados restritos.",
                    verificacao : "Verificação do telefone",
                    codigo : "Verificação do telefone",
                    senha: "Crie sua senha de acesso",
                    sucesso : "Senha criada com sucesso!"
                  },
                  chamadas: {
                      mail : "Se você é de um município parceiro e ainda não tem senha cadastrada, siga os próximos passos.",
                      aviso : " ",
                      codigo : "Digite abaixo o código recebido por mensagem de SMS no número de telefone cadastrado: ",
                      verificacao : "É necessário que um código de verificação seja enviado por mensagem de SMS para o telefone ",
                      trocar_telefone : { texto : "Quero atualizar meu número de telefone cadastrado.", link : "https://bit.ly/login-alterar-telefone"},
                      senha : "Escolha uma senha",
                      sucesso : "Agora é só entrar na área restrita com seu CPF e a senha criada."
                  }
              }}
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
                  copyright: "© 2024 Impulso",
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
