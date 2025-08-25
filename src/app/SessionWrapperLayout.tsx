"use client";
import { SessionProvider } from "next-auth/react";
import type React from "react";

//Aqui é um otimo lugar para criarmos um context para prover a informação de perfil de acesso COAPS ou COEQ
type SessionWrapperLayoutProps = {
    children: React.ReactNode;
};

export const SessionWrapperLayout: React.FC<SessionWrapperLayoutProps> = ({
    children,
}) => {
    return (
        <SessionProvider refetchInterval={60 * 60} refetchOnWindowFocus={true}>
            {children}
        </SessionProvider>
    );
};
