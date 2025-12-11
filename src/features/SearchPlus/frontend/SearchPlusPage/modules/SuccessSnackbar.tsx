import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

type Props = {
    isOpen: boolean;
    onClose: React.DispatchWithoutAction;
};

// TODO: criar uma snackbar genérica para erro e sucesso
export const SuccessSnackbar: React.FC<Props> = ({ isOpen, onClose }) => {
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
                    backgroundColor: "#EDF7ED",
                    borderRadius: "4px",
                    padding: "12px 32px",
                    width: "80%",
                    justifyContent: "space-between",
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
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmiz1tlvn04a108kievuousdb"
                        alt="Success Icon"
                        width={18}
                        height={18}
                    />
                    <div
                        style={{
                            color: "#1E4620",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "16px",
                                fontWeight: 500,
                                lineHeight: "125%",
                            }}
                        >
                            {"Arquivo carregado com sucesso!"}
                        </div>
                    </div>
                </div>
                <IconButton
                    aria-label="close"
                    sx={{
                        padding: "4px",
                        width: "fit-content",
                        height: "fit-content",
                        color: "#1E4620",
                    }}
                    onClick={onClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </Snackbar>
    );
};
