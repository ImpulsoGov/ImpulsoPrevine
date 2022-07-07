import React from "react";
import style from "./Content3Col.module.css"
const Content3Col = ({
    titulo,
    child1,
    child2,
    child3
}) => {
  return (
      <div className={style.Content3Col}>
          <div className={style.Content3ColTitulo}>{titulo}</div>
          <div className={style.Content3ColGrid}>
            {child1}
            {child2}
            {child3}
          </div>
      </div>
)};

export {Content3Col};