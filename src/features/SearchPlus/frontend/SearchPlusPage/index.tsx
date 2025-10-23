"use client";
import { useState } from "react";
import { ResultContent } from "./ResultContent";
import { InputContent } from "./InputContent";
import {
    type ThematicList,
    type SearchPlusItem,
    ListTitles,
} from "./common/carePathways";
import type * as time from "@/features/common/shared/time";
import Image from "next/image";
import { nameFormatter } from "./common/UnitTable/modules/Formatters";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type HeaderData = {
    thematicList: ThematicList | null;
    createdAtDate: time.BRTDateString;
    createdAtTime: time.BRTTimeString;
};

export type ErrorData = {
    title: string;
    message: string;
};

export const SearchPlusPage: React.FC = () => {
    const [jsonData, setJsonData] = useState<Array<SearchPlusItem>>([]);
    const [error, setError] = useState<ErrorData>({
        title: "",
        message: "",
    });
    const [header, setHeader] = useState<HeaderData>({
        thematicList: null,
        createdAtDate: "01/01/1970",
        createdAtTime: "00:00",
    });
    const [isOpen, setIsOpen] = useState(true);

    const closeSnackbar = (): void => {
        setIsOpen(false);
    };

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
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh3gw6j802jv06lyyxoe9eip"
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
                {jsonData.length > 0 ? (
                    <ResultContent
                        jsonData={jsonData}
                        setJsonData={setJsonData}
                        header={header}
                    />
                ) : (
                    <InputContent
                        setError={setError}
                        setJsonData={setJsonData}
                        setHeader={setHeader}
                        header={header}
                    />
                )}
            </div>
            <Snackbar
                open={isOpen && error.message.length > 0}
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
                                lineHeight: "150%",
                            }}
                        >
                            {error.title}
                        </div>
                        <div
                            style={{
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "143%",
                            }}
                        >
                            {error.message}
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
            <div
                style={{
                    backgroundColor: "#EABF2E",
                    width: "100%",
                    color: "#4F3D0C",
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
                                border: "1px solid #4F3D0C",
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
