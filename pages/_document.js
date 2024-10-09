import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src='../helpers/userGuiding.js' />
      </body>
    </Html>
  )
}