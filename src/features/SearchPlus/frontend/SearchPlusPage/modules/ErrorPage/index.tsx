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
                gap: "40px",
                marginBottom: "87px",
            }}
        >
            <Image
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh3gw6k102kb06kc0hkkpzzp"
                alt="Ícone de uma placa de atenção"
                width={240}
                height={171}
            />
            <div
                style={{
                    color: "#88181D",
                    textAlign: "center",
                    fontSize: "20px",
                    lineHeight: "100%",
                    fontWeight: 400,
                }}
            >
                {error}
                <div style={{ fontWeight: 700 }}>
                    Tente enviar um novo arquivo
                </div>
                .
            </div>
            <Button
                style={{
                    padding: "0 20px",
                    backgroundColor: "#88181D",
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
                    Enviar novo arquivo
                </Text>
            </Button>
        </div>
    );
};
