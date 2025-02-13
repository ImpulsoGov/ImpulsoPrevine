import type React from 'react';
import * as ReactDOMServer from 'react-dom/server';

export const RenderPrint = (
    escala: string,
    child: React.ReactElement,
  ) => {
    if (typeof window !== 'undefined') {
      const largura = window.innerWidth;
      const altura = window.innerHeight;
      const conteudo = ReactDOMServer.renderToString(child);
      const janelaImpressao = window.open('', '', `width=${largura},height=${altura}`);
  
      if (janelaImpressao) {
        const doc = janelaImpressao.document;
        doc.open();
        // Em vez de document.write, define o conteúdo do documento usando innerHTML
        doc.documentElement.innerHTML = `
          <head>
            <style>
              @media print and (orientation: landscape){
                @page {
                  transform: scale(${escala});
                  transform-origin: top left;
                  margin: 14px;
                }
                body {
                  margin: 0;
                }
                .largura {
                  width: 1215px;
                }
                .retrato{
                  display: none !important;
                }
                .paisagem{
                  display: block !important;
                }
              }
              @media print and (orientation: portrait){
                @page {
                  transform: scale(${escala});
                  transform-origin: top left;
                  margin: 14px;
                }
                body {
                  margin: 0;
                }
                .largura {
                  width: 868px;
                }
                .retrato{
                  display: block !important;
                }
                .paisagem{
                  display: none !important;
                }
              }
            </style>
          </head>
          <body>${conteudo}</body>
        `;
        doc.close();
  
        // Aguarda imagens carregarem
        const imagens = doc.images;
        let carregadas = 0;
        const totalImagens = imagens.length;
        for (let i = 0; i < totalImagens; i++) {
          if (imagens[i].complete) {
            carregadas++;
          } else {
            imagens[i].onload = imagens[i].onerror = () => {
              carregadas++;
              if (carregadas === totalImagens) {
                janelaImpressao.print();
              }
            };
          }
        }
  
        if (carregadas === totalImagens) {
          janelaImpressao.print();
        }
      }
    }
  };
  