import React from "react";

import Typography, { ETYPOGRAPHY_VARIANTS } from "../Typography/Typography.jsx";
import FacebookSVG from "../estatico/facebook.svg";
import InstagramSVG from "../estatico/instagram.svg";
import LinkedInSVG from "../estatico/linked-in.svg";
import TwitterSVG from "../estatico/twitter.svg";
import ImpulsoPrevineLogo from "../estatico/impulso-previne-logo.svg"
import ImpulsoLogo from "../estatico/impulso-gov-logo-branco.svg"


const Footer = ({
  address,
  contactCopyright,
  links,
  socialMediaURLs
}) => {
  return (
    <div className="containerFooter ipColorthemeFooter">
      <div className="logoFrameFooter">
        <div className="logoWrapperFooter">
          <img
            alt="impulso-previne-logoFooter"
            src= {ImpulsoPrevineLogo}
          />
        </div>
      </div>
      <div className="infoLinksWrapperFooter">
        <ul className="listFooter">
          {links?.map((item) => {
            return (
              <li key={item.label} className="itemFooter">
                <a href={item.url}>
                  <Typography
                    as="span"
                    className="moreInfoLinkFooter"
                    variant={ETYPOGRAPHY_VARIANTS.BODY_M}
                  >
                    {item.label}
                  </Typography>
                </a>
              </li>
            );
          })}
          <div className="conteiner-logo-impulso-govFooter">
            <div className="realizacaoLabelFooter">Realização:</div>
            <div className="logo-impulsoFooter">
              <img 
                  alt="impulso-gov-logoFooter"
                  src= {ImpulsoLogo}
                />
              </div>
            </div>
        </ul>
        <div className="contactAddressSocialMediasFooter">
          <div className="contactAddressFooter">
            <div className="addressFooter">
              <Typography variant={ETYPOGRAPHY_VARIANTS.BODY_S} as="p">
                {address?.first},
              </Typography>
              <Typography variant={ETYPOGRAPHY_VARIANTS.BODY_S} as="p">
                {address?.second}
              </Typography>
            </div>
            <div className="contactFooter">
              <Typography variant={ETYPOGRAPHY_VARIANTS.BODY_S} as="p">
                {contactCopyright?.email}
              </Typography>
              <Typography variant={ETYPOGRAPHY_VARIANTS.BODY_S} as="p">
                {contactCopyright?.copyright}
              </Typography>
            </div>
          </div>
          <div className="socialMediasFooter">
            <a
              className="socialMediaFooter"
              href={socialMediaURLs?.facebook}
            >
              <img
                alt="facebook"
                src= {FacebookSVG}
              />
            </a>
            <a className="socialMediaFooter" href={socialMediaURLs?.twitter}>
              <img
                alt="twitter"
                src= {TwitterSVG}
              />
            </a>
            <a
              className="socialMediaFooter"
              href={socialMediaURLs?.instagram}
            >
              <img
                alt="instagram"
                src= {InstagramSVG}
              />
            </a>
            <a
              className="socialMediaFooter"
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
      <style jsx>{`
        .containerFooter {
          display: flex;
          padding: 70px 40px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          margin: 0;
        }
        .ipColorthemeFooter{
          background-color: #1F1F1F;

        }
        a, u {
          color: #FFFFFF;
          text-decoration: none;
        }

        .realizacaoLabelFooter {
          color:#FFFFFF;
          margin-right: 15px;
        }

        .logoWrapperFooter {
          height: 24px;
          min-width: 140px;
          max-width: 140px;
        }

        .logo-impulsoFooter {
          height: 24px;
          min-width: 140px;
          max-width: 140px;
        }


        .conteiner-logo-impulso-govFooter{
          margin-left: auto;
          display: flex;
          justify-content: center;
        }

        .logoFrameFooter {
          width: 20%;
          display: flex;
          justify-content: center;
        }

        .infoLinksWrapperFooter {
          width: 100%;
        }

        .listFooter {
          border-bottom: 0.1px solid #FFFFFF;
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          padding-bottom: 32px;
        }

        .itemFooter {
          padding-right: 24px;
        }

        .contactAddressSocialMediasFooter {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-top: 32px;
          width: 100%;
        }

        .contactAddressFooter {
          display: flex;
          margin-right: 94px;
        }

        .addressFooter {
          color:#FFFFFF;
        }

        .contactFooter {
          margin-left: 94px;
          width: 30%;
          color:#FFFFFF;
        }

        .socialMediasFooter {
          align-items: center;
          display: flex;
        }

        .socialMediaFooter {
          height: 20px;
        }

        .socialMedia:not(:last-child) {
          margin-right: 28px;
        }

        @media screen and (max-width: 1024px) {
          .containerFooter {
            display: block;
            padding: 48px 40px 58px 40px;
          }
          .realizacaoLabelFooter {
            margin-top: 15px;
            margin-bottom: 15px;
            margin-left: 0px;
            margin-right: 0;
            left: 0;
          }
          .conteiner-logo-impulso-govFooter{
            flex-direction: column;
            margin-left: 0;
            justify-content: center;
          }
          .logo-impulsoFooter {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            margin: 0;
            margin-left: 0;
          }
          
          .logoFrameFooter {
            width: 100%;
          }
          
            .infoLinksWrapperFooter {
            margin-left: 0;
          }

          .listFooter {
            display: block;
            margin-top: 26px;
            text-align: center;
          }

          .itemFooter {
            margin-top: 16px;
          }

          .contactAddressSocialMediasFooter {
            flex-direction: column;
            text-align: center;
          }

          .contactAddressFooter {
            display: block;
            margin-right: 0;
          }

          .contactFooter {
            margin-left: 0;
            margin-top: 10px;
            width: 100%;
          }

          .socialMediasFooter {
              margin-top: 20px;
            }
          }
      `}</style>
    </div>
  );
};

export {Footer};