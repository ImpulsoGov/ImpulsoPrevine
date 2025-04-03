import type { Session } from "next-auth";
import type React from "react";

export type SessionGuardProps = React.PropsWithChildren<{
    error: React.ReactElement;
    session: Session | null;
}>;

export const SessionGuard  = async ({
    error,
    session,
    children
}: SessionGuardProps ): Promise<React.ReactNode>  => {
    if (session?.user) return children;
    return error;
};