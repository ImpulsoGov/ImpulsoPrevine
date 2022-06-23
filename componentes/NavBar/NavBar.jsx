import React from "react";

// import "./NavBar.css";
import Typography, { ETYPOGRAPHY_VARIANTS } from "../Typography/Typography.jsx";
import {ButtonLogin} from "../ButtonLogin/ButtonLogin.jsx";
const ImpulsoPrevineLogo = "/impulso-previne-logo.svg";

const NavBar = ({
  links,
  municipios
}) => {
  return (
    <div className="container_navbar">
      <div className="logoWrappe_navbar">
        <div className="logo_navbar">
          <a href="/">
            <img
              alt="impulso-previne-logo_navbar"
              src= {ImpulsoPrevineLogo}
            />
          </a>
        </div>
      </div>
          <ul className="links_navbar">
            {links?.map((link, index) => {
              return (
                <li key={index} className="link_navbar">
                  <a href={link?.url}>
                    <Typography
                      as="span"
                      className="linkLabel_navbar"
                      variant={ETYPOGRAPHY_VARIANTS.BODY_M}
                    >
                      {link?.label}
                    </Typography>
                  </a>
                </li>
              );
            })}
          </ul>
        <style jsx>{`
        html,body {
          height:100%;
          margin:0;
          padding:0;
        }
        .container_navbar {
            background-color: #145C56;
            color: #FFFFFF;
            display: flex;
            padding: 28px 40px;
            top: 0;
            margin: 0;
            text-align: left;
          }
          .logoWrapper_navbar {
            height: 24px;
            width: 372px;
          }
          
          .logo_navbar {
            height: 24px;
            width: 140px;
            position: relative;
          }
            
          .links_navbar {
            display: flex;
            list-style: none;
            margin: 0;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          
          .link_navbar {
            padding-right: 24px;
            white-space: nowrap;
          }
          
          .containerCidadeLogin_navbar {
            align-items: center;
            display: flex;
            height: 100%;
            margin-left: auto;
            justify-content: center;
          }
          
          .ButtonLoginBox_navbar {
            height: 30px;
            margin-right: 15px;
            margin-left: 10px;
          }
        
          .citySelect_navbar{
            background-color: #145C56;
            color: #FFFFFF;
            border: none;
            text-align: center;
          }
        
          .citySelect_navbar select {
            display: none; /*hide original SELECT element:*/
          }
          
          @media screen and (max-width: 790px) {
            .container_navbar {
              padding: 15px;
              padding-top: 25px;
              flex-direction: column;
              align-items: center;
            }
            .links_navbar{
              flex-direction: column;
              justify-content: center;
            }
            .link_navbar{
              margin-top: 15px;
              text-align: center;
            }
            .containerCidadeLogin_navbar {
              display: flex;
              flex-direction: column;
              height: fit-content;
              width: 100%;
              margin-top: 10px;
              justify-content: center;
            }
        
            .ButtonLoginBox_navbar {
              height: 30px;
              margin-right: 0px;
              margin-top: 10px;
              position: relative;
              left: 0;
            }
          
          }        
        `}</style>
    </div>
)};

export {NavBar};