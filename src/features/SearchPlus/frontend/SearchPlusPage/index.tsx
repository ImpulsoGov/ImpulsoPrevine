"use client";
import { useState } from "react";
import type { ThematicList } from "./modules/common/carePathways";
import type * as time from "@/features/common/shared/time";
import { ErrorSnackbar } from "./modules/ErrorSnackbar";
import { Content } from "./modules/Content";
import { PageHeader } from "./modules/PageHeader";
import { SuccessSnackbar } from "./modules/SuccessSnackbar";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@mui/material";
import { ButtonLight } from "./modules/ButtonLight";

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

type Props = {
    isSearchPlusABEnabled: boolean;
    isSearchPlusNewCarePathwayEnabled: boolean;
};
const buildUrl = (profiles: Array<number>): string => {
    const baseUrl = `/busca-ativa/citopatologico?aba=&sub_aba=0&visao=`;
    if (profiles.includes(5) || profiles.includes(8)) {
        return `${baseUrl}aps`;
    }
    return `${baseUrl}equipe`;
};
export const SearchPlusPage: React.FC<Props> = ({
    isSearchPlusABEnabled,
    isSearchPlusNewCarePathwayEnabled,
}) => {
    const session = useSession();
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
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                marginTop: "40px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 80px",
                    ...(isMobile
                        ? {
                              alignItems: isSearchPlusABEnabled
                                  ? "center"
                                  : "flex-start",
                              flexDirection: "column",
                              fontSize: "15px",
                              marginBottom: "16px",
                          }
                        : { alignItems: "center" }),
                }}
            >
                <PageHeader
                    isSearchPlusABEnabled={isSearchPlusABEnabled}
                    isMobile={isMobile}
                />
                {isSearchPlusABEnabled && (
                    <ButtonLight
                        url={buildUrl(session.data?.user.perfis || [])}
                        label={"Ver lista de Citopatológico no antigo formato"}
                    />
                )}
            </div>
            <Content
                setSnackbarError={setSnackbarError}
                setSuccessSnackbar={setIsSuccessSnackbarOpen}
                isSearchPlusABEnabled={isSearchPlusABEnabled}
                isMobile={isMobile}
                isSearchPlusNewCarePathwayEnabled={
                    isSearchPlusNewCarePathwayEnabled
                }
            />
            <ErrorSnackbar error={snackbarError} onClose={resetSnackbarError} />
            <SuccessSnackbar
                isOpen={isSuccessSnackbarOpen}
                onClose={resetSuccessSnackbar}
            />
        </div>
    );
};
