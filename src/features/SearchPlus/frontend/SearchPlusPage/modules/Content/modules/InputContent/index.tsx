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
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
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
            )}
        </>
    );
};
