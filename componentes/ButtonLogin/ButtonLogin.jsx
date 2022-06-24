import React from "react";

// import "./ButtonLogin.css";

const ButtonLogin = ({
  }) => {
    return (
      <div>
        <button className="ButtonLogin">Entrar</button>
        <style jsx>{`
          .ButtonLogin{
            background-color: #145C56;
            color: #FFFFFF;
            border-radius: 30px;
            border: 1px solid #FFFFFF;
            width: 100%;
            height: 100%;
            padding: 15px;
            opacity: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .ButtonLogin:hover {opacity: 0.6}
        `}</style>
      </div>
    )}

export {ButtonLogin};