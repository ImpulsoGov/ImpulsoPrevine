import Image from "next/image";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type FileDetailsProps = {
    file: File;
    thematicList: string;
    onRemoveFileClick: () => void;
};

export const FileDetails: React.FC<FileDetailsProps> = ({
    file,
    thematicList,
    onRemoveFileClick,
}) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                backgroundColor: "#FFF",
                border: "1px solid #4294D8",
                borderRadius: "60px",
                padding: "15px 30px",
                alignItems: "center",
            }}
        >
            <Image
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmiz1tm0504a808kipsau19g8"
                alt="Terms of Use"
                width={34}
                height={38}
            />
            <div
                style={{
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "130%",
                }}
            >
                <div
                    style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#1F1F1F",
                    }}
                >
                    {file.name}
                </div>
                <div
                    style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#777777",
                    }}
                >
                    ARQUIVO CSV • {thematicList.toUpperCase()}
                </div>
            </div>
            <IconButton
                aria-label="remover"
                sx={{
                    padding: "10px",
                    width: "40px",
                    height: "40px",
                    color: "#777777",
                }}
                onClick={onRemoveFileClick}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </div>
    );
};
