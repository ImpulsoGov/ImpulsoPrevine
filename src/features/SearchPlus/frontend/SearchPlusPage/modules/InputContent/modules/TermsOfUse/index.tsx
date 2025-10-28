import { Button } from "@/features/common/frontend/atoms";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { handleClick } from "../DragNDropArea/modules/handleDrop";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";
import type { SearchPlusItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";

type TermsOfUseProps = {
    file: File;
    thematicList: string;
    setError: React.Dispatch<React.SetStateAction<ErrorData>>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>;
    setIsError: React.Dispatch<React.SetStateAction<string>>;
    header: HeaderData;
};

export const TermsOfUse: React.FC<TermsOfUseProps> = ({
    file,
    thematicList,
    setError,
    setJsonData,
    setHeader,
    setIsError,
    header,
}) => {
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                marginBottom: "87px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "16px",
                    backgroundColor: "#FFF",
                    border: "1px solid #CF4047",
                    borderRadius: "60px",
                    padding: "15px 30px",
                }}
            >
                <Image
                    src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh9861jl03em07kildthfzbj"
                    alt="Terms of Use"
                    width={34}
                    height={38}
                />
                <div
                    style={{
                        fontFamily: "Inter, sans-serif",
                        lineHeight: "130%",
                    }}
                >
                    <div
                        style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#1F1F1F",
                        }}
                    >
                        {file.name}
                    </div>
                    <div
                        style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#777777",
                        }}
                    >
                        ARQUIVO CSV • {thematicList.toUpperCase()}
                    </div>
                </div>
            </div>
            <div style={{ width: "60%", display: "flex", gap: "12px" }}>
                <div>
                    <input
                        type="checkbox"
                        onChange={(event) => {
                            setAreTermsAccepted(event.target.checked);
                        }}
                        style={{
                            accentColor: "#CF4047",
                            width: "18px",
                            height: "18px",
                        }}
                    />
                </div>
                <div>
                    Declaro que li e concordo que a veracidade do documento é de
                    minha inteira responsabilidade de acordo com os termos
                    descritos {/* TODO: pegar url desse link */}
                    <Link href="#">
                        <u>aqui</u>
                    </Link>
                    .
                </div>
            </div>
            <Button
                disabled={!areTermsAccepted}
                onClick={() => {
                    handleClick(
                        file,
                        setError,
                        setJsonData,
                        setHeader,
                        setIsError,
                        header
                    );
                }}
                style={{
                    padding: "32px",
                    backgroundColor: !areTermsAccepted ? "#A6B5BE" : "#88181D",
                }}
            >
                CONVERTER ARQUIVO
            </Button>
        </div>
    );
};
