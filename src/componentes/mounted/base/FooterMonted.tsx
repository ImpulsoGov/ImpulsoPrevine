'use client'
import { Footer } from '@impulsogov/design-system';
import { Session } from 'next-auth';

interface FooterMountedType {
    session : Session | null,
    res : any,
}
export const FooterMounted : React.FC<FooterMountedType> = ({
    res,
    session
}) => {
    return <Footer
    theme={ {
      logoProjeto: res.logoIps[0].logo[1].url,
      logoImpulso: res.logoImpulsos[0].logo[0].url,
      cor : "Black"
    }}
    logoLink = {session ? '/inicio' : '/'}
    address={{
        first: "",
        second: "",
    }}
    contactCopyright={{
        copyright: "© 2024 Impulso",
        email: "contato@impulsogov.org",
    }}
    links={ [res.menus[0],res.menus[7]] }
    socialMediaURLs={[
      { url: res.socialMedias[0].url, logo: res.socialMedias[0].logo[0].url},
      { url: res.socialMedias[1].url, logo: res.socialMedias[1].logo[0].url},
      { url: res.socialMedias[2].url, logo: res.socialMedias[2].logo[0].url},
    ]} 
  />

}