"use client";
import { useState, useEffect, type SyntheticEvent } from "react";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { SnackBarWhatsAppLink } from "@/constants/whatsAppLinks";

interface AlertSnackBarProps {
    show: boolean;
}
export const MessageComponent = () => {
    return (
        <div
            style={{
                fontFamily: "Inter",
                fontSize: "13px",
                color: "white",
                fontWeight: 400,
                display: "flex",
                lineHeight: "143%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "start",
                width: "380px",
                gap: "12px",
            }}
        >
            <Image
                src="https://media.graphassets.com/coTPuum3T0agxKfE0972"
                alt="Warning-icon"
                width={22}
                height={22}
            />
            <div>
                Não foi possível carregar os dados. Entre em
                <strong>
                    <a
                        href={SnackBarWhatsAppLink}
                        style={{ color: "white", textDecoration: "underline" }}
                    >
                        {" "}
                        contato com o suporte{" "}
                    </a>
                </strong>
                para entender o que aconteceu.
            </div>
        </div>
    );
};
export const AlertSnackBar = ({ show }: AlertSnackBarProps) => {
    const [open, setOpen] = useState(show);

    useEffect(() => {
        setOpen(show);
    }, [show]);

    const handleClose = (
        event?: SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={null}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            <SnackbarContent
                sx={{
                    width: 450,
                    minHeight: 66,
                    backgroundColor: "#EF565D",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                }}
                message={<MessageComponent />}
                action={
                    <IconButton
                        size="small"
                        onClick={handleClose}
                        sx={{ color: "white" }}
                    >
                        <Image
                            src={
                                "https://media.graphassets.com/cvo7ewTTTTKXgWHRd6g1"
                            }
                            alt="Close-icon"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                }
            />
        </Snackbar>
    );
};
