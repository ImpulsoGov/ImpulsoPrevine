import React, {useState,useRef,useEffect} from "react";
import style from "./ModalAlert.module.css";
import style_v2 from "./ModalAlertV2.module.css";
import style_v3 from "./ModalAlertV3.module.css";
import { ButtonColor,ButtonColorMobile, ButtonColorSubmit } from "../ButtonColor";

const CardProfissional = ({cardProfissional})=>{
    return(
        <div className={style.CardProfissional}>
            <div className={style.CardProfissionalContainer}>
                <div className={style.Profissional}>
                    <img src={cardProfissional.profissional} alt="profissional" />
                </div>
                <div className={style.ProfissionalLogo}>
                    <img src={cardProfissional.logo} alt="logo" />
                </div>
            </div>
            <p className={style.ProfissionalInfo}>{cardProfissional.nome}</p>
            <p className={style.ProfissionalInfo}>{cardProfissional.cargo}</p>
        </div>
    )
}
const CardProfissionalV2 = ({cardProfissional})=>{
    return(
        <div className={style_v2.CardProfissional}>
            <div className={style_v2.CardProfissionalContainer}>
                <div className={style_v2.Profissional}>
                    <img 
                        src={cardProfissional.profissional} 
                        alt="profissional" 
                        height="100%" 
                        width="100%" 
                        style={{borderRadius : "100% 100% 100% 20px"}}
                    />
                </div>
            </div>
            <div style={{marginTop : "15px"}}>
                <p className={style_v2.ProfissionalInfoNome}>{cardProfissional.nome}</p>
                <p className={style_v2.ProfissionalInfoCargo}>{cardProfissional.cargo}</p>
            </div>
        </div>
    )
}

const Alert = ({
    refModal,
    props
})=>{
    return (
        <div className={style.Alert} ref={refModal}>
            <div className={style.close}>
                <a 
                    className={style.ModalExit}
                    onClick={()=>props.setDisplay(false)}
                ></a>
            </div>
            <div className={style.Container}>
                <div className={style.ContainerTitulo}>
                    <div className={style.SubTitulo}>{props.titulos.SubTitulo}</div>
                    <div className={style.Titulo}>{props.titulos.Titulo}</div>
                </div>
                <CardProfissional cardProfissional={props.cardProfissional} />
            </div>
            <div className={style.ContainerInfo}>
                {
                    props.Info.map((item,index)=>{
                        return(
                            <div className={style.Info} key={index}>
                                <img src={item.icon} alt="icon"/>
                                <div>{item.info}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={style.botaoDesktop}><ButtonColor label={props.botao.label} link={props.botao.url} /></div>
            <div className={style.botaoMobile}><ButtonColorMobile label={props.botao.label} link={props.botao.url} /></div>
        </div>
    )
}
const Alert_v2 = ({
    refModal,
    props
})=>{
    return (
        <div className={style_v2.Alert} ref={refModal}>
            <div className={style_v2.close}>
                <a 
                    className={style_v2.ModalExit}
                    onClick={()=>props.setDisplay(false)}
                ></a>
                <CardProfissionalV2 cardProfissional={props.cardProfissional} />
            </div>
            <div className={style_v2.Container}>
                <div className={style_v2.ContainerTitulo}>
                    <div>
                        <div className={style_v2.Titulo}>{props.titulos.Titulo}</div>
                        <div className={style_v2.SubTitulo}>{props.titulos.SubTitulo}</div>
                    </div>
                    <div className={style_v2.ContainerInfo}>
                        {
                            props.Info.map((item,index)=>{
                                return(
                                    <div className={style_v2.Info} key={index}>
                                        <img src={item.icon} alt="icon"/>
                                        <div>{item.info}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={style_v2.botaoDesktop}>
                        <ButtonColor label={props.botao.label} link={props.botao.url} nova_aba={true}/>
                        <p style={{width : "50%", textAlign : "center"}}>Evento exclusivo para municípios parceiros</p>
                    </div>
                    <div className={style_v2.botaoMobile}><ButtonColorMobile label={props.botao.label} link={props.botao.url} /></div>
                </div>
            </div>
        </div>
    )
}
const AtualizacaoCadastral = ({
    refModal,
    props
})=>{
    return (
        <div className={style_v3.Alert} ref={refModal}>
            <div className={style_v3.close}>
                <a 
                    className={style_v3.ModalExit}
                    onClick={()=>props.setDisplay(false)}
                ></a>
                <img className={style_v3.Imagem} src={props.imagem} height={"100%"} />
            </div>
            <div className={style_v3.Container}>
                <div className={style_v3.ContainerTitulo}>
                    <div>
                        <div className={style_v3.Titulo}>{props.titulos.Titulo}</div>
                        <div className={style_v3.SubTitulo}>{props.titulos.SubTitulo}</div>
                    </div>
                    <div className={style_v3.ContainerInfo}>{props.Info}
                    </div>
                    <div className={style_v3.botaoDesktop}>
                        <ButtonColor label={props.botao.label} link={props.botao.url} nova_aba={true}/>
                    </div>
                    <div className={style_v3.botaoMobile}><ButtonColorMobile label={props.botao.label} link={props.botao.url} /></div>
                </div>
            </div>
        </div>
    )
}

const NPS = ({props})=>{
    const [avaliacao,setAvaliacao] = useState(0)
    const [avaliacaoHover,setAvaliacaoHover] = useState(0)
    const avaliacoes = [1,2,3,4,5]
    return(
        <div className={style.NPS}>
        <div className={style.tituloNPS}>{props.titulo}</div>
        <div className={style.NPSAvaliacao}>
            {avaliacoes.map((item)=>{
                return(
                    <div 
                        className={
                            avaliacaoHover+1 <= item ?
                            style.avaliacao : 
                            style.avaliacaoColor 
                        } 
                        key={item}
                        onMouseEnter={()=>{setAvaliacaoHover(item)}}
                        onMouseLeave={()=>{setAvaliacaoHover(avaliacao==0 ? 0 : avaliacao)}}
                        onClick={()=>setAvaliacao(item)}
    >{item}</div>
                )
            })}
        </div>
        <div className={style.escala}>
            <div>Muito ruim</div>
            <div>Muito boa</div>
        </div>
        <ButtonColorSubmit
            label="Avaliar"
            submit={props.submit}
            arg={{"user":props.user,"avaliacao":avaliacao,"token":props.token}}
            disable={avaliacao==0}
        />
        </div>
    )
}
const CardAlertModal = ({
    refModal,
    props
})=>{
    return (
        <div className={style.Alert} ref={refModal}>
            <div className={style.close}>
                <a 
                    className={style.ModalExit}
                    onClick={()=>props.setDisplay(false)}
                ></a>
            </div>
            <div className={style.Container}>
                <props.child props={{...props.childProps}} />
            </div>
        </div>
    )
}
const ModalAlert= ({Child,childProps})=>{
    const [display, setDisplay] = useState(true)
    const refModal = useRef()
    useEffect(() => {
      const handleClick = e => {if (display && !refModal?.current?.contains(e.target)) setDisplay(false);}
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    },[display]);
      return(
            display &&
            <div className={style.ModalAlert}> 
                <Child refModal={refModal} props={{...childProps,setDisplay}}/>
            </div>
    )
}
const ModalAlertOff= ({Child,childProps,display,setDisplay})=>{
    const refModal = useRef()
    useEffect(() => {
        const handleClick = e => {if (!display && !refModal?.current.contains(e.target)) setDisplay(false);}
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    },[display]);
        return(
            display &&
            <div className={style.ModalAlert}> 
                <Child refModal={refModal} props={{...childProps,setDisplay : setDisplay}}/>
            </div>
    )
}

export { ModalAlert,Alert,CardAlertModal,ModalAlertOff,NPS, Alert_v2, AtualizacaoCadastral }