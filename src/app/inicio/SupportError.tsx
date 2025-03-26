"use client";
import Image from "next/image";
import { ButtonColor } from "@impulsogov/design-system";
import { SupportErrorWhatsAppLink } from "@/constants/whatsAppLinks";

export const SupportError = () => {
    return (
        <div
            style={{
                display: "flex",
                gap: "94px",
                alignItems: "center",
                justifyContent: "center",
                padding: "200px",
            }}
        >
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
                <div
                    style={{
                        fontSize: "45px",
                        fontWeight: 400,
                        letterSpacing: "-0.9px",
                        width: "fit-content",
                        marginBottom: "40px",
                    }}
                >
                    Ops!
                </div>
                <div style={{ marginBottom: "25px" }}>
                    Não foi possível mostrar os dados dessa página.
                </div>
                <div style={{ marginBottom: "40px" }}>
                    Entre em contato com o nosso suporte pelo WhatsApp.
                </div>
                <ButtonColor
                    icone={{
                        url: "https://media.graphassets.com/jjyU36OtQFOMAWY03IYW",
                        posicao: "right",
                    }}
                    label="Falar com o suporte"
                    link={SupportErrorWhatsAppLink}
                />
            </div>
            <Image
                src="https://media.graphassets.com/xjMG7f9ESZSEUkvqs70k"
                alt="laptop-error-image"
                width={368}
                height={247}
            />
        </div>
    );
};
