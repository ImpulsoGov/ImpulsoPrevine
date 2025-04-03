import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { SessionGuard } from "@/common/components/SessionGuard";
import { AllowProfile } from "@/componentes/unmounted/Auth/AllowProfile";
import { PROFILE_ID } from "@/types/profile";
import type { ProfileIdValue } from "@/types/profile";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { ErrorPage } from "./ErrorPage";
import { PanelSelectorContainer } from "./modules/PanelSelector/PanelSelector.container";

export const AcfDashboardPage = async ({
    searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
    //TODO: Descobrir uma forma de remover essa chamada daqui
    const session = (await getServerSession(nextAuthOptions)) as Session;

    return (
        <SessionGuard error={<ErrorPage />}>
            <AllowProfile
                profileID={PROFILE_ID.impulser}
                error={
                    <p style={{ padding: "80px", textAlign: "center" }}>
                        Usuário sem permissão
                    </p>
                }
            >
                <PanelSelectorContainer
                    searchParams={searchParams}
                    municipalitySusId={session?.user.municipio_id_sus}
                    teamIne={session?.user.equipe}
                    profileId={session?.user.perfis as ProfileIdValue[]}
                />
            </AllowProfile>
        </SessionGuard>
    );
};
