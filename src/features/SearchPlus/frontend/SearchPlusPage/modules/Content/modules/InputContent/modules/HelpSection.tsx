import Image from "next/image";

export const HelpSection: React.FC = () => {
    return (
        <div
            style={{
                width: "100%",
                backgroundColor: "#3679B1",
                paddingTop: "80px",
                paddingLeft: "80px",
                paddingRight: "80px",
                paddingBottom: "196px",
            }}
        >
            <Image
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmj79dwo802g307khdui3x9ky"
                alt="Ícone do busca mais"
                width={129}
                height={22}
            />
            <p
                style={{
                    paddingTop: "50px",
                    paddingBottom: "36px",
                    margin: "0px",
                    color: "#ADE3F4",
                    fontSize: "32px",
                    fontWeight: 400,
                    lineHeight: "130%",
                }}
            >
                Ainda tem dúvidas sobre como usar o busca+mais? Confira o{" "}
                <br></br>
                vídeo abaixo com mais instruções.
            </p>
            <iframe
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
