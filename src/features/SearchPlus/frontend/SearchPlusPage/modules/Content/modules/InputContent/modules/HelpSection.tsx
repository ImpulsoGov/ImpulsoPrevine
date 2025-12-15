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
            <div style={{ padding: "54.16% 0 0 0", position: "relative" }}>
                <iframe
                    src="https://player.vimeo.com/video/1146719361?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "60%",
                        height: "60%",
                        border: "none",
                    }}
                ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
    );
};
