import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { NavBar } from '@impulsogov/design-system';
import { Footer } from '@impulsogov/design-system';
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-W8RVZBL",
};

if (process.browser) {
  TagManager.initialize(tagManagerArgs);
}

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>
      <NavBar 
        theme={{
          logoProjeto : useRouter().pathname == '/' ? props.logoIPWhite : props.logoIPColor,
          cor : useRouter().pathname == '/' ? "ColorIP" : "White"
        }}
        menu={ props.menus }
        subtitles = { props.dropdown}
      />

      <div className={props.color}>
        {props.children}
      </div>

      <Footer
        theme={{
          logoProjeto : props.logoIPWhite,
          logoImpulso: props.logoImpulso,
          cor : "Black"
        }}
        address={{
            first: "",
            second: "",
        }}
        contactCopyright={{
            copyright: props.copyright.label,
            email: props.copyright.contato,
        }}
        links={ props.footer}
        socialMediaURLs={props.socialMedia} 
      />
</div>
  )
}
export default Layout;