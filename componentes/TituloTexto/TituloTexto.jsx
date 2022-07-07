import React from "react";
import { sanitize } from "../../utils/sanitize";
import style from "./TituloTexto.module.css"
import { ImagensFull2 } from "../../componentes/Imagens/ImagensFull"

const ImageTop = ({
  top,
  link,
  titulo,
}) => {
  if (top==true) {
    return(
      <div>
        <ImagensFull2 imagem={link} />
        <div 
          className={style.tituloTexto}
          dangerouslySetInnerHTML={{
            __html: sanitize(titulo),
          }}        
        ></div>
  </div>
    )
  }else if (top==false) {
    return(
      <div>
        <div 
          className={style.tituloTexto}
          dangerouslySetInnerHTML={{
            __html: sanitize(titulo),
          }}        
        ></div>
        <ImagensFull2 imagem={link} />
      </div>
    )
  }else{
    return(
      <div>
        <div 
          className={style.tituloTexto}
          dangerouslySetInnerHTML={{
            __html: sanitize(titulo),
          }}        
        ></div>
      </div>
    )
  }
}

const TituloTexto = ({
  titulo,
  texto,
  imagem,
}) => {
  return (
      <div className={style.containerTexto}>
        <ImageTop
         top = {imagem.posicao}
         link = {imagem.url}
         titulo = {titulo}
         />
        <div 
          className={style.corpoTexto}
          dangerouslySetInnerHTML={{
            __html: sanitize(texto),
          }}        
        ></div>
      </div>
)};

export {TituloTexto};