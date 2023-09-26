import { IFrame } from "@impulsogov/design-system";
import { HomeBanner } from "@impulsogov/design-system"

import { getData } from '../../services/cms'
import { LAYOUT, MANUAL} from '../../utils/QUERYS'

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
    await getData(MANUAL),
  ]
  return {
    props: {
      res : res
    }
  }
}


const Index = ({res}) => {
  return (
    <>
      <HomeBanner
        titulo = {res[1].homeBanners[0].titulo}
        tituloDestaque = ""
        texto = {res[1].homeBanners[0].texto}
      />
      <IFrame
        height="1200"
        link="https://docs.google.com/forms/d/e/1FAIpQLSd4kBY09SxlM2IaTZ7CAa5IUdmqE-7HK2IEzIPTMJNVnbtFwQ/viewform?embedded=true"
      />
    </>
  )
}

export default Index;