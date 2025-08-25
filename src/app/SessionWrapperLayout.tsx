"use client";
import { SessionProvider } from "next-auth/react";
import type React from "react";

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
