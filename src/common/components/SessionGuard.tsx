import type { Session } from "next-auth";
import type React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";

export type SessionGuardProps = React.PropsWithChildren<{
    error: React.ReactElement;
}>;

export const SessionGuard = async ({
    error,
    children,
}: SessionGuardProps): Promise<React.ReactNode> => {
    const session = (await getServerSession(nextAuthOptions)) as Session;
    if (session?.user) return children;
    return error;
};
