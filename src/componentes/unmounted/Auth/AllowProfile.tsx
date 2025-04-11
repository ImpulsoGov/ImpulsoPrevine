import type { Session } from "next-auth";
import type { ProfileIdValue } from "@/types/profile";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";

export type AllowProfileProps = React.PropsWithChildren<{
    // user: Session["user"];
    error: React.ReactElement;
    profileID: ProfileIdValue;
}>;

export const AllowProfile = async ({
    children,
    error,
    profileID,
}: AllowProfileProps) => {
    //TODO: Verificar se conseguimos remover esta dependencia do getServerSession
    const session = (await getServerSession(nextAuthOptions)) as Session;
    if (!session?.user.perfis.includes(profileID)) return error;
    return children;
};
