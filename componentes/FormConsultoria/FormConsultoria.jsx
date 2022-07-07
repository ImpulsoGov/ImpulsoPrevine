import React from "react";

import style from "./FormConsultoria.module.css"

const FormConsultoria = ({
    title,
    mail,
    link,
    button
})=>{
    return(
        <div className={style.containerFormConsultoria}>
            <div className={style.titleFormConsultoria}>{title}<span className={style.mailFormConsultoria}>{mail}</span></div>
            <a 
                className={style.buttonFormConsultoria}
                href={link}
                >{button.toUpperCase()}</a>
        </div>
    )
}

export {FormConsultoria}