import { Button } from "@/features/common/frontend/atoms";
import Link from "next/link";
import { useState } from "react";
import { handleClick } from "./logic";
import type { HeaderData } from "@features/SearchPlus/frontend/SearchPlusPage";
import type { SearchPlusItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";

type TermsOfUseProps = {
    file: File;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>;
    header: HeaderData;
    onRemoveFileClick: React.DispatchWithoutAction;
    errorHandler: (message: string) => void;
};

export const TermsOfUse: React.FC<TermsOfUseProps> = ({
    file,
    setJsonData,
    setHeader,
    header,
    onRemoveFileClick,
    errorHandler,
}) => {
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    return (
        <>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                }}
            >
                <div>
                    <input
                        type="checkbox"
                        onChange={(event) => {
                            setAreTermsAccepted(event.target.checked);
                        }}
                        style={{
                            accentColor: "#2196F3",
                            width: "18px",
                            height: "18px",
                        }}
                    />
                </div>
                <div
                    style={{
                        lineHeight: "130%",
                        fontWeight: 400,
                        fontSize: "14px",
                    }}
                >
                    Declaro que li, entendi e concordo integralmente com este{" "}
                    <Link
                        target="_blank"
                        href="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmj0gcu6008s207lwew9uxf1o#"
                    >
                        <u>termo</u>
                    </Link>{" "}
                    e que sou o(a) responsável pelos dados contidos nos arquivos
                    que envio.
                </div>
            </div>
            <Button
                disabled={!areTermsAccepted}
                onClick={() => {
                    handleClick(
                        file,
                        setJsonData,
                        setHeader,
                        header,
                        errorHandler
                    );
                }}
                style={{
                    marginTop: "16px",
                    padding: "32px",
                    backgroundColor: !areTermsAccepted ? "#A6B5BE" : "#4294D8",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#FFF",
                }}
            >
                Converter arquivo
            </Button>
            <u
                style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "130%",
                    color: "#1F1F1F",
                    cursor: "pointer",
                    marginBottom: "100px",
                }}
                onClick={onRemoveFileClick}
            >
                selecionar um arquivo diferente
            </u>
        </>
    );
};
