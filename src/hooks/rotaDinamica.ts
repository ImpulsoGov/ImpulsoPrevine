import * as gtag from '@componentes/Analytics/lib/gtag'

const rotaDinamica = (url : string) => gtag.pageview(url)

export {rotaDinamica}