import '../styles/globals.css'
import { useEffect,useState } from 'react'
import { SessionProvider } from "next-auth/react"
import { useSession,getSession,signOut,signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import * as gtag from '../componentes/Analytics/lib/gtag'
import Analytics from '../componentes/Analytics/Analytics'
import { getData } from '../services/cms'
import { LAYOUT } from '../utils/QUERYS'
import App from 'next/app'
import Head from 'next/head';
import { NavBar,Footer } from '@impulsogov/design-system';
import Context from '../utils/Context'
import {data} from '../utils/Municipios'
import TagManager from "react-gtm-module";
import { validateCredentials,validacao } from "../services/validateCredentials"
import { solicitarNovaSenha,alterarSenha,validarCodigo } from '../services/esqueciMinhaSenha'
import { primeiroAcesso,criarSenha } from '../services/primeiroAcesso'
import { addUserDataLayer } from '../hooks/addUserDataLayer'
import { getCity } from '../hooks/getCity'
import { useWindowWidth } from '../helpers/useWindowWidth'

const tagManagerArgs = {
  gtmId: "GTM-W8RVZBL",
};

if (process.browser) {
  TagManager.initialize(tagManagerArgs);
}


function MyApp(props) {
  const { Component, pageProps: { session, ...pageProps }} = props;
  const router = useRouter()
  let path = useRouter().pathname
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  const [cidade, setCidade] = useState("");
  const [conteudoLinks,setConteudoLinks] = useState()
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  console.log(props.ses)
  const nome = props.ses == null || typeof(props.ses) == undefined ? "" : props.ses.user.nome
  const cargo = props.ses != null ? props.ses.user.cargo : ""
  useEffect(()=>addUserDataLayer(props.ses))
  useEffect(()=>getCity(cidade,setCidade,setLoading), [cidade]);
  let width = useWindowWidth()
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
      <SessionProvider session={session} refetchInterval={60*60} refetchOnWindowFocus={true} clientMaxAge={8 * 60 * 60}>
          <Context.Provider value={[cidade, setCidade]}>
          <Auth setStatus={setStatus}>
            {isLoading && 
              <NavBar 
                user={
                  {                  
                      nome : nome,
                      cargo : cargo,
                      button : {label:"sair"},
                      label : props.ses == null || typeof(props.ses) == undefined  ? "Acesso Restrito" : nome[0],
                      equipe : props.ses?.user?.equipe,
                      login : signIn,
                      logout : signOut,
                      validarCredencial : validateCredentials,
                      validacao : validacao
                  }
                }

                municipio={cidade}
                setMunicipio = {setCidade}
                data={data}
                theme={{
                  logoProjeto : width > 1000 ? 
                  path == '/' ? props.res[0].logoIps[0].logo[1].url : props.res[0].logoIps[0].logo[0].url : 
                  props.res[0].logoIps[1].logo[0].url,
                  cor : path == '/' ? "ColorIP" : "White",
                  logoLink : props.ses ? '/inicio' : '/'
                }}
                seletorMunicipios = {path == '/analise'}
                menu={ props.ses ? [props.res[0].menus[1],props.res[0].menus[4],{label: "Capacitações", url : "/capacitacoes"}] :  [props.res[0].menus[0],props.res[0].menus[1],props.res[0].menus[3]]}
                NavBarIconBranco = {props.res[0].logoMenuMoblies[0].logo.url}
                NavBarIconDark = {props.res[0].logoMenuMoblies[1].logo.url}
                esqueciMinhaSenha = {{
                  reqs : {
                      mail : solicitarNovaSenha,
                      codigo : validarCodigo,
                      alterarSenha : alterarSenha
                  },
                }}
                ModalInicio={{
                  titulo: "Faça o login para ver os dados restritos.",
                  chamada: "Se esse é o seu primeiro acesso e sua senha ainda não foi criada, clique abaixo em ‘primeiro acesso’. Se você já possui uma senha, clique em ‘entrar’.",
                  cardAlert: "<p style='font-size:14px;'>A área logada é de acesso exclusivo para municípios parceiros. Para ver os resultados públicos do seu município, do Q3/22, <a href='analise' style='text-decoration:underline !important;'>clique aqui.</a></p>",
                  botaoPrincipal : {
                      label: "entrar",
                  },
                  botaoSecundario : {
                      label: "primeiro acesso",
                  }
                }}
                primeiroAcesso={{
                    reqs:{
                        mail : primeiroAcesso,
                        codigo : validarCodigo,
                        alterarSenha : criarSenha,
                    }
                }}
          
              />
            }
              <div style={{paddingTop:"75px"}}>
                <Component {...pageProps} />
              </div>
            <Footer
              theme={{
                logoProjeto : props.res[0].logoIps[0].logo[1].url,
                logoImpulso: props.res[0].logoImpulsos[0].logo[0].url,
                cor : "Black"
              }}
              logoLink = {props.ses ? '/inicio' : '/'}
              address={{
                  first: "",
                  second: "",
              }}
              contactCopyright={{
                  copyright: props.res[0].copyrights[0].copyright,
                  email: props.res[0].copyrights[0].contato,
              }}
              links={ props.ses ? [props.res[0].menus[1],props.res[0].menus[4]] :  [props.res[0].menus[0],props.res[0].menus[1],props.res[0].menus[3]]}
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
  )
}
function Auth({ children,setStatus }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: status } = useSession({ required: false })
  setStatus(status)
  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}
MyApp.getInitialProps = async(context)=> {
  const pageProps = await App.getInitialProps(context)
  const res = [
    await getData(LAYOUT),
  ]
  const ses = await getSession(context)
  return {
    ...pageProps,
    res,
    ses,
  }
}
export default MyApp
