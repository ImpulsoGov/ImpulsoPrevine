import React from "react";

const ImagensFull = ({
  imagem
  }) => {
    return (
      <div className="containerBanner1 ">
        <img
            className="imageContainerBanner1"
            alt="BannerImage1"
            src= {String(imagem)}
          />
        <style jsx>{`
        .containerBanner1 {
          display: flex;
          height: 85%;
        }
        
        .imageContainerBanner1{
          width: 95%;
          border-radius: 0px 0px 25px 0px;
          object-fit: cover;
          }
          
          /* SMALL */
          @media screen and (max-width: 1023px) {
          .containerBanner1 {
            height: 50%;
          }
          .imageContainerBanner1{
            border-radius: 0px 0px 15px 0px;
          }  
          }
          
          /* MEDIUM */
          @media screen and (min-width: 1024px)and (max-width: 1400px) {
          .containerBanner1 {
            height: 70%;
          }
          .imageContainerBanner1{
            border-radius: 0px 0px 20px 0px;
          }
          }
          
          /* XLARGE */
          @media screen and (min-width: 1920px) {
          .containerBanner1 {
            height: 92%;
          }
          .imageContainerBanner1{
            border-radius: 0px 0px 30px 0px;
          }
          }        
        `}</style>
      </div>
  )};

  const ImagensFull2 = ({
    imagem
    }) => {
      return (
        <div className="containerBanner1-2 ">
          <img
              className="imageContainerBanner1-2"
              alt="BannerImage1"
              src= {String(imagem)}
            />
          <style jsx>{`
          .containerBanner1-2 {
            display: flex;
            height: 85%;
          }
          
          .imageContainerBanner1-2{
            width: 95%;
            border-radius: 0px 25px 25px 0px;
            object-fit: cover;
          }
          
          /* SMALL */
          @media screen and (max-width: 1023px) {
            .containerBanner1-2 {
              height: 50%;
            }
            .imageContainerBanner1-2{
              border-radius: 0px 15px 15px 0px;
              margin-bottom: 25px;
            }  
          }
          
          /* MEDIUM */
          @media screen and (min-width: 1024px)and (max-width: 1400px) {
            .containerBanner1-2 {
              height: 70%;
            }
            .imageContainerBanner1-2{
              border-radius: 0px 20px 20px 0px;
            }
          }
          
          /* XLARGE */
          @media screen and (min-width: 1920px) {
            .containerBanner1-2 {
              height: 92%;
            }
            .imageContainerBanner1-2{
              border-radius: 0px 30px 30px 0px;
            }
          }
          `}</style>
        </div>
    )};
  
  export {ImagensFull, ImagensFull2};