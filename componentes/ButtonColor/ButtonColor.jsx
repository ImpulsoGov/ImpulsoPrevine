import Link from "next/link";
import React from "react";
import style from "./ButtonColor.module.css";
import PropTypes from 'prop-types';
import cx from 'classnames';

const ButtonColor = ({
    icone,
    label,
    link,
    nova_aba
})=>{
    return(
        <>
            {
                icone &&
                <Link href={link}>
                    <a  
                        className={style.ButtonColorIconContainer}
                        target={nova_aba ? "_blank" : "_self"}
                    >
                        {icone?.posicao=='right' && <img className={style.IconeRight} src={icone?.url} />}
                        {label} 
                        {icone?.posicao=='left' && <img className={style.IconeLeft} src={icone?.url} />}
                    </a>
                </Link>
            }
            {
                (icone == null) && 
                <Link href={link}>
                    <a  
                        className={style.ButtonColorIconContainerTexto}
                        target={nova_aba ? "_blank" : "_self"}
                    >
                        {label} 
                    </a>
                </Link>
            }
        </>
    )
}
const ButtonColorMobile = ({
    icone,
    label,
    link
})=>{
    return(
        <Link href={link}>
                <a  className={style.ButtonColorIconContainerMobile}>
                    {icone?.posicao=='right' && <img className={style.IconeRight} src={icone?.url} />}
                    {label} 
                    {icone?.posicao=='left' && <img className={style.IconeLeft} src={icone?.url} />}
                </a>
        </Link>
    )
}

const ButtonColorSubmit = ({
    label,
    submit,
    arg,
    theme,
    icon,
    disable
})=>{
    return(
        <button 
            className={cx(style.ButtonColorContainer, style[`${!disable ? theme : "disable"}`])}
            onClick={()=>{if(!disable)submit(arg)}}
        >
            {icon && <img className={style.IconeRight} src={icon} />}
            {label?.toUpperCase()}
        </button>
    )
}
const ButtonColorSubmitIcon = ({
    label,
    submit,
    icon,
    disable,
    theme
})=>{
    return(
        <button 
            className={cx(style.ButtonColorContainer, style[`${theme}`])}
            onClick={()=>{if(!disable) submit()}}
            style={(disable) ? {cursor:"default"} : {cursor:"pointer"}}
        >
            {icon && <img className={style.IconeRight} src={icon} />}
            {label?.toUpperCase()}
        </button>
    )
}

const ButtonColorSubmitMobile = ({
    label,
    submit,
    arg,
    theme
})=>{
    return(
        <button 
            className={cx(style.ButtonColorMobile, style[`${theme}Mobile`])}
            onClick={()=>submit(arg)}
        >
            {label.toUpperCase()}
        </button>
    )
}

const ButtonColorSubmitMultiple = ({
    label,
    submit,
    theme
})=>{
    return(
        <button 
            className={cx(style.ButtonColorContainer, style[`${theme}`])}
            onClick={()=>submit[1]()}
        >
            {label.toUpperCase()}
        </button>
    )
}

const ButtonColorLarge = ({
    label,
    link
})=>{
    return(
          <Link href={link}>
            <a className={style.ButtonColorLarge}>
                {label} 
            </a>
          </Link>
    )
  }

const ButtonColorSubmitLarge = ({
    label,
    submit,
    arg,
    theme,
    icon,
    disable
})=>{
    return(
        <button 
            className={cx(style.ButtonColorContainerLarge, style[`${!disable ? theme : "disable"}`])}
            onClick={()=>{if(!disable)submit(arg)}}
        >
            {icon && <img className={style.IconeRight} src={icon} />}
            {label?.toUpperCase()}
        </button>
    )
}

ButtonColorSubmit.defaultProps = {
    theme: 'ColorIP'
}

ButtonColorSubmitMobile.defaultProps = {
    theme: 'ColorIP'
}

ButtonColorSubmitIcon.defaultProps = {
    theme: 'ColorIP'
}

ButtonColorSubmitMultiple.defaultProps = {
    theme: 'ColorIP'
}

ButtonColorSubmit.propTypes = {
    theme: PropTypes.string
}

ButtonColorSubmitMobile.propTypes = {
    theme: PropTypes.string
}

ButtonColorSubmitIcon.propTypes = {
    theme: PropTypes.string
}

ButtonColorSubmitMultiple.propTypes = {
    theme: PropTypes.string
}

export {ButtonColor,ButtonColorSubmit,ButtonColorSubmitMultiple,ButtonColorSubmitMobile,ButtonColorMobile,ButtonColorSubmitIcon, ButtonColorLarge,ButtonColorSubmitLarge}
