import React from "react";
import style from "./ParceriasTexto.module.css";
import { sanitize } from "../../utils/sanitize";

let importAll = (r)=> {
    return r.keys().map(r);
  }
const images = importAll(require.context("../../public/parceiros", false, /\.(png|svg)$/));
const parceiros = images.map((image)=>{
    return(
        {
            alt: image.default.src.split("/").slice(-1)[0].split(".")[0],
            src: image.default.src
        }
    )
})
  
const ParceriasTexto = ({
    text,
    label
}) => {
  return (
    <div className={style.container_parceiros}>
        <div 
            className={style.textoParcerias}
            dangerouslySetInnerHTML={{
                __html: sanitize(text),
              }}        ></div>
        <div className={style.parceirosLabel}>{label}</div>
        <div className={style.gridContainer}>
                {parceiros.map((parceiro,index)=>{
                    return(
                        <div className={style.logo_parceiros} key={index}>
                            <img className={style.imageContainer}
                            alt= {parceiro.alt}
                            src= {parceiro.src}
                            />
                        </div>
                    )
                })}
        </div>
    </div>
  );
};

export {ParceriasTexto};