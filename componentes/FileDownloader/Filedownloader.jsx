import React, {useState} from "react";

import styles from "./FileDownloader.module.css"
import * as EmailValidator from 'email-validator';
import { saveAs } from "file-saver";
const ManualIP = "/Manual Previne Brasil - Impulso Previne.pdf"
const DownloadIcon = "/download-icon.svg";

const FileDownloader = () =>{
    const [value, setValue] = useState("");
    const mailChange = event =>{
        return setValue(event.target.value)
    }
    const enviarMail = event =>{
        if(EmailValidator.validate(value)){
            saveAs(
                ManualIP,
                "Manual Previne Brasil - Impulso Previne.pdf"
              );
        }else{
            alert("E-mail invalido")
        }

    }
        
    return(
        <div className={styles.FileDownloaderContainer}>
            <div>
                <div className={styles.FileDownloaderTitle}>Receba um manual gratuito e simplificado com todos os detalhes sobre o Previne Brasil.</div>
                <div className={styles.FileDownloaderContainerButtonField}>
                    <form 
                        onSubmit={enviarMail} 
                        className={styles.FileDownloaderContainerButtonField}
                    >
                        <input 
                            className={styles.FileDownloaderInput}
                            placeholder="Digite Seu E-mail" 
                            type="text"
                            value={value}
                            onChange={mailChange}
                        ></input>
                            <button 
                                type="submit"
                                className={styles.ButtonDownload}
                            >
                                <img 
                                    src={DownloadIcon}
                                    className={styles.iconButton}
                                ></img>
                                Baixar Manual
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export {FileDownloader};