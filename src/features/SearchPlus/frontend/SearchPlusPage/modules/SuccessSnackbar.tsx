import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useState } from "react";

export const SuccessSnackbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const close = (): void => {
        setIsOpen(false);
    };

    return (
        <Snackbar
            open={isOpen}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            sx={{ width: "80%" }}
            onClose={close}
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
                    onClick={close}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </Snackbar>
    );
};
