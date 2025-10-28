"use client";
import { useState } from "react";
import { ResultContent } from "./modules/ResultContent";
import { InputContent } from "./modules/InputContent";
import {
    type ThematicList,
    type SearchPlusItem,
    ListTitles,
} from "./modules/common/carePathways";
import type * as time from "@/features/common/shared/time";
import Image from "next/image";
import { nameFormatter } from "./modules/common/UnitTable/modules/Formatters";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Error } from "@features/SearchPlus/frontend/SearchPlusPage/modules/ErrorPage";

export type HeaderData = {
    thematicList: ThematicList | null;
    createdAtDate: time.BRTDateString;
    createdAtTime: time.BRTTimeString;
};

export type ErrorData = {
    title: string;
    message: string | null;
};

type ContentProps = {
    setError: React.Dispatch<React.SetStateAction<ErrorData>>;
};

const Content: React.FC<ContentProps> = ({ setError }) => {
    const [jsonData, setJsonData] = useState<Array<SearchPlusItem>>([]);
    // TODO: rever tipo desse estado, poderia ser um boolean
    const [isError, setIsError] = useState<string>("");

    const [header, setHeader] = useState<HeaderData>({
        thematicList: null,
        createdAtDate: "01/01/1970",
        createdAtTime: "00:00",
    });

    if (isError.length > 0) {
        return <Error setJsonData={setJsonData} setIsError={setIsError} />;
    }

    if (jsonData.length > 0)
        return (
            <ResultContent
                jsonData={jsonData}
                setJsonData={setJsonData}
                header={header}
            />
        );

    return (
        <InputContent
            setError={setError}
            setJsonData={setJsonData}
            setHeader={setHeader}
            header={header}
            setIsError={setIsError}
        />
    );
};

export const SearchPlusSnackbar: React.FC<{ error: ErrorData }> = ({
    error,
}) => {
    const [isOpen, setIsOpen] = useState(true);

    const closeSnackbar = (): void => {
        setIsOpen(false);
    };

    return (
        <Snackbar
            open={isOpen && !!error.message}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            sx={{ width: "80%" }}
            onClose={closeSnackbar}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "12px",
                    backgroundColor: "#FDEDED",
                    borderRadius: "4px",
                    padding: "12px 32px",
                    width: "80%",
                    justifyContent: "space-between",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                    }}
                >
                    <Image
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh3vfms808eg08lxa9z4ud74"
                        alt="Error Icon"
                        width={18}
                        height={18}
                    />
                    <div
                        style={{
                            color: "#5F2120",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "16px",
                                fontWeight: 500,
                                lineHeight: "125%",
                            }}
                        >
                            {error.title}
                        </div>
                        <div
                            style={{
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "143%",
                                marginTop: "4px",
                            }}
                        >
                            {error.message && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: error.message,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <IconButton
                    aria-label="close"
                    sx={{
                        padding: "4px",
                        width: "fit-content",
                        height: "fit-content",
                        color: "#5F2120",
                    }}
                    onClick={closeSnackbar}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </Snackbar>
    );
};

export const SearchPlusPage: React.FC = () => {
    const [error, setError] = useState<ErrorData>({
        title: "",
        message: null,
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* TODO componentizar */}
            <div
                style={{
                    padding: "20px",
                    fontSize: "48px",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                <span>
                    <Image
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh9861jj03hp07kc08jyagdz"
                        alt="Busca+Mais Logo"
                        width={56}
                        height={28}
                    />
                </span>{" "}
                Busca+Mais
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Content setError={setError} />
            </div>
            <SearchPlusSnackbar error={error} />
            <div
                style={{
                    backgroundColor: "#CF4047",
                    width: "100%",
                    color: "#FFF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "42px 118px 118px 118px",
                    lineHeight: "130%",
                }}
            >
                <p
                    style={{
                        fontSize: "21px",
                        fontWeight: 700,
                        letterSpacing: "-0.4px",
                    }}
                >
                    Listas disponíveis para conversão
                </p>
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
                                border: "1px solid #FFF",
                                fontSize: "14px",
                                fontWeight: 500,
                                letterSpacing: "-0.3px",
                                padding: "6px 12px",
                            }}
                        >
                            {nameFormatter(list)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
