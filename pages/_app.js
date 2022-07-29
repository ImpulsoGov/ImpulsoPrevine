import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../componentes/Analytics/lib/gtag'
import Analytics from '../componentes/Analytics/Analytics'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
