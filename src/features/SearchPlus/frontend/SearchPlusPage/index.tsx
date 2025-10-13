"use client";
import { useState } from "react";
import { ResultContent, type SearchPlusItem } from "./common/ResultContent";
import { InputContent } from "./common/InputContent";

export const SearchPlusPage: React.FC = () => {
    const [jsonData, setJsonData] = useState<Array<SearchPlusItem>>([]);
    const [error, setError] = useState<string | null>(null);

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
                    />
                ) : (
                    <InputContent
                        setError={setError}
                        setJsonData={setJsonData}
                    />
                )}
            </div>
        </>
    );
};
