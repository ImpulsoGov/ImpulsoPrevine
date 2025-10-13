"use client";
import React, { useState } from "react";
import type { SearchPlusItem } from "./model";
import { DropZone } from "./modules/DropZone";
import { NominalList } from "./modules/NominalList";

export const CsvDropzone: React.FC = () => {
    //Esses estados estão sendo consumidos em multiplos lugares, talvez possam virar um context
    const [jsonData, setJsonData] = useState<Array<SearchPlusItem>>([]);
    const [error, setError] = useState<string | null>(null);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {error && <p>{error}</p>}

            {jsonData.length > 0 ? (
                <NominalList jsonData={jsonData} setJsonData={setJsonData} />
            ) : (
                <DropZone setError={setError} setJsonData={setJsonData} />
            )}
        </div>
    );
};
