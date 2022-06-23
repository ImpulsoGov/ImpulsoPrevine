import React from "react";
import { ImagensFull2 } from "../../componentes/Imagens/ImagensFull"

const TituloTexto = ({
  titulo,
  texto
}) => {
  return (
      <div className="containerTexto">
        <div>
          <div className="tituloTexto">{titulo}</div>
        </div>
        <div className="corpoTexto"><p>{texto}</p></div>
        <style jsx>{`
          .containerTexto{
            background-color: #FFF;
            padding: 80px 0px 180px 0px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
        }
        .tituloTexto{
            width: 70%;
            margin: 45px 45px 75px 45px;
            padding-left: 125px;
            font-size: 64px;  
        }
        .corpoTexto{
            margin: 45px 180px 45px 180px;
            text-align: justify;
            font-size: 24px;  
        }
        /* SMALL */
        @media screen and (max-width: 1023px) {
            .containerTexto{
                padding-top: 15px;
                padding-bottom: 20px;
            }
            .tituloTexto{
                font-size: 32px;  
                padding-left: 0;
            }
            .corpoTexto{
                font-size: 14px;  
                margin: 0 30px 0 30px;
            }
        }
        /* MEDIUM */
        @media screen and (min-width: 1024px)and (max-width: 1400px) {
            .containerTexto{
                padding-top: 60px;
                padding-bottom: 30px;
            }
            .tituloTexto{
                font-size: 48px;  
                padding-left: 75px;
            }
            .corpoTexto{
                font-size: 16px;  
                margin-left: 120px;
                margin-right: 120px;
            }
        }
        
        /* XLARGE */
        @media screen and (min-width: 1920px) {
            .containerTexto{
                padding-top: 110px;
                padding-bottom: 250px;
            }
            .tituloTexto{
                font-size: 80px;  
                padding-left: 150px;
                width: 60%;
                text-align: left;
            }
            .corpoTexto{
                font-size: 32px;  
                margin-left: 200px;
                margin-right: 200px;
            }
        }
        `}</style>
      </div>
)};

export {TituloTexto};