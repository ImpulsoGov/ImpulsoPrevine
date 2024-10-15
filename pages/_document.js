import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intro.js@7.2.0/minified/introjs.min.css"/>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script dangerouslySetInnerHTML={{__html: "<script>  (function(g,u,i,d,e,s){g[e]=g[e]||[];var f=u.getElementsByTagName(i)[0];var k=u.createElement(i);k.async=true;k.src='https://static.userguiding.com/media/user-guiding-'+s+'-embedded.js';f.parentNode.insertBefore(k,f);if(g[d])return;var ug=g[d]={q:[]};ug.c=function(n){return function(){ug.q.push([n,arguments])};};var m=['previewGuide','finishPreview','track','identify','hideChecklist','launchChecklist'];for(var j=0;j<m.length;j+=1){ug[m[j]]=ug.c(m[j]);}})(window,document,'script','userGuiding','userGuidingLayer','W0U915212TFID');</script>"}} />
        {/* <Script src='../helpers/userGuiding.js' /> */}
        <script src="https://cdn.jsdelivr.net/npm/intro.js@7.2.0/intro.min.js"/>
        <script dangerouslySetInnerHTML={{__html: "window.AppcuesSettings = { enableURLDetection: true };"}}>
        </script>
        <script src="//fast.appcues.com/215916.js">
        </script>
      </body>
    </Html>
  );
}
