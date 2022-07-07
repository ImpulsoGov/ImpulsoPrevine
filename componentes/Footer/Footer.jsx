import React from "react";
import cx from "classnames";
import style from "./Footer.module.css";
const InstagramSVG = "/instagram.svg";
const LinkedInSVG ="/linked-in.svg";
const TwitterSVG = "/twitter.svg";

const Footer = ({
  theme,
  address,
  contactCopyright,
  links,
  socialMediaURLs
}) => {
  return (
    <div className={cx(style["containerFooter"], style["theme"+theme.cor+"Footer"])}>
      <div>
        <img
          className={style.logoWrapperFooter}
          alt="impulso-previne-logo"
          src= {String(theme.logoProjeto)}
        />
      </div>
      <div className={style.infoLinksWrapperFooter}>
        <div className={style.conteinerUpperFooter}>
          <div className={style.listFooter}>
            {links.map((item) => {
              return (
                <div key={item.label} className={style.itemFooter}>
                  <a href={item.url} className={style["theme"+theme.cor+"Footer"]}>
                      {item.label}
                  </a>
                </div>
              );
            })}
          </div>
          <div className={style.realizacaoFooter}>
            <div>Realização:</div>
            <div >
              <img className={style.logoImpulso}
                  alt="impulso-gov-logo"
                  src= {String(theme.logoImpulso)}
              />
            </div>
          </div>

        </div>
        
        <div className={style.contactAddressSocialMediasFooter}>
          <div className={style.contactAddressFooter}>
            <div>
                <div>{address.first}</div>
                <div>{address.second}</div>
            </div>
            <div className={style.contactFooter}>
                <div>{contactCopyright.email}</div>
                <div>{contactCopyright.copyright}</div>
            </div>
          </div>
          <div className={style.socialMediasFooter}>
            <a className={style.socialMediaFooter} href={socialMediaURLs.twitter}>
              <img
                className={style.socialMediaFooter}
                alt="twitter"
                src= {TwitterSVG}
              />
            </a>
            <a
              className={style.socialMediaFooter}
              href={socialMediaURLs.instagram}
            >
              <img
                className={style.socialMediaFooter}
                alt="instagram"
                src= {InstagramSVG}
              />
            </a>
            <a
              className={style.socialMediaFooter}
              href={socialMediaURLs.linkedIn}
            >
              <img
                className={style.socialMediaFooter}
                alt="linkedin"
                src= {LinkedInSVG}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export {Footer};