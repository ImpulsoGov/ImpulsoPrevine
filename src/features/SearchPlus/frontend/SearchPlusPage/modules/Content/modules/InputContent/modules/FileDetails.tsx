import Image from "next/image";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type FileDetailsProps = {
    file: File;
    thematicList: string;
    onRemoveFileClick: () => void;
    isMobile: boolean;
};

export const FileDetails: React.FC<FileDetailsProps> = ({
    file,
    thematicList,
    onRemoveFileClick,
    isMobile,
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#FFF",
                border: "1px solid #4294D8",
                borderRadius: "60px",
                alignItems: "center",
                width: "100%",
                boxSizing: "border-box",
                ...(isMobile
                    ? {
                          flexDirection: "column",
                          gap: "10px",
                          padding: "15px",
                          flexWrap: "wrap",
                      }
                    : {
                          flexDirection: "row",
                          gap: "20px",
                          padding: "15px 30px",
                      }),
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: isMobile ? "10px" : "20px",
                    flexDirection: isMobile ? "column" : "row",
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
                            fontSize: isMobile ? "12px" : "16px",
                            fontWeight: 600,
                            color: "#1F1F1F",
                        }}
                    >
                        {file.name}
                    </div>
                    <div
                        style={{
                            fontSize: isMobile ? "10px" : "13px",
                            fontWeight: 500,
                            color: "#777777",
                        }}
                    >
                        ARQUIVO CSV • {thematicList.toUpperCase()}
                    </div>
                </div>
            </div>
            <IconButton
                aria-label="remover"
                sx={{
                    width: "40px",
                    height: "40px",
                    color: "#777777",
                    alignSelf: "center",
                }}
                onClick={onRemoveFileClick}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </div>
    );
};
