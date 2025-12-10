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
        <>
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                }}
            >
                <Button
                    style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        backgroundColor: "#4294D8",
                        color: "#FFF",
                        padding: "0 45px",
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
                <Button
                    style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        backgroundColor: "#FFF",
                        border: "1px solid #A6B5BE",
                        color: "#1F1F1F",
                        padding: "0 20px",
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
            </div>
            <u
                style={{
                    color: "#3679B1",
                    marginTop: "38px",
                    marginBottom: "82px",
                    fontSize: "16px",
                    fontWeight: 500,
                    cursor: "pointer",
                }}
                onClick={() => {
                    setJsonData([]);
                }}
            >
                Converter nova lista
            </u>
        </>
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
                        color: "#1F1F1F",
                        fontSize: "20px",
                        fontWeight: 400,
                        width: "70%",
                        marginBottom: "55px",
                        marginTop: "30px",
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
