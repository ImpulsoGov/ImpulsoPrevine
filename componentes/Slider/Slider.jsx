import React, { Component } from "react";

import "./Slider.css"
import Left from "../estatico/left-icon.svg"
import Right from "../estatico/right-icon.svg"

const CoreSlider = ({
    titulo,
    subtitulo,
    corpo
}) => {
    return(
        <div className="cardSlider">
            <div className="coreTitulo">{titulo}</div>
            <div className="coreSubTitulo">{subtitulo}</div>
            <div className="coreCorpo">{corpo}</div>
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
            <div className="Slider">
                <div className="tituloSlider">{this.props.titulo}</div>
                <div className="coreSlider">
                        <button className="btnSlider" onClick={() => this.prevText()}>
                            <IconLeft />
                        </button>
                    <CoreSlider
                        titulo = {this.props.core[this.state.index].titulo}
                        subtitulo = {this.props.core[this.state.index].subtitulo}
                        corpo = {this.props.core[this.state.index].corpo}
                    />
                    <button className="btnSlider" onClick={() => this.nextText()}>
                        <Iconright />
                    </button>
                </div>
                <div className="conteinerChamadaSlider">
                    <a className="chamadaSlider">
                        {this.props.chamada}
                    </a>
                </div>
            </div>
        )
    }
}

export {Slider}