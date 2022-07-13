import React from "react";
import style from "./TextCol.module.css"
const TextCol = ({
    titulo,
    corpo
}) => {
  return (
      <div className={style.TextCol}>
          <div className={style.TextColTitle}>{titulo}</div>
          <div className={style.TextColBody}>{corpo}</div>
      </div>
)};

export {TextCol};