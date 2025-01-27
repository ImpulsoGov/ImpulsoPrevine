'use client'
import { SessionProvider} from "next-auth/react";
import React from "react";
interface SessionWrapperLayoutProps {
    children : React.ReactNode
}
  export const SessionWrapperLayout: React.FC<SessionWrapperLayoutProps> = ({ children }) => {
    return (
      <SessionProvider refetchInterval={60 * 60} refetchOnWindowFocus={true}>
        {children}
      </SessionProvider>
    );
  };