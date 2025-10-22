import { ListTitles } from "../carePathways";
import Image from "next/image";
import type { HeaderData } from "../..";

export const Header: React.FC<HeaderData> = ({
    thematicList,
    createdAtDate,
    createdAtTime,
}) => {
    const now = new Date();
    const nowDate = now.toLocaleDateString("pt-BR");
    const nowTime = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (thematicList)
        return (
            <div
                style={{
                    fontFamily: `Inter, sans-serif`,
                    fontSize: "14px",
                    marginBottom: "26px",
                    lineHeight: "150%",
                    display: "flex",
                }}
            >
                <div>
                    <div style={{ fontWeight: 600 }}>
                        {ListTitles[thematicList]}
                    </div>
                    <div style={{ fontStyle: "italic", fontWeight: 400 }}>
                        Lista convertida em {nowDate} - às {nowTime}
                    </div>
                    <div style={{ fontStyle: "italic", fontWeight: 400 }}>
                        Relatório exportado do PEC em {createdAtDate} - às{" "}
                        {createdAtTime}
                    </div>
                </div>
                <div
                    style={{
                        marginLeft: "auto",
                    }}
                >
                    <Image
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh2d70kq05ml07m11ofiz7eh"
                        alt="logo"
                        width={127}
                        height={24}
                    />
                </div>
            </div>
        );
};
