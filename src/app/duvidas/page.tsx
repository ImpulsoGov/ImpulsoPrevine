"use client";
import dynamic from "next/dynamic";
import style from "./Duvidas.module.css";

const IFrame = dynamic<{
    height: string;
    link: string;
}>(() => import("@impulsogov/design-system").then((mod) => mod.IFrame));
const ButtonLight = dynamic<{
    icone: {
        posicao: string;
        url: string;
    };
    label: string;
    link: string;
}>(() => import("@impulsogov/design-system").then((mod) => mod.ButtonLight));

const DuvidasPage = () => {
    return (
        <>
            <div className={style.BotaoVoltar}>
                <ButtonLight
                    icone={{
                        posicao: "right",
                        url: "https://media.graphassets.com/8NbkQQkyRSiouNfFpLOG",
                    }}
                    label="VOLTAR"
                    link="/capacitacoes"
                />
            </div>
            <IFrame
                height="2000"
                link="https://docs.google.com/forms/d/e/1FAIpQLSelCjrYy908a4dpluwiTI6uev78eDesDWKiHUixOheKzg1nhQ/viewform"
            />
        </>
    );
};

export default DuvidasPage;
