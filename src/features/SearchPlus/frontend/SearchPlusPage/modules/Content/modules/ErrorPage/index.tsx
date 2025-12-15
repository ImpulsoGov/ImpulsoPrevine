import { Button, Text } from "@/features/common/frontend/atoms";
import Image from "next/image";
import type { SearchPlusItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";

type Props = {
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    error: string;
};

export const Error: React.FC<Props> = ({
    setJsonData,
    setErrorMessage,
    error,
}) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "65px",
                marginBottom: "187px",
                width: "100%",
            }}
        >
            <Image
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmixipnaw02ql07kizjrfimg1"
                alt="Ícone de uma placa de atenção"
                width={240}
                height={180}
            />
            <div
                style={{
                    color: "#1F1F1F",
                    textAlign: "center",
                    fontSize: "20px",
                    lineHeight: "100%",
                    fontWeight: 400,
                    marginTop: "35px",
                }}
            >
                {error}
                <div style={{ fontWeight: 700 }}>
                    Tente enviar um novo arquivo.
                </div>
            </div>
            <Button
                style={{
                    padding: "0 20px",
                    backgroundColor: "#4294D8",
                    marginTop: "53px",
                }}
                onClick={() => {
                    setJsonData([]);
                    setErrorMessage("");
                }}
            >
                <Text
                    style={{
                        fontSize: "15px",
                        fontWeight: 500,
                        lineHeight: "100%",
                        color: "#FFF",
                    }}
                >
                    ENVIAR NOVO ARQUIVO
                </Text>
            </Button>
        </div>
    );
};
