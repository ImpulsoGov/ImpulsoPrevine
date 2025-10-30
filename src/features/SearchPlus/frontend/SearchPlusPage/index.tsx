"use client";
import { useState } from "react";
import { ResultContent } from "./modules/ResultContent";
import { InputContent } from "./modules/InputContent";
import {
    type ThematicList,
    type SearchPlusItem,
} from "./modules/common/carePathways";
import type * as time from "@/features/common/shared/time";
import Image from "next/image";
import { Error } from "@features/SearchPlus/frontend/SearchPlusPage/modules/ErrorPage";
import { ErrorSnackbar } from "./modules/ErrorSnackbar";
import { AvailableLists } from "./modules/AvailableLists";

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
    setSnackbarError: React.Dispatch<React.SetStateAction<ErrorData>>;
};

const Content: React.FC<ContentProps> = ({ setSnackbarError }) => {
    const [jsonData, setJsonData] = useState<Array<SearchPlusItem>>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [header, setHeader] = useState<HeaderData>({
        thematicList: null,
        createdAtDate: "01/01/1970",
        createdAtTime: "00:00",
    });

    if (errorMessage.length > 0) {
        return (
            <Error
                setJsonData={setJsonData}
                setErrorMessage={setErrorMessage}
                error={errorMessage}
            />
        );
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
            setSnackbarError={setSnackbarError}
            setJsonData={setJsonData}
            setHeader={setHeader}
            header={header}
            setErrorMessage={setErrorMessage}
        />
    );
};

export const SearchPlusPage: React.FC = () => {
    const [snackbarError, setSnackbarError] = useState<ErrorData>({
        title: "",
        message: null,
    });

    const resetSnackbarError = (): void => {
        setSnackbarError({ title: "", message: null });
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
                <Content setSnackbarError={setSnackbarError} />
            </div>
            <ErrorSnackbar error={snackbarError} onClose={resetSnackbarError} />
            <AvailableLists />
        </div>
    );
};
