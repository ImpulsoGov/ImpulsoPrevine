import React, { Component } from "react";

// import "./Slider.css"
const Right = "/right-icon.svg";
const Left = "/left-icon.svg";

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
                <style jsx>{`
                    .Slider{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        background-color: #E5E5E5;
                        padding: 75px 100px 75px 100px;
                        font-family: 'Inter';
                        font-style: normal;
                        font-weight: 400;
                    }
                    .coreSlider{
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 180px;
                        justify-content: center;
                        align-items: center;
                    }
                    .tituloSlider{
                        text-align: center;
                        font-size: 64px;
                        margin-bottom: 200px;
                    }
                    .btnSlider{
                        border-radius: 50%;
                        background: #1D856C;
                        padding: 15px;
                        border: none;
                        height: 64px;
                        width: 64px;
                    }
                    .btnSlider:hover {
                        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
                        background-color: #ef8264;
                    }
                    
                    .cardSlider{
                        width: 550px;
                        text-align: center;
                        margin-left: 260px;
                        margin-right: 260px;
                    }
                    .coreTitulo{
                        font-size: 32px;
                        margin-bottom: 15px;
                    }
                    .coreSubTitulo{
                        font-size: 24px;
                        margin-bottom: 15px;
                        color: #1D856C;
                    }
                    .coreCorpo{
                        font-size: 24px;
                    }
                    .conteinerChamadaSlider{
                        display: flex;
                        justify-content: center;
                    }
                    .chamadaSlider{
                        display: block;
                        background: #1D856C;
                        border-radius: 100px;
                        font-size: 15px;
                        color: #FFFFFF;
                        padding: 15px;
                        width: fit-content;
                    }
                    .chamadaSlider:hover {
                        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
                        background-color: #ef8264;
                    }
                    
                    /* SMALL */
                    @media screen and (max-width: 1023px) {
                        .Slider{
                            padding: 15px;
                        }
                        .coreSlider{
                            margin-bottom: 25px;
                        }
                        .tituloSlider{
                            font-size: 32px;
                            margin-bottom: 20px;
                        }
                        .btnSlider{
                            width: 24px;
                            height: 24px;
                            padding: 10px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        
                        .cardSlider{
                            width: 550px;
                            margin-left: 0px;
                            margin-right: 0px;
                        }
                        .coreTitulo{
                            font-size: 18px;
                            margin-bottom: 15px;
                        }
                        .coreSubTitulo{
                            font-size: 16px;
                            margin-bottom: 15px;
                        }
                        .coreCorpo{
                            font-size: 14px;
                        }
                        .chamadaSlider{
                            font-size: 12px;
                            padding: 15px;
                            text-align: center;
                        }
                    }
                    /* MEDIUM */
                    @media screen and (min-width: 1024px) and (max-width: 1439px) {
                        .Slider{
                            padding: 35px 50px 35px 50px;
                        }
                        .coreSlider{
                            margin-bottom: 120px;
                        }
                        .tituloSlider{
                            font-size: 48px;
                            margin-bottom: 100px;
                        }
                        .cardSlider{
                            width: 550px;
                            margin-left: 240px;
                            margin-right: 240px;
                        }
                        .btnSlider{
                            width: 42px;
                            height: 42px;
                        }
                    
                        .coreTitulo{
                            font-size: 28px;
                            margin-bottom: 15px;
                        }
                        .coreSubTitulo{
                            font-size: 24px;
                            margin-bottom: 15px;
                        }
                        .coreCorpo{
                            font-size: 16px;
                        }
                        .chamadaSlider{
                            font-size: 14px;
                        }
                    }
                    /* XLARGE */
                    @media screen and (min-width: 1920px) {
                        .Slider{
                            padding: 100px 80px 100px 80px;
                        }
                        .coreSlider{
                            margin-bottom: 240px;
                            padding: 0;
                        }
                        .tituloSlider{
                            font-size: 85px;
                            margin-bottom: 260px;
                        }
                        .btnSlider{
                            width: 90px;
                            height: 90px;
                        }
                        .cardSlider{
                            width: 750px;
                            margin-left: 330px;
                            margin-right: 330px;
                        }
                        .coreTitulo{
                            font-size: 42px;
                            margin-bottom: 15px;
                        }
                        .coreSubTitulo{
                            font-size: 34px;
                            margin-bottom: 15px;
                        }
                        .coreCorpo{
                            font-size: 32px;
                        }
                        .chamadaSlider{
                            font-size: 20px;
                            padding: 18px;
                        }
                    }
                    
                `}</style>
            </div>
        )
    }
}

export {Slider}