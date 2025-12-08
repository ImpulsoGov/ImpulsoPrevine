import { Button } from "@/features/common/frontend/atoms";
import Image from "next/image";
import type {
    ThematicList,
    SearchPlusItem,
} from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { columns } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways";
import { UnitTable } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/UnitTable";
import type { HeaderData } from "@features/SearchPlus/frontend/SearchPlusPage";
import { Header } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/Header";
import mixpanel from "mixpanel-browser";

type ButtonBarProps = {
    setJsonData: React.Dispatch<React.SetStateAction<Array<SearchPlusItem>>>;
    setIsTableVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setShouldOpenWindowWithPrint: React.Dispatch<React.SetStateAction<boolean>>;
    thematicList: ThematicList | null;
};

const ButtonBar: React.FC<ButtonBarProps> = ({
    setJsonData,
    setIsTableVisible,
    setShouldOpenWindowWithPrint,
    thematicList,
}) => {
    return (
        <div
            style={{
                display: "flex",
                gap: "32px",
                marginBottom: "82px",
                flexWrap: "wrap",
            }}
        >
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
                Converter nova lista
            </Button>
            <Button
                style={{
                    backgroundColor: "#FFF",
                    border: "1px solid #A6B5BE",
                    color: "#1F1F1F",
                }}
                onClick={() => {
                    mixpanel.track("result_list_view", {
                        thematic_list: thematicList,
                    });
                    setIsTableVisible(true);
                    setShouldOpenWindowWithPrint(false);
                }}
            >
                Visualizar prévia da lista
            </Button>
            <Button
                style={{
                    backgroundColor: "#88181D",
                    color: "#FFF",
                }}
                onClick={() => {
                    mixpanel.track("result_list_print", {
                        thematic_list: thematicList,
                    });
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
                Imprimir lista
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
    printContentRef: React.RefObject<HTMLDivElement | null>;
};

export const Success: React.FC<SuccessProps> = ({
    jsonData,
    setJsonData,
    isTableVisible,
    setIsTableVisible,
    setShouldOpenWindowWithPrint,
    header,
    printContentRef,
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
                    src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmixini0502p807kibpc2ckao"
                    alt="Pasta com documentos"
                    width={195}
                    height={180}
                />
                <p
                    style={{
                        color: "#88181D",
                        width: "70%",
                        marginBottom: "56px",
                    }}
                >
                    Prontinho! Sua lista foi <b>convertida com sucesso.</b>
                </p>
            </div>
            <ButtonBar
                setJsonData={setJsonData}
                setIsTableVisible={setIsTableVisible}
                setShouldOpenWindowWithPrint={setShouldOpenWindowWithPrint}
                thematicList={header.thematicList}
            />
            {isTableVisible && header.thematicList && (
                <div ref={printContentRef}>
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
