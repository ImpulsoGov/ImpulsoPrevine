import React, {useState} from "react";
import cx from "classnames";
import style from"./NavBar.module.css";
const NavBarIconBranco  = "/hamburgerIconBranco.svg"
const NavBarIconDark  = "/hamburgerIconDark.svg"

const NavBarMenu = (tema) => {
  let theme = (tema=="ColorIP") ?  NavBarIconBranco : NavBarIconDark
  return theme
}
const Dropdown = (props) => {
  return (
    <div className={style["dropdownNavBar"]}>
      <div>{props.link}</div>
      <div className={style.dropdownContentNavBar}>
        <div className={style.iconDropdownNavBar}>
          <div className={style.iconDropdownContainerNavBar}></div>
        </div>
        <div className={style.itensDropdownNavBar}>
          {props.subtitles.map((subtitle,index)=>{
            return(
              <div key={index}>
                <div className={style.dropdownItemNavBar}><a href={subtitle.url}>{subtitle.label}</a></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
const DropdownMenu = (attr) => {  
  if (attr.index==2){
    return(
      <Dropdown 
        link={attr.link.label}
        subtitles={attr.props.subtitles}
      />
    )
  }else{
    return(
      <a href={attr.link.url} className={style["theme"+attr.props.theme.cor]}>
        {attr.link.label}
      </a>
    )
  }
}

const DropdownMenuMoblie = (attr) => {  
  const [active,setMode] = useState(false)
  const menuVisible = () =>{
    setMode(!active)
    return active
  }

  if (attr.index==0){
    return(
      <div>
        <a
          onClick = {menuVisible} 
        >{attr.link.label}
        </a>
        { active &&
          <div className={cx(style.subMenuMoblie, style.themeColorIP)}>
            {attr.props.subtitles.map((subtitle)=>{
              return(
                <a 
                  href={subtitle.url}
                  className={style.linkNavBarMoblie}>{subtitle.label}</a>
              )
            })}
          </div>
        }
      </div>
    )
  }else{
    return(
      <a href={attr.link.label}>
        {attr.link.label}
      </a>
    )
  }
}

const NavBar = (props) => {
  const [active,setMode] = useState(true)
  const menuVisible = () =>{
    setMode(!active)
    return active
  }
  return (
    <div>
      <div className={cx(style.container_navbar,style["theme"+props.theme.cor])}>
        <div className={style.logoWrapper_navbar}>
          <div className={style.logo_navbar}>
            <a href="/">
              <img
                  alt="impulso-previne-logo_navbar"
                  src= {String(props.theme.logoProjeto)}
                />
              </a>
          </div>
        </div>

            <div className={style.links_navbar}>
              {props.menu.map((link, index) => {
                  return (
                    <div key={index} className={style.link_navbar}>
                      {DropdownMenu({index,link,props})}
                    </div>
                  );
                })}
            </div>

          <div className={style["buttonMoblie"+props.theme.cor]}
            onClick = {menuVisible} 
          >
            <img
                id="navBarIcon"
                alt="NavBarIcon"
                src= {NavBarMenu(props.theme.cor)}
              />
          </div>
      </div>
      <div className={active ?  style["linksNavBarMoblie"] : cx(style["linksNavBarMoblie"], style["linksNavBarMoblieVisible"])}>
        {props.menu.map((link, index) => {
              return (
                <div key={index} className={style.link_navbar}>
                  {DropdownMenuMoblie({index,link,props})}
                </div>
              );
        })}

      </div>
    </div>
)};

export {NavBar};