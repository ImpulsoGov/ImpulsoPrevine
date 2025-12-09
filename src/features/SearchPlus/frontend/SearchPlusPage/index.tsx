"use client";
import { useState } from "react";
import type { ThematicList } from "./modules/common/carePathways";
import type * as time from "@/features/common/shared/time";
import { ErrorSnackbar } from "./modules/ErrorSnackbar";
import { Content } from "./modules/Content";
import { PageHeader } from "./modules/PageHeader";

export type HeaderData = {
    thematicList: ThematicList | null;
    createdAtDate: time.BRTDateString;
    createdAtTime: time.BRTTimeString;
    filters: Record<string, string | null>;
    teamName: string | undefined;
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
                marginTop: "40px",
            }}
        >
            <PageHeader />
            <p style={{ width: "51%", fontSize: "20px", marginBottom: "48px" }}>
                Converta seus relatórios do PEC em segundos, e tenha listas
                prontas para distribuir aos ACS e simplificar o acompanhamento
                dos cidadãos.
            </p>
            <Content setSnackbarError={setSnackbarError} />
            <ErrorSnackbar error={snackbarError} onClose={resetSnackbarError} />
        </div>
    );
};
