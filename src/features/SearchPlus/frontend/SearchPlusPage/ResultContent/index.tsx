"use client";
import { Button } from "@/features/common/frontend/atoms";
import { UnitTable } from "../common/UnitTable";
import { columns } from "@/features/SearchPlus/frontend/SearchPlusPage/common/carePathways";
import type { SearchPlusItem } from "@features/SearchPlus/frontend/SearchPlusPage/common/carePathways";
import { useRef, useState, useEffect } from "react";
import { Print } from "./modules/PrintTable";

type ResultContentProps = {
    jsonData: Array<SearchPlusItem>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
};

export const ResultContent: React.FC<ResultContentProps> = ({
    jsonData,
    setJsonData,
}) => {
    const tableRef = useRef<HTMLDivElement>(null);
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [shouldOpenWindowWithPrint, setShouldOpenWindowWithPrint] =
        useState(false);
    useEffect(() => {
        if (tableRef.current?.innerHTML && isTableVisible) {
            const htmlString = tableRef.current.innerHTML;
            if (htmlString.length > 0) {
                Print(htmlString, shouldOpenWindowWithPrint);
                setIsTableVisible(false);
            }
        }
    }, [isTableVisible]);
    return (
        <div
            style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div style={{ display: "flex", gap: "8px", marginBottom: "82px" }}>
                <Button
                    onClick={() => {
                        setJsonData([]);
                    }}
                >
                    Usar outro arquivo
                </Button>
                <Button
                    onClick={() => {
                        setIsTableVisible(true);
                        setShouldOpenWindowWithPrint(false);
                    }}
                >
                    Visualizar
                </Button>
                <Button
                    onClick={() => {
                        setIsTableVisible(true);
                        setShouldOpenWindowWithPrint(true);
                    }}
                >
                    Imprimir
                </Button>
            </div>
            {isTableVisible && (
                <div>
                    <UnitTable
                        tableRef={tableRef}
                        data={jsonData}
                        columns={columns["breastAndUterusCare"]}
                        layoutOrientation="landscape"
                    />
                </div>
            )}
        </div>
    );
};
