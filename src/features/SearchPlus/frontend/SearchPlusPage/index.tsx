"use client";
import { useState } from "react";
import type { ThematicList } from "./modules/common/carePathways";
import type * as time from "@/features/common/shared/time";
import { ErrorSnackbar } from "./modules/ErrorSnackbar";
import { Content } from "./modules/Content";
import { PageHeader } from "./modules/PageHeader";
import { SuccessSnackbar } from "./modules/SuccessSnackbar";
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
    const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);

    const resetSnackbarError = (): void => {
        setSnackbarError({ title: "", message: null });
    };
    const resetSuccessSnackbar = (): void => {
        setIsSuccessSnackbarOpen(false);
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
                marginLeft: "80px",
                marginRight: "80px",
            }}
        >
            <PageHeader />
            <Content
                setSnackbarError={setSnackbarError}
                setSuccessSnackbar={setIsSuccessSnackbarOpen}
            />
            <ErrorSnackbar error={snackbarError} onClose={resetSnackbarError} />
            <SuccessSnackbar
                isOpen={isSuccessSnackbarOpen}
                onClose={resetSuccessSnackbar}
            />
        </div>
    );
};
