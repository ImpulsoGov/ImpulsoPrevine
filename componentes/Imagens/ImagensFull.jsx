import React from "react";

import "./ImagensFull.css";
import "./ImagensFull2.css";

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
        </div>
    )};
  
  export {ImagensFull, ImagensFull2};