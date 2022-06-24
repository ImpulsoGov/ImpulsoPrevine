import React from "react";
import cx from "classnames";
import styles from "./Parcerias.module.css";

let importAll = (r)=> {
    return r.keys().map(r);
  }
const images = importAll(require.context('../../public/parceiros', false, /\.(png|svg)$/));
const parceiros = images.map((image)=>{
    return(
        {
            alt: image.default.src.split("/").slice(-1)[0].split(".")[0],
            src: image.default.src
        }
    )
})
const Parcerias = ({
}) => {
  return (
    <div className={styles.container_parceiros}>
        <div className={styles.parceirosLabel}>Parceiros</div>
        <div className={styles.gridContainer}>
                {parceiros.map((parceiro)=>{
                    return(
                        <div className={styles.logo_parceiros}>
                            <img className={styles.imageContainer}
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