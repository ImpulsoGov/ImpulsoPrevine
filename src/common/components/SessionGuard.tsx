import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";

export type SessionGuardProps = {
    error: React.ReactElement;
    Children: React.ComponentType<{ session: Session, searchParams: Promise<{ [key: string]: string | undefined }> }>;
    searchParams: Promise<{ [key: string]: string | undefined }>
};

export const SessionGuard  = async ({
    Children,
    error,
    searchParams
}: SessionGuardProps ): Promise<React.ReactNode>  => {
    const session = (await getServerSession(nextAuthOptions)) as Session;
    if (session?.user) return <Children session={session} searchParams={searchParams}/>;
    return error;
};