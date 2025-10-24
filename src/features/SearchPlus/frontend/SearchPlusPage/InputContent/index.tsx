import {
    ListTitles,
    type SearchPlusItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/common/carePathways";
import type { ErrorData, HeaderData } from "..";
import { DragNDropArea } from "./modules/DragNDropArea";
import { useState } from "react";
import { TermsOfUse } from "./modules/TermsOfUse";

type DropZoneProps = {
    setError: React.Dispatch<React.SetStateAction<ErrorData>>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>;
    header: HeaderData;
};

export const InputContent: React.FC<DropZoneProps> = ({
    setError,
    setJsonData,
    setHeader,
    header,
}) => {
    const [rawFileContent, setRawFileContent] = useState<File | null>(null);
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
                    setError={setError}
                    setJsonData={setJsonData}
                    setHeader={setHeader}
                    header={header}
                    thematicList={ListTitles[header.thematicList]}
                />
            ) : (
                <DragNDropArea
                    setError={setError}
                    setRawFileContent={setRawFileContent}
                    setHeader={setHeader}
                />
            )}
        </div>
    );
};
