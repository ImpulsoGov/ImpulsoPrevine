import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import type { ErrorData } from "@features/SearchPlus/frontend/SearchPlusPage";

// TODO: criar uma snackbar genérica para erro e sucesso
export const ErrorSnackbar: React.FC<{
    error: ErrorData;
    onClose: React.DispatchWithoutAction;
}> = ({ error, onClose }) => {
    const isOpen = Boolean(error.message);

    return (
        <Snackbar
            open={isOpen}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            sx={{ width: "80%" }}
            onClose={onClose}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "12px",
                    backgroundColor: "#FED2C9",
                    borderRadius: "4px",
                    padding: "16px",
                    width: "80%",
                    justifyContent: "space-between",
                    border: "1px solid #BB1019",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                    }}
                >
                    <Image
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh3vfms808eg08lxa9z4ud74"
                        alt="Error Icon"
                        width={18}
                        height={18}
                    />
                    <div
                        style={{
                            color: "#BB1019",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "16px",
                                fontWeight: 500,
                                lineHeight: "125%",
                            }}
                        >
                            {error.title}
                        </div>
                        <div
                            style={{
                                fontSize: "14px",
                                fontWeight: 400,
                                lineHeight: "143%",
                                marginTop: "4px",
                            }}
                        >
                            {error.message && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: error.message,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <IconButton
                    aria-label="close"
                    sx={{
                        padding: "4px",
                        width: "fit-content",
                        height: "fit-content",
                        color: "#BB1019",
                    }}
                    onClick={onClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </Snackbar>
    );
};
