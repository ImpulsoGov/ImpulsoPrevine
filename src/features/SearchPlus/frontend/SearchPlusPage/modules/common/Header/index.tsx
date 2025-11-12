import type { HeaderData } from "@features/SearchPlus/frontend/SearchPlusPage";
import { ListTitles } from "../carePathways";
import Image from "next/image";

export const Header: React.FC<{ headerData: HeaderData }> = ({
    headerData,
}) => {
    const now = new Date();
    const nowDate = now.toLocaleDateString("pt-BR");
    const nowTime = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (headerData.thematicList)
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
                        {ListTitles[headerData.thematicList]}
                    </div>
                    <div style={{ fontStyle: "italic", fontWeight: 400 }}>
                        Lista convertida em {nowDate} - às {nowTime}
                    </div>
                    <div style={{ fontStyle: "italic", fontWeight: 400 }}>
                        Relatório exportado do PEC em {headerData.createdAtDate}{" "}
                        - às {headerData.createdAtTime}
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        <span style={{ fontWeight: 600 }}>
                            Filtros aplicados:{" "}
                        </span>
                        {Object.entries(headerData.filters).map(
                            ([key, value], index, array) => (
                                <span key={key}>
                                    <span style={{ fontWeight: 600 }}>
                                        {key}:{" "}
                                    </span>
                                    {value}
                                    {index < array.length - 1 && " | "}
                                </span>
                            )
                        )}
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
