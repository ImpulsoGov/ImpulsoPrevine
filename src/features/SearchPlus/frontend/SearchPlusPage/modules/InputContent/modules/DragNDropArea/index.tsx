import Image from "next/image";
import { handleFileUpload } from "./modules/handleDrop";
import type {
    ErrorData,
    HeaderData,
} from "@features/SearchPlus/frontend/SearchPlusPage";

type Props = {
    setError: React.Dispatch<React.SetStateAction<ErrorData>>;
    setHeader: React.Dispatch<React.SetStateAction<HeaderData>>;
    setRawFileContent: React.Dispatch<React.SetStateAction<File | null>>;
};

export const DragNDropArea: React.FC<Props> = ({
    setError,
    setHeader,
    setRawFileContent,
}) => {
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    return (
        <div
            onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();
                const file = event.dataTransfer.files[0];
                handleFileUpload(file, setError, setRawFileContent, setHeader);
            }}
            onDragOver={handleDragOver}
            style={{
                backgroundColor: "#F8BCAE",
                border: "3px dashed #CF4047",
                borderRadius: "16px",
                padding: "32px 0px 21px 0px",
                margin: "30px",
                width: "80%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
            }}
        >
            <Image
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh9861ix03l107kn7m7bg796"
                alt="Drag and drop"
                width={60}
                height={60}
            />
            <label
                htmlFor="upload-file"
                style={{
                    borderRadius: "100px",
                    backgroundColor: "#88181D",
                    padding: "16px 30px",
                    color: "#FFF",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "130%",
                    letterSpacing: "-0.3px",
                    cursor: "pointer",
                    marginTop: "16px",
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
                            setError,
                            setRawFileContent,
                            setHeader
                        );
                    }
                }}
                style={{ display: "none" }}
            />
            <div>ou arraste e solte um arquivo CSV aqui</div>
        </div>
    );
};
