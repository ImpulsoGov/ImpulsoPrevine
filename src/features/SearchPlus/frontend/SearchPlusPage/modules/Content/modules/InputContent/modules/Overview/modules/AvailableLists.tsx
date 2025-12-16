import { ListTitles } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { nameFormatter } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/UnitTable/modules/Formatters";
import { Tooltip } from "@mui/material";
import Image from "next/image";

export const AvailableLists: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "24px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <p
                    style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        letterSpacing: "-0.36px",
                        marginBottom: "12px",
                    }}
                >
                    Lista disponível para conversão
                </p>
                <Tooltip
                    title={
                        <div style={{ fontSize: "14px" }}>
                            Através dessa ferramenta nós conseguimos transformar
                            o CSV gerado pelo prontuário eletrônico (PEC) em uma
                            lista nominal pronta para impressão, adaptada ao
                            novo programa de cofinanciamento. Essa lista já terá
                            todas as novas boas práticas para você acompanhar a
                            situação dos cidadãos vinculados a esse indicador.
                        </div>
                    }
                    placement="top"
                    arrow
                >
                    <Image
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmfwxvq1608u307ked86rl4v1"
                        alt="Ícone de informação"
                        width={16}
                        height={16}
                    />
                </Tooltip>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                }}
            >
                {Object.values(ListTitles).map((list: string) => (
                    <div
                        key={list}
                        style={{
                            borderRadius: "8px",
                            padding: "6px 12px",
                            backgroundColor: "#ADE3F4",
                            color: "#3679B1",
                            fontSize: "17px",
                            fontWeight: 600,
                            letterSpacing: "-0.28px",
                        }}
                    >
                        {nameFormatter(list)}
                    </div>
                ))}
            </div>
        </div>
    );
};
