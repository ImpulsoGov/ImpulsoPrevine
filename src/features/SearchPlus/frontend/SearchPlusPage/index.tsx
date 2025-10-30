"use client";
import { useState } from "react";
import type { ThematicList } from "./modules/common/carePathways";
import type * as time from "@/features/common/shared/time";
import Image from "next/image";
import { ErrorSnackbar } from "./modules/ErrorSnackbar";
import { AvailableLists } from "./modules/AvailableLists";
import { Content } from "./modules/Content";

export type HeaderData = {
    thematicList: ThematicList | null;
    createdAtDate: time.BRTDateString;
    createdAtTime: time.BRTTimeString;
};

export type ErrorData = {
    title: string;
    message: string | null;
};

export const SearchPlusPage: React.FC = () => {
    const [snackbarError, setSnackbarError] = useState<ErrorData>({
        title: "",
        message: null,
    });

    const resetSnackbarError = (): void => {
        setSnackbarError({ title: "", message: null });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* TODO componentizar */}
            <div
                style={{
                    padding: "20px",
                    fontSize: "48px",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                <span>
                    <Image
                        src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh9861jj03hp07kc08jyagdz"
                        alt="Busca+Mais Logo"
                        width={56}
                        height={28}
                    />
                </span>{" "}
                Busca+Mais
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Content setSnackbarError={setSnackbarError} />
            </div>
            <ErrorSnackbar error={snackbarError} onClose={resetSnackbarError} />
            <AvailableLists />
        </div>
    );
};
