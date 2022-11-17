import '../styles/globals.css'
import { useEffect,useState } from 'react'
import { SessionProvider } from "next-auth/react"
import { useSession,getSession,signOut,signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import * as gtag from '../componentes/Analytics/lib/gtag'
import Analytics from '../componentes/Analytics/Analytics'
import { getData } from '../utils/cms'
import { LAYOUT } from '../utils/QUERYS'
import App from 'next/app'
import Head from 'next/head';
import { NavBar,Footer } from '@impulsogov/design-system';
import { AjustBar } from '../componentes/AjustBar/AjustBar'
import Context from '../utils/Context'
import {data} from '../utils/Municipios'
import TagManager from "react-gtm-module";
import axios from 'axios';

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
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  console.log(props.ses)
  const nome = props.ses == null || typeof(props.ses) == undefined ? "" : props.ses.user.nome
  const cargo = props.ses != null ? props.ses.user.cargo : ""
  useEffect(()=>{
    window.dataLayer = window.dataLayer || []; 
    window.dataLayer.push({ 
   'gtm.load': props.ses == null || typeof(props.ses) == undefined ? "" : props.ses.user 
    });
  })
  useEffect(() => {
    const nav = typeof window !== 'undefined' ? navigator.geolocation : false
    if (nav && cidade.length ==0){
      nav.getCurrentPosition(async (position)=> {
        await axios.get('https://nominatim.openstreetmap.org/reverse?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&zoom=10&format=json')
        .then(response => {
          if(response.data.address["ISO3166-2-lvl4"].slice(-2)=='DF'){
            let res = "Brasília"+" - "+response.data.address["ISO3166-2-lvl4"].slice(-2)
            setCidade(res);
            setLoading(true)
          }else{
            let res = response.data.address.city+" - "+response.data.address["ISO3166-2-lvl4"].slice(-2)
            setCidade(res);
            setLoading(true)
          }
        });
      },()=> {
        setCidade("São Paulo - SP");
        setLoading(true)
    })
    }
  }, [cidade]);
  let logoProjectDesktop = path == '/' ? props.res[0].logoIps[0].logo[1].url : props.res[0].logoIps[0].logo[0].url
  const logoProjetoMobile= props.res[0].logoIps[1].logo[0].url
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
      <SessionProvider session={session} refetchInterval={60*60} refetchOnWindowFocus={true} clientMaxAge={1*60}>
        <Context.Provider value={[cidade, setCidade]}>
        <Auth setStatus={setStatus}>
          <AjustBar/>
          {isLoading && 
            <NavBar 
              user={
                {                  
                    nome : nome,
                    cargo : cargo,
                    button : {label:"sair"},
                    label : props.ses == null || typeof(props.ses) == undefined  ? "Entrar" : nome[0],
                    equipe : props.ses?.user?.equipe,
                    login : signIn,
                    logout : signOut
                }
              }

              municipio={cidade}
              setMunicipio = {setCidade}
              data={data}
              theme={{
                logoProjeto : width > 1000 ? logoProjectDesktop : logoProjetoMobile,
                cor : path == '/' ? "ColorIP" : "White"
              }}
              menu={ props.ses ? props.res[0].menus :  [props.res[0].menus[0],props.res[0].menus[1],props.res[0].menus[3]]}
              NavBarIconBranco = {props.res[0].logoMenuMoblies[0].logo.url}
              NavBarIconDark = {props.res[0].logoMenuMoblies[1].logo.url}
            />
          }
            <Component {...pageProps} />
          <Footer
            theme={{
              logoProjeto : props.res[0].logoIps[0].logo[1].url,
              logoImpulso: props.res[0].logoImpulsos[0].logo[0].url,
              cor : "Black"
            }}
            address={{
                first: "",
                second: "",
            }}
            contactCopyright={{
                copyright: props.res[0].copyrights[0].copyright,
                email: props.res[0].copyrights[0].contato,
            }}
            links={ props.res[0].footers}
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

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth ] = useState(undefined);
  useEffect(() => {
      const handleWindowResize = () => {
          setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleWindowResize);
      handleWindowResize()
      return () => window.removeEventListener('resize', handleWindowResize);
    
  },[]);
  return windowWidth;
};


export default MyApp
