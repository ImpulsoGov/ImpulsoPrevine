import React from "react";
import style from "./ButtonColor.module.css"

const ButtonColor = ({
    label,
    link
})=>{
    return(
        <a 
            className={style.ButtonColorContainer}
            href={link}
        >
            {label}
        </a>
    )
}

const ButtonColorSubmit = ({
    label,
    submit,
    arg
})=>{
    return(
        <button 
            className={style.ButtonColorContainer}
            onClick={()=>submit(arg)}
        >
            {label.toUpperCase()}
        </button>
    )
}

const ButtonColorSubmitMultiple = ({
    label,
    submit,
    arg
})=>{
    return(
        <button 
            className={style.ButtonColorContainer}
            onClick={()=>submit[1]()}
        >
            {label.toUpperCase()}
        </button>
    )
}

export {ButtonColor,ButtonColorSubmit,ButtonColorSubmitMultiple}