import Image from "next/image";
import style from "./HelpSection.module.css";

export const HelpSection: React.FC = () => {
    return (
        <div className={style.HelpSection}>
            <Image
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmj79dwo802g307khdui3x9ky"
                alt="Ícone do busca mais"
                width={129}
                height={22}
            />
            <p className={style.HelpText}>
                Ainda tem dúvidas sobre como usar o busca+mais? Confira o{" "}
                <br></br>
                vídeo abaixo com mais instruções.
            </p>
            <iframe
                className={style.HelpVideo}
                width="800"
                height="486"
                src="https://www.youtube.com/embed/DvGX3BiwgUw?si=FdmXOdw6ZvSWOhw3"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ border: "none" }}
            ></iframe>
        </div>
    );
};
