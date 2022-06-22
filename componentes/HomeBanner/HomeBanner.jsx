import React from "react";

const HomeBanner = ({
    titulo,
    tituloDestaque,
    texto
}) => {
  return (
    <div className="conteinerHeader">
        <div className="tituloHeader">{titulo}<span className="tituloDestaqueHeader">{tituloDestaque}</span></div>
        <div className="textoHeader">{texto}</div>
        <style jsx>{`
        .conteinerHeader{
            background-color: #145C56;
            padding: 148px 72px 148px 64px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
        }
        
        .tituloHeader{
            line-height: 110%;
            letter-spacing: -0.04em;
            font-size: 128px;
            padding-right: 10%;
            color: #FFF;
        }
        
        .tituloDestaqueHeader{
            color: #2EB280;
        
        }
        
        .textoHeader{
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 150%;
            margin-top: 60px;
            margin-bottom: 60px;
            padding-right: 43%;
        }
        
        .conteinerChamadasHeader{
            font-size: 16px;
            line-height: 150%;
            padding: 0;
        }
        .buttonHeader{
            background-color: #2EB280;
            border-radius: 80px;
            align-items: center;
            padding: 16px 24px 17px;
            border: none;
            color: #FFF;
        }
        .buttonHeader:hover{
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            background-color: #ef8264;
        }
        .consultoriaHeader{
            color: #2EB280;
            margin-left: 20px;
        }
        .consultoriaHeader:hover{
            text-decoration: underline;
            color: #ef8264;
        }
        
        /* EXTRA SMALL */
        @media screen and (max-width: 649px) {
            .conteinerHeader{
                justify-content: center;
                text-align: left;
                padding: 72px 54px 96px 54px;
            }
            .tituloHeader{
                font-size: 32px;
                line-height: 110%;
                padding: 0;
                text-align: left;
            }
            .textoHeader{
                text-align: left;
                font-size: 16px;
                line-height: 110%;
                padding: 0;
                margin-top: 60px;
                margin-bottom: 60px;
            }
            .conteinerChamadasHeader{
                font-size: 14px;
            }
            .buttonHeader{
                margin: 0 0 25px 0;
                display: block;
            }
        }

        /* SMALL */
        @media screen and (min-width: 650px) and (max-width: 1023px) {
            .tituloHeader{
                font-size: 52px;
                padding-right: 10%;
            }
            .textoHeader{
                font-size: 24px;
                padding-right: 44%;
            }
            .conteinerChamadasHeader{
                font-size: 10px;
            }
        }
        
        /* MEDIUM */
        @media screen and (min-width: 1024px) and (max-width: 1439px) {
            .tituloHeader{
                font-size: 72px;
                padding-right: 10%;
            }
            .textoHeader{
                font-size: 16px;
                padding-right: 44%;
            }
            .conteinerChamadasHeader{
                font-size: 10px;
            }
        }
        
        /* XLARGE */
        @media screen and (min-width: 1920px) {
            .conteinerHeader{
                padding: 200px 72px 148px 90px;
            }
            .tituloHeader{
                font-size: 148px;
                padding-right: 20%;
            }
            .textoHeader{
                font-size: 32px;
                padding-right: 44%;
                margin-top: 80px;
                margin-bottom: 80px;
            }
            .conteinerChamadasHeader{
                font-size: 22px;
            }
            .buttonHeader{
                padding: 20px 28px 20px 28px;
            }
        }
        `}</style>
    </div>
)};

export {HomeBanner};