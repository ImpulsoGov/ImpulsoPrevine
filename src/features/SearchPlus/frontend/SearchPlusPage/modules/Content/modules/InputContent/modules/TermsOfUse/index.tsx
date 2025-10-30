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

export const TermsOfUse: React.FC<React.PropsWithChildren<TermsOfUseProps>> = ({
    file,
    setJsonData,
    setHeader,
    header,
    onRemoveFileClick,
    errorHandler,
    children,
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
            {children}
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
                        setJsonData,
                        setHeader,
                        header,
                        errorHandler
                    );
                }}
                style={{
                    padding: "32px",
                    backgroundColor: !areTermsAccepted ? "#A6B5BE" : "#88181D",
                }}
            >
                CONVERTER ARQUIVO
            </Button>
            <u
                style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "130%",
                    color: "#1F1F1F",
                    cursor: "pointer",
                }}
                onClick={onRemoveFileClick}
            >
                selecionar um arquivo diferente
            </u>
        </div>
    );
};
