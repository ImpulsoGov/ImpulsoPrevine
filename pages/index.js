import { HomeBanner } from "@impulsogov/design-system";
import { ImagemFundo } from "@impulsogov/design-system"
import { ParceriasTexto } from "@impulsogov/design-system";
import { FormConsultoria } from "@impulsogov/design-system";

import { getData } from '../utils/cms'
import { LAYOUT, HOME } from '../utils/QUERYS'

export async function getServerSideProps() {
  const res = [
    await getData(LAYOUT),
    await getData(HOME),
  ]
  return {
    props: {
      res : res
    }
  }
}

const Parceiros = (res)=>{
  const parceiros = res.map((logo)=>{
    return(
        {
            alt: logo.fileName,
            src: logo.url
        }
    )
  }).reverse()
  return parceiros
}


const Index = ({res}) => {
  return (
    <div style={{backgroundColor: "#145C56"}}>
      <HomeBanner
        titulo = {res[1].homeBanners[0].titulo}
        tituloDestaque = ""
        texto = ""
      />
      <ImagemFundo
          imagem = {res[1].imagemFundos[0].imagem.url}
          chamada = {res[1].imagemFundos[0].titulo}
          chamadacolor = {res[1].imagemFundos[0].tituloColor}
          cards = {res[1].imagemfundoContents}
          botao = {
                      {
                          label : res[1].imagemFundos[0].buttonLabel,
                          url : res[1].imagemFundos[0].buttonLink
                      }
          }
      />
      <ParceriasTexto
          text = {res[1].parceirosAll[0].titulo.text}
          label = {res[1].parceirosAll[0].labelImages}
          parceiros = {Parceiros(res[1].logoParceiros[0].logoparceiro)}
      />
      <FormConsultoria
          title={res[1].formConsultorias[0].titulo}
          mail=""
          link={res[1].formConsultorias[0].link}
          button={res[1].formConsultorias[0].button}
      />      
    </div>
  )
}

export default Index;
