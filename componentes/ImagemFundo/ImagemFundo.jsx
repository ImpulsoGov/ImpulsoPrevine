import React from "react";

import style from "./ImagemFundo.module.css"
const ImagemFundoPNG = "/imagem-fundo.png"

const ImagemFundo = ({
    chamada,
    chamadacolor,
    cards,
    botao
}) =>{
    return(
        <div className={style.containerImagemFundo}>
            <div className={style.containerImagemGradiente}>
                <img
                    className={style.imagemFundo}
                    src={ImagemFundoPNG}
                />
                <div className={style.gradienteImagemFundo}>
                    <div className={style.chamadaImagemFundo}>{chamada}<span className={style.chamadaColor}>{chamadacolor}</span></div>
                    <div className={style.cardsImagemFundo}>
                        {cards.map((card,index)=>{
                            return(
                                <div className={style.cardImagemFundo} key={index}>
                                    <div className={style.cardTitleImagemFundo}>{card.title}</div>
                                    <div className={style.cardBodyImagemFundo}>{card.body}</div>
                                </div>
                            )
                    })}
                    </div>
                    <a href={botao.url} className={style.botaoImagemFundo}>{botao.label.toUpperCase()}</a>
                </div>
            </div>
        </div>
    )
}

export {ImagemFundo}