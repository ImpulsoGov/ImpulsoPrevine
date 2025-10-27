import { Button } from "@/features/common/frontend/atoms";
import Image from "next/image";
import {
    columns,
    type SearchPlusItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { UnitTable } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/UnitTable";
import type { HeaderData } from "@features/SearchPlus/frontend/SearchPlusPage";
import { Header } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/Header";

type ButtonBarProps = {
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    setIsTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setShouldOpenWindowWithPrint: React.Dispatch<React.SetStateAction<boolean>>;
};

const ButtonBar: React.FC<ButtonBarProps> = ({
    setJsonData,
    setIsTableVisible,
    setShouldOpenWindowWithPrint,
}) => {
    return (
        <div style={{ display: "flex", gap: "8px", marginBottom: "82px" }}>
            <Button
                style={{
                    backgroundColor: "#FFF",
                    border: "1px solid #A6B5BE",
                    color: "#1F1F1F",
                }}
                onClick={() => {
                    setJsonData([]);
                }}
            >
                Usar outro arquivo
            </Button>
            <Button
                style={{
                    backgroundColor: "#FFF",
                    border: "1px solid #A6B5BE",
                    color: "#1F1F1F",
                }}
                onClick={() => {
                    setIsTableVisible(true);
                    setShouldOpenWindowWithPrint(false);
                }}
            >
                Visualizar
            </Button>
            <Button
                style={{
                    backgroundColor: "#88181D",
                    color: "#FFF",
                }}
                onClick={() => {
                    setIsTableVisible(true);
                    setShouldOpenWindowWithPrint(true);
                }}
            >
                <Image
                    src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh97w35003b107ki8aqbufrg"
                    alt="Ícone de uma impressora"
                    width={16}
                    height={16}
                    style={{ marginRight: "8px" }}
                />
                Imprimir
            </Button>
        </div>
    );
};

type SuccessProps = {
    jsonData: Array<SearchPlusItem>;
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    isTableVisible: boolean;
    setIsTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setShouldOpenWindowWithPrint: React.Dispatch<React.SetStateAction<boolean>>;
    header: HeaderData;
    tableRef: React.RefObject<HTMLDivElement | null>;
};

export const Success: React.FC<SuccessProps> = ({
    jsonData,
    setJsonData,
    isTableVisible,
    setIsTableVisible,
    setShouldOpenWindowWithPrint,
    header,
    tableRef,
}) => {
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Image
                    src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh3gw6k302p408lxo84xz8tk"
                    alt="Pasta com documentos"
                    width={135}
                    height={180}
                />
                <p style={{ color: "#88181D", width: "70%" }}>
                    Prontinho! Sua lista foi <b>convertida com sucesso.</b>
                </p>
            </div>
            <ButtonBar
                setJsonData={setJsonData}
                setIsTableVisible={setIsTableVisible}
                setShouldOpenWindowWithPrint={setShouldOpenWindowWithPrint}
            />
            {isTableVisible && header.thematicList && (
                <div ref={tableRef}>
                    <Header headerData={header} />
                    <UnitTable
                        data={jsonData}
                        columns={columns[header.thematicList]}
                        layoutOrientation="landscape"
                    />
                    <UnitTable
                        data={jsonData}
                        columns={columns[header.thematicList]}
                        layoutOrientation="portrait"
                    />
                </div>
            )}
        </div>
    );
};
