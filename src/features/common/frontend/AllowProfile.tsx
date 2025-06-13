import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import type { ProfileIdValue } from "@/types/profile";
import { getServerSession } from "next-auth";

type AllowProfileProps = React.PropsWithChildren<{
    error: React.ReactElement;
    profileID: ProfileIdValue;
}>;

export const AllowProfile: React.FC<AllowProfileProps> = async ({
    children,
    error,
    profileID,
}) => {
    //TODO: Verificar se conseguimos remover esta dependencia do getServerSession
    const session = await getServerSession(nextAuthOptions);
    if (!session?.user.perfis.includes(profileID)) return error;
    return children;
};
