import React from "react";
import cx from "classnames";

import Typography, { ETYPOGRAPHY_VARIANTS } from "../Typography/Typography.jsx";
const FacebookSVG = "/facebook.svg";
const InstagramSVG = "/instagram.svg";
const LinkedInSVG = "/linked-in.svg";
const TwitterSVG = "/twitter.svg";
const ImpulsoPrevineLogo = "/impulso-previne-logo.svg";
const ImpulsoLogo = "/impulso-gov-logo-branco.svg";
import styles from "./Footer.module.css";

const Footer = ({
  address,
  contactCopyright,
  links,
  socialMediaURLs
}) => {
  return (
    <div className={cx(styles.containerFooter, styles.ipColorthemeFooter)}>
      <div className={styles.logoFrameFooter}>
        <div className={styles.logoWrapperFooter}>
          <img
            alt="impulso-previne-logoFooter"
            src={ImpulsoPrevineLogo}
          />
        </div>
      </div>
      <div className={styles.infoLinksWrapperFooter}>
        <ul className={styles.listFooter}>
          {links?.map((item) => {
            return (
              <li key={item.label} className={styles.itemFooter}>
                <a href={item.url}>
                  <Typography
                    as="span"
                    className={styles.moreInfoLinkFooter}
                    variant={ETYPOGRAPHY_VARIANTS.BODY_M}
                  >
                    {item.label}
                  </Typography>
                </a>
              </li>
            );
          })}
          <div className={styles.conteinerLogoImpulsoGovFooter}>
            <div className={styles.realizacaoLabelFooter}>Realização:</div>
            <div className={styles.logoImpulsoFooter}>
              <a href="https://impulsogov.org/">
                <img 
                    alt="impulso-gov-logoFooter"
                    src={ImpulsoLogo}
                  />
              </a>
              </div>
            </div>
        </ul>
        <div className={styles.contactAddressSocialMediasFooter}>
          <div className={styles.contactAddressFooter}>
            <div className={styles.addressFooter}>
              <Typography variant={ETYPOGRAPHY_VARIANTS.BODY_S} as="p">
                {address?.first},
              </Typography>
              <Typography variant={ETYPOGRAPHY_VARIANTS.BODY_S} as="p">
                {address?.second}
              </Typography>
            </div>
            <div className={styles.contactFooter}>
              <Typography variant={ETYPOGRAPHY_VARIANTS.BODY_S} as="p">
                {contactCopyright?.email}
              </Typography>
              <Typography variant={ETYPOGRAPHY_VARIANTS.BODY_S} as="p">
                {contactCopyright?.copyright}
              </Typography>
            </div>
          </div>
          <div className={styles.socialMediasFooter}>
            <a
              className={styles.socialMediaFooter}
              href={socialMediaURLs?.facebook}
            >
              <img
                alt="facebook"
                src= {FacebookSVG}
              />
            </a>
            <a className={styles.socialMediaFooter} href={socialMediaURLs?.twitter}>
              <img
                alt="twitter"
                src= {TwitterSVG}
              />
            </a>
            <a
              className={styles.socialMediaFooter}
              href={socialMediaURLs?.instagram}
            >
              <img
                alt="instagram"
                src= {InstagramSVG}
              />
            </a>
            <a
              className={styles.socialMediaFooter}
              href={socialMediaURLs?.linkedIn}
            >
              <img
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