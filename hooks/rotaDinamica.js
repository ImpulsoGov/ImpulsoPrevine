import * as gtag from '../componentes/Analytics/lib/gtag'


const rotaDinamica = (router) => {
    
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
}

export {rotaDinamica}