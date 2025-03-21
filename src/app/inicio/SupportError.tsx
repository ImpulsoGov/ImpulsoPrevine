'use client'
import Image from "next/image"
import { ButtonColor } from "@impulsogov/design-system"

export const SupportError = () => {
    return <div style={{display: "flex",gap: "94px", alignItems: "center", justifyContent: "center", padding: "200px"}}>
        <div 
            style={{
                fontFamily: "Inter",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "130%",
                letterSpacing: "-0.44px",
                color: "#1F1F1F",
                width: "330px",
            }}
        >
            <div style={{fontSize: "45px", fontWeight: 400, letterSpacing: "-0.9px", width: "fit-content", marginBottom: "40px"}}>Ops!</div>
            <div style={{marginBottom: "25px"}}>Não foi possível mostrar os dados dessa página.</div>
            <div style={{marginBottom: "40px"}}>Entre em contato com o nosso suporte pelo WhatsApp.</div>
            <ButtonColor
                icone={{
                    url: "https://media.graphassets.com/jjyU36OtQFOMAWY03IYW",
                    posicao: "right"
                }}
                label="Falar com o suporte"
                link="https://api.whatsapp.com/send?phone=5511941350260&text=Ol%C3%A1,%20atendente!%0AEntrei%20na%20minha%20conta%20do%20Impulso%20Previne%20e%20me%20deparei%20com%20uma%20mensagem%20de%20erro%20na%20tela%20inicial.%20N%C3%A3o%20consigo%20acessar%20nenhuma%20lista%20nominal!%20Me%20ajuda%20a%20resolver%20esse%20problema?"
            />
        </div>
        <Image 
            src="https://media.graphassets.com/xjMG7f9ESZSEUkvqs70k"
            alt="laptop-error-image"
            width={368}
            height={247}
        />
    </div>
}