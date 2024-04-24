import mixpanel from 'mixpanel-browser';
import * as ReactDOMServer from 'react-dom/server';
export const Imprimir = (
    escala,
    child,
    lista,
    aba,
    sub_aba="",
    filtros_aplicados,
    setShowSnackBar
)=>{
    mixpanel.track('button_click', {
        'button_action': "imprimir_lista",
        'nome_lista_nominal': lista,
        'aba_lista_nominal' : aba,
        'sub_aba_lista_nominal' : sub_aba
      });
    const toastBar = ()=>{
    if(!filtros_aplicados){
        setShowSnackBar(() => ({
            open: true,
            message : "O número de pacientes é muito grande, filtre e ordene a lista para facilitar o carregamento da impressão",
            background: "#FFF0E1",
            color: "black",
        }))    
    }}
    const showImpressao = ()=>{
    if(typeof window !== 'undefined') {
        const largura = window.innerWidth;
        const altura = window.innerHeight;
        const janelaImpressao = window.open('', '', `width=${largura},height=${altura}`);
        const conteudo = ReactDOMServer.renderToString(child);
        janelaImpressao.document.write(`
        <html>
            <head>
            <style>
                @media print {
                    @page {
                        transform: scale(${escala});
                        transform-origin: top left;
                    }
                    body {
                        margin: 0;
                    }
                }
            </style>
            </head>
            <body>${conteudo}</body>
        </html>
        `);
        janelaImpressao.document.close();
        janelaImpressao.print();
    }}
    toastBar()
    setTimeout(showImpressao, 5000)
}