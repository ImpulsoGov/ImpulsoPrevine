import React from "react";
import cx from "classnames";
import "./Parcerias.css";

let importAll = (r)=> {
    return r.keys().map(r);
  }
const images = importAll(require.context('../estatico/parceiros', false, /\.(png|svg)$/));
const parceiros = images.map((image)=>{
    return(
        {
            alt: image.split("/").slice(-1)[0].split(".")[0],
            src: image
        }
    )
})
const Parcerias = ({
}) => {
  return (
    <div className="container_parceiros">
        <div className="parceirosLabel">Parceiros</div>
        <div className="gridContainer">
                {parceiros.map((parceiro)=>{
                    return(
                        <div className="logo_parceiros">
                            <img className="imageContainer"
                            alt= {parceiro.alt}
                            src= {parceiro.src}
                            />
                        </div>
                    )
                })}
        </div>
    </div>
  );
};

export {Parcerias};