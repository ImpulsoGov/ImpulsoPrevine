import {
    ListTitles,
    type SearchPlusItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";
import { DragNDropArea } from "./modules/DragNDropArea";
import { useState } from "react";
import { TermsOfUse } from "./modules/TermsOfUse";
import { FileDetails } from "./modules/FileDetails";
import { Overview } from "./modules/Overview";
import Image from "next/image";

export type { CsvRow } from "./model";

type Props = {
    setSuccessSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    setSnackbarError: React.Dispatch<React.SetStateAction<ErrorData>>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    header: HeaderData;
};

export const InputContent: React.FC<Props> = ({
    setSnackbarError,
    setJsonData,
    setHeader,
    setErrorMessage,
    header,
    setSuccessSnackbar,
}) => {
    const [rawFileContent, setRawFileContent] = useState<File | null>(null);

    const showDragNDropArea = (): void => {
        setRawFileContent(null);
        setHeader({
            thematicList: null,
            createdAtDate: "01/01/1970",
            createdAtTime: "00:00",
            filters: {},
            teamName: undefined,
        });
    };

    const resetContentStatesAndSetErrorMessage = <TMessage,>(
        message: TMessage,
        setError: React.Dispatch<React.SetStateAction<TMessage>>
    ): void => {
        setJsonData([]);
        setRawFileContent(null);
        setHeader({
            thematicList: null,
            createdAtDate: "01/01/1970",
            createdAtTime: "00:00",
            filters: {},
            teamName: undefined,
        });
        setError(message);
    };

    return (
        <>
            {rawFileContent && header.thematicList ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "24px",
                        marginBottom: "87px",
                        width: "50%",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <FileDetails
                        file={rawFileContent}
                        onRemoveFileClick={showDragNDropArea}
                        thematicList={ListTitles[header.thematicList]}
                    />
                    <TermsOfUse
                        file={rawFileContent}
                        setJsonData={setJsonData}
                        setHeader={setHeader}
                        header={header}
                        onRemoveFileClick={showDragNDropArea}
                        errorHandler={(message: string) => {
                            resetContentStatesAndSetErrorMessage(
                                message,
                                setErrorMessage
                            );
                        }}
                    />
                </div>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            width: "100%",
                            paddingRight: "80px",
                            paddingLeft: "80px",
                            paddingBottom: "80px",
                        }}
                    >
                        <Overview />
                        <DragNDropArea
                            setRawFileContent={setRawFileContent}
                            setHeader={setHeader}
                            errorHandler={(message: ErrorData) => {
                                resetContentStatesAndSetErrorMessage(
                                    message,
                                    setSnackbarError
                                );
                            }}
                            setSuccessSnackbar={setSuccessSnackbar}
                        />
                    </div>
                    <div
                        style={{
                            width: "100%",
                            backgroundColor: "#3679B1",
                            paddingTop: "80px",
                            paddingLeft: "80px",
                            paddingRight: "80px",
                            paddingBottom: "196px",
                        }}
                    >
                        <Image
                            src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmj79dwo802g307khdui3x9ky"
                            alt="Ícone do busca mais"
                            width={129}
                            height={22}
                        />
                        <p
                            style={{
                                paddingTop: "50px",
                                paddingBottom: "36px",
                                margin: "0px",
                                color: "#ADE3F4",
                                fontSize: "32px",
                                fontWeight: 400,
                                lineHeight: "130%",
                            }}
                        >
                            Ainda tem dúvidas sobre como usar o busca+mais?
                            Confira o <br></br>
                            vídeo abaixo com mais instruções ou veja as
                            perguntas frequentes.
                        </p>
                    </div>
                </>
            )}
        </>
    );
};
