import React, { Component } from "react";

import style from "./Slider.module.css"
const Right = "/right-icon.svg";
const Left = "/left-icon.svg";

const CoreSlider = ({
    titulo,
    subtitulo,
    corpo
}) => {
    return(
        <div className={style.cardSlider}>
            <div className={style.coreTitulo}>{titulo}</div>
            <div className={style.coreSubTitulo}>{subtitulo}</div>
            <div className={style.coreCorpo}>{corpo}</div>
        </div>
    )
}

const IconLeft = () => {
    return(
        <div>
            <img
                alt="left-icon"
                src= {Left}
            />
        </div>
    )
}

const Iconright = () => {
    return(
        <div>
            <img
                alt="right-icon"
                src= {Right}
            />
        </div>
    )
}

class Slider extends Component{
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            len: props.core.length - 1
        }
    }
    nextText() {
        let index = this.state.index
        let len = this.state.len
        if (index<len){
            this.setState({
                index: index + 1
            })
        }else{
            this.setState({
                index: 0
            })
        }
    }

    prevText() {
        let index = this.state.index
        let len = this.state.len
        if (index!=0){
            this.setState({
                index: index -1
            })
        }else{
            this.setState({
                index: len
            })
        }
    }
    
    render() {
        return(
            <div className={style.Slider}>
                <div className={style.tituloSlider}>{this.props.titulo}</div>
                <div className={style.coreSlider}>
                        <button className={style.btnSlider} onClick={() => this.prevText()}>
                            <IconLeft />
                        </button>
                    <CoreSlider
                        titulo = {this.props.core[this.state.index].titulo}
                        subtitulo = {this.props.core[this.state.index].subtitulo}
                        corpo = {this.props.core[this.state.index].corpo}
                    />
                    <button className={style.btnSlider} onClick={() => this.nextText()}>
                        <Iconright />
                    </button>
                </div>
                <div className={style.conteinerChamadaSlider}>
                    <a 
                        href={this.props.link}
                        className={style.chamadaSlider}>
                        {this.props.chamada.toUpperCase()}
                    </a>
                </div>
            </div>
        )
    }
}

export {Slider}