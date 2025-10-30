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

export type { CsvRow } from "./model";

type DropZoneProps = {
    setSnackbarError: React.Dispatch<React.SetStateAction<ErrorData>>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    header: HeaderData;
};

export const InputContent: React.FC<DropZoneProps> = ({
    setSnackbarError,
    setJsonData,
    setHeader,
    setErrorMessage,
    header,
}) => {
    const [rawFileContent, setRawFileContent] = useState<File | null>(null);

    const showDragNDropArea = (): void => {
        setRawFileContent(null);
        setHeader({
            thematicList: null,
            createdAtDate: "01/01/1970",
            createdAtTime: "00:00",
        });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <p style={{ width: "51%" }}>
                Converta seus relatórios do PEC em segundos, e tenha listas
                prontas para distribuir aos ACS e simplificar o acompanhamento
                dos cidadãos.
            </p>
            {rawFileContent && header.thematicList ? (
                <TermsOfUse
                    file={rawFileContent}
                    setJsonData={setJsonData}
                    setHeader={setHeader}
                    header={header}
                    thematicList={ListTitles[header.thematicList]}
                    setErrorMessage={setErrorMessage}
                    setRawFileContent={setRawFileContent}
                    onRemoveFileClick={showDragNDropArea}
                />
            ) : (
                <DragNDropArea
                    setSnackbarError={setSnackbarError}
                    setRawFileContent={setRawFileContent}
                    setHeader={setHeader}
                />
            )}
        </div>
    );
};
