'use client'
import { SessionProvider, useSession } from "next-auth/react";
import * as Sentry from "@sentry/nextjs";
import React, { useEffect } from "react";
interface SessionWrapperLayoutProps {
	children: React.ReactNode;
}
const SentryUserSetter = () => {
    const { data: session } = useSession();
    useEffect(() => {
      if (session?.user) {
        Sentry.setUser({
          id: session.user.id, 
          username: session.user.nome,
        });
      }
    }, [session]);
  
    return null; // This component doesn't render anything, it just updates Sentry
  };
  export const SessionWrapperLayout: React.FC<SessionWrapperLayoutProps> = ({ children }) => {
    return (
      <SessionProvider refetchInterval={60 * 60} refetchOnWindowFocus={true}>
        <SentryUserSetter /> {/* This runs the user tracking logic */}
        {children}
      </SessionProvider>
    );
  };
