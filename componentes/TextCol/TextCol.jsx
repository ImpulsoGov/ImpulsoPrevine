import React from "react";

const TextCol = ({
    titulo,
    corpo
}) => {
  return (
      <div className="TextCol">
          <div className="TextColTitle">{titulo}</div>
          <div className="TextColBody">{corpo}</div>
        <style jsx>{`
            .TextCol{
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                padding: 35px 70px 100px 0px;
                text-align: left;
                margin-right: 60px;
            }
            .TextColTitle{
                font-size: 32px;
                margin-bottom: 45px;
            }
            .TextColBody{
                font-size: 24px;
            }
            /* SMALL */
            @media screen and (max-width: 1023px) {
                .TextCol{
                    margin: 0 0 25px 0;
                    padding: 0;
                }
                .TextColTitle{
                    font-size: 32px;
                    margin-bottom: 20px;
                }
                .TextColBody{
                    font-size: 14px;
                    margin: 0;
                }
            }
            /* MEDIUM */
            @media screen and (min-width: 1024px) and (max-width: 1439px) {
                .TextColTitle{
                    font-size: 24px;
                    margin-bottom: 20px;
                }
                .TextColBody{
                    font-size: 16px;
                }
            }
            /* XLARGE */
            @media screen and (min-width: 1920px) {
                .TextCol{
                    margin: 0 0 40px 0;
                    padding: 60px 220px 120px 0px;
                }
                .TextColTitle{
                    font-size: 46px;
                    margin-bottom: 60px;
                }
                .TextColBody{
                    font-size: 28px;
                }
            }        
        `}</style>
      </div>
)};

export {TextCol};