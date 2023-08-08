import { HomeBanner, ModalAlert } from "@impulsogov/design-system";
import { ImagemFundo } from "@impulsogov/design-system"
import { ParceriasTexto } from "@impulsogov/design-system";
import { FormConsultoria } from "@impulsogov/design-system";
import { Alert } from "@impulsogov/design-system";


import { getData } from '../services/cms'
import { LAYOUT, HOME } from '../utils/QUERYS'

export async function getServerSideProps(ctx) {
  const userIsActive = ctx.req.cookies['next-auth.session-token']
  const userIsActiveSecure = ctx.req.cookies['__Secure-next-auth.session-token']
  let redirect = !userIsActive && !userIsActiveSecure 
  if(!redirect) {
    return {
      redirect: {
        destination: "/inicio",
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      }, 
    }
  }
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
      <ModalAlert
        Child = {Alert}
        childProps = {{
          titulos : {
              Titulo : "Vacinação Infantil",
              SubTitulo : "Capacitação sobre o Previne Brasil:"
          },
          Info : [
              {
                  icon : "https://media.graphassets.com/mK0XWA2qSyK3tSPER5SM",
                  info : "23/08"
              },
              {
                  icon : "https://media.graphassets.com/Bsq3OasQQxWNFuN0Ldhs",
                  info : "19hs"
              },
              {
                  icon : "https://media.graphassets.com/wb3wQPKRQY6o1Mb7pLzE",
                  info : "Online"
              },
              {
                  icon : "https://media.graphassets.com/Ui2qHF9IR9WyqEQv8H1v",
                  info : "Gratuito"
              },
          ],
          cardProfissional : {
              profissional : "https://media.graphassets.com/2sqDyLFbTJylgJKYorEy",
              logo : "https://media.graphassets.com/et6MBNobT9OA39JxsjNi",
              nome : "Isabela dos Santos",
              cargo : "Especialista em Saúde Coletiva"
          },
          botao : {
              label : "QUERO ME INSCREVER",
              url : "https://bit.ly/inscricao-webinar-14"
          }
        }
        }
      />
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
