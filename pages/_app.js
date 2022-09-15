import '../styles/globals.css'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../componentes/Analytics/lib/gtag'
import Analytics from '../componentes/Analytics/Analytics'
import { getData } from '../utils/cms'
import { LAYOUT } from '../utils/QUERYS'
import App from 'next/app'
import Head from 'next/head';
import { NavBar } from '@impulsogov/design-system';
import { Footer } from '@impulsogov/design-system';
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
  const { Component, pageProps } = props;
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
  const [isLoading, setLoading] = useState(false);
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

  return (
    <>
      <Head>
        <title>{props.pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Context.Provider value={[cidade, setCidade]}>
        {isLoading && 
          <NavBar 
            municipio={cidade}
            setMunicipio = {setCidade}
            data={data}
            theme={{
              logoProjeto : path == '/' ? props.res[0].logoIps[0].logo[1].url : props.res[0].logoIps[0].logo[0].url,
              cor : path == '/' ? "ColorIP" : "White"
            }}
            menu={ props.res[0].menus }
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
      </Context.Provider>
      <Analytics />

    </>
  )
}

MyApp.getInitialProps = async(context)=> {
  const pageProps = await App.getInitialProps(context)
  const res = [
    await getData(LAYOUT),
  ]
  return {
    ...pageProps,
    res
  }
}

export default MyApp
