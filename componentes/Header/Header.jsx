import React from "react";

import style from "./Header.module.css";

const Header = ({
    titulo,
    tituloDestaque,
    texto,
    botao,
    chamada
}) => {
  return (
    <div className={style.conteinerHeader}>
        <div className={style.tituloHeader}>{titulo}<span className={style.tituloDestaqueHeader}>{tituloDestaque}</span></div>
        <div className={style.textoHeader}>{texto}</div>
        <div className={style.conteinerChamadasHeader}>
            {botao.label && <a className={style.buttonHeader} href={botao?.url}>{botao?.label.toUpperCase()}</a>}
            {chamada.label && <a className={style.consultoriaHeader} href={chamada?.url}>{chamada?.label.toUpperCase()}</a>}
        </div>
    </div>
)};

export {Header};