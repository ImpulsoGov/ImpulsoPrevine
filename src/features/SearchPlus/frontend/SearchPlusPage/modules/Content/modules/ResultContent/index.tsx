"use client";
import { useRef, useState, useEffect } from "react";
import { Print } from "./modules/PrintTable";
import type { HeaderData } from "@features/SearchPlus/frontend/SearchPlusPage";
import { Success } from "./modules/Success";
import type { BreastAndUterusCareItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/BreastAndUterusCare";
import type { PregnancyAndPuerperiumCareItem } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare";

type ResultContentProps = {
    jsonData:
        | Array<BreastAndUterusCareItem>
        | Array<PregnancyAndPuerperiumCareItem>;
    setJsonData: React.Dispatch<
        React.SetStateAction<
            | Array<BreastAndUterusCareItem>
            | Array<PregnancyAndPuerperiumCareItem>
        >
    >;
    header: HeaderData;
};

export const ResultContent: React.FC<ResultContentProps> = ({
    jsonData,
    setJsonData,
    header,
}) => {
    const printContentRef = useRef<HTMLDivElement>(null);
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [shouldOpenWindowWithPrint, setShouldOpenWindowWithPrint] =
        useState(false);
    useEffect(() => {
        if (printContentRef.current?.innerHTML && isTableVisible) {
            const htmlString = printContentRef.current.innerHTML;
            if (htmlString.length > 0) {
                Print(htmlString, shouldOpenWindowWithPrint);
                setIsTableVisible(false);
            }
        }
    }, [isTableVisible]);

    return (
        <div style={{ width: "100%", marginBottom: "100px" }}>
            <Success
                jsonData={jsonData}
                setJsonData={setJsonData}
                isTableVisible={isTableVisible}
                setIsTableVisible={setIsTableVisible}
                setShouldOpenWindowWithPrint={setShouldOpenWindowWithPrint}
                header={header}
                printContentRef={printContentRef}
            />
        </div>
    );
};
