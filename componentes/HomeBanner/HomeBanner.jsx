import React from "react";

import style  from "./HomeBanner.module.css"

const HomeBanner = ({
    titulo,
    tituloDestaque,
    texto
}) => {
  return (
    <div className={style.conteinerHeader}>
        <div className={style.tituloHeader}>{titulo}<span className={style.tituloDestaqueHeader}>{tituloDestaque}</span></div>
        <div className={style.textoHeader}>{texto}</div>
    </div>
)};

export {HomeBanner};