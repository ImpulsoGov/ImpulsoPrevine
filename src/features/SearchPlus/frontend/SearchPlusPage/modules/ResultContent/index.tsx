"use client";
import type { SearchPlusItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { useRef, useState, useEffect } from "react";
import { Print } from "./modules/PrintTable";
import type { HeaderData } from "../..";
import { Success } from "./modules/Success";

type ResultContentProps = {
    jsonData: Array<SearchPlusItem>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    header: HeaderData;
};

export const ResultContent: React.FC<ResultContentProps> = ({
    jsonData,
    setJsonData,
    header,
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
        <Success
            jsonData={jsonData}
            setJsonData={setJsonData}
            isTableVisible={isTableVisible}
            setIsTableVisible={setIsTableVisible}
            setShouldOpenWindowWithPrint={setShouldOpenWindowWithPrint}
            header={header}
            tableRef={tableRef}
        />
    );
};
