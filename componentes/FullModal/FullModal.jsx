import React from "react";
import style from "./FullModal.module.css"
import { useState } from "react";

const FullModal = ({
    logo,
    children,
    back,
    backLink
})=>{
    const [Formulario, setFormulario] = useState(0);
    let handleSubmit = async (e) => {
        e.preventDefault();
        if (senha!=confirmarSenha){setMessage("As senhas não estão iguais");return null}
        try {
          let res = await fetch("https://httpbin.org/post", {
            method: "POST",
            body: JSON.stringify({
              senha: senha,
            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setSenha("");
            setConfirmarSenha("");
            setMessage("Municipio Cadastrado com Sucesso ");
          } else {
            setMessage("Erro");
          }
        } catch (err) {
          console.log(err);
        }
      };

    return(
        <div className={style.FullModalContainer}>
            <div className={style.FullModalLeftContainer}>
                <a 
                    className={style.FullModalBackButton}
                    href={backLink}
                >
                    <img
                        src={back}
                    />
                </a>
                <div className={style.FullModalLogo}>
                    <img
                        src={logo}
                    />
                </div>
            </div>
            <div className={style.FullModalRightContainer}>
                {children}
            </div>
        </div>
    )
}

export {FullModal}