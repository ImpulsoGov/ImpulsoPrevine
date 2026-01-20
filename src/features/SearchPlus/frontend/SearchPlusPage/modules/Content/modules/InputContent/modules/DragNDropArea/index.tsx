import Image from "next/image";
import { handleFileUpload } from "./logic";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";

type Props = {
    errorHandler: (message: ErrorData) => void;
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>;
    setRawFileContent: React.Dispatch<React.SetStateAction<File | null>>;
    setSuccessSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
    isMobile: boolean;
    isSearchPlusNewGoodPracticeEnabled: boolean;
};

export const DragNDropArea: React.FC<Props> = ({
    errorHandler,
    setHeader,
    setRawFileContent,
    setSuccessSnackbar,
    isMobile,
    isSearchPlusNewGoodPracticeEnabled,
}) => {
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    return (
        <div
            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                //TODO: Trocar o reset do snackbar error para uma funcao mais semantica
                errorHandler({ title: "", message: null });

                const file = event.dataTransfer.files[0];
                handleFileUpload(
                    file,
                    errorHandler,
                    setRawFileContent,
                    setHeader,
                    setSuccessSnackbar,
                    isSearchPlusNewGoodPracticeEnabled
                );
            }}
            onDragOver={handleDragOver}
            style={{
                backgroundColor: "#ADE3F4",
                color: "#1F1F1F",
                border: "3px dashed #58B3FE",
                borderRadius: "16px",
                padding: "21px 80px",
                width: isMobile ? "auto" : "48%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "stretch",
                gap: "16px",
            }}
        >
            <p
                style={{
                    fontSize: "24px",
                    fontWeight: 500,
                    lineHeight: "130%",
                    marginBottom: "16px",
                    marginTop: "0px",
                }}
            >
                Suba o seu arquivo CSV do PEC
            </p>
            <Image
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmiz1tm3104fg07kdw3tudy88"
                alt="Drag and drop"
                width={60}
                height={60}
            />
            <label
                htmlFor="upload-file"
                style={{
                    borderRadius: "100px",
                    backgroundColor: "#3679B1",
                    padding: "16px 30px",
                    color: "#FFF",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "130%",
                    letterSpacing: "-0.3px",
                    cursor: "pointer",
                }}
            >
                SELECIONAR ARQUIVO
            </label>
            <input
                id="upload-file"
                type="file"
                accept=".csv"
                onChange={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const files = event.target.files;
                    if (files) {
                        handleFileUpload(
                            files[0],
                            errorHandler,
                            setRawFileContent,
                            setHeader,
                            setSuccessSnackbar,
                            isSearchPlusNewGoodPracticeEnabled
                        );
                    }
                    event.target.value = "";
                }}
                style={{ display: "none" }}
            />
            <div style={{ fontWeight: 400, lineHeight: "130%" }}>
                ou arraste e solte o CSV aqui.
            </div>
        </div>
    );
};
