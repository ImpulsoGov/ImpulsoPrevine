"use client";
import { useState } from "react";
import { ResultContent } from "./ResultContent";
import { InputContent } from "./InputContent";
import type { ThematicList, SearchPlusItem } from "./common/carePathways";
import type * as time from "@/features/common/shared/time";

export type HeaderProps = {
    thematicList: ThematicList | null;
    createdAtDate: time.BRTDateString;
    createdAtTime: time.BRTTimeString;
};

export const SearchPlusPage: React.FC = () => {
    const [jsonData, setJsonData] = useState<Array<SearchPlusItem>>([]);
    const [error, setError] = useState<string | null>(null);
    const [header, setHeader] = useState<HeaderProps>({
        thematicList: null,
        createdAtDate: "01/01/1970",
        createdAtTime: "00:00",
    });
    return (
        <>
            <div
                style={{
                    padding: "20px",
                    fontSize: "48px",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Busca+
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {error && <p>{error}</p>}

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
                    />
                )}
            </div>
        </>
    );
};
