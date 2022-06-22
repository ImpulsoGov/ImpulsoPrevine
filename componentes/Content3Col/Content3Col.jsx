import React from "react";

const Content3Col = ({
    titulo,
    child1,
    child2,
    child3
}) => {
  return (
      <div className="Content3Col">
          <div className="Content3ColTitulo">{titulo}</div>
          <div className="Content3ColGrid">
            {child1}
            {child2}
            {child3}
          </div>
          <style jsx>{`
          .Content3Col{
              background-color: #2EB280;
              border-radius: 0px 64px 64px 0px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              padding: 82px;
          }
          .Content3ColTitulo{
              font-size: 64px;
              margin-top: 100px;
              margin-bottom: 100px;
          }
          .Content3ColGrid{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
          }
          
          /* SMALL */
          @media screen and (max-width: 1023px) {
              .Content3Col{
                  border-radius: 0px 48px 48px 0px;
                  padding: 64px;
              }
              .Content3ColTitulo{
                  font-size: 32px;
                  margin-top: 20px;
                  margin-bottom: 50px;
                  width: 100%;
              }
              .Content3ColGrid{
                  flex-direction: column;
              }
              }
          /* MEDIUM */
          @media screen and (min-width: 1024px) and (max-width: 1439px) {
              .Content3Col{
                  padding: 82px;
              }
              .Content3ColTitulo{
                  font-size: 48px;
                  margin-top: 80px;
                  margin-bottom: 80px;
              }
          }
          /* XLARGE */
          @media screen and (min-width: 1920px) {
              .Content3Col{
                  padding: 120px 90px 80px 120px;
                  border-radius: 0px 82px 82px 0px;
              }
              .Content3ColTitulo{
                  font-size: 96px;
                  margin-top: 120px;
                  margin-bottom: 120px;
              }
          }
          `}</style>
      </div>
)};

export {Content3Col};