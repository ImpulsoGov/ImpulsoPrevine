import React from "react";
import Link from "next/link";
import styles from "./ButtonLogin.module.css";
const DownloadIcon = "/download-icon.svg";
const ManualIP = "/Manual Previne Brasil - Impulso Previne.pdf"

const ButtonLogin = ({
  title
  }) => {
    return (
      <div>
        <a href = {ManualIP} target="_blank">
          <button className={styles.ButtonLogin}>
            <img 
              src={DownloadIcon}
              className={styles.iconButton}
            ></img>
              {title}
          </button>
        </a>
      </div>
    )}

export {ButtonLogin};