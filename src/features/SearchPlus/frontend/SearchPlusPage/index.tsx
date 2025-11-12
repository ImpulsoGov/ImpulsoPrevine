"use client";
import { useState } from "react";
import type { ThematicList } from "./modules/common/carePathways";
import type * as time from "@/features/common/shared/time";
import { ErrorSnackbar } from "./modules/ErrorSnackbar";
import { AvailableLists } from "./modules/AvailableLists";
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
            }}
        >
            <PageHeader />
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
