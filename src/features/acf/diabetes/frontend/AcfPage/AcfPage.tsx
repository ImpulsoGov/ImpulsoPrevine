import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { SessionGuard } from "@/common/components/SessionGuard";
import { AllowProfile } from "@/componentes/unmounted/Auth/AllowProfile";
import type { ProfileIdValue } from "@/types/profile";
import { PROFILE_ID } from "@/types/profile";
import { getServerSession } from "next-auth";
import { ErrorPage } from "./modules/ErrorPage";
import { PanelSelectorContainer } from "./modules/PanelSelector";
import type { AcfDashboardType } from "../../common/model";

type Props = {
    searchParams: Promise<{
        [key: string]: string | undefined;
    }>;
};

export const AcfDashboardPage: React.FC<Props> = async ({ searchParams }) => {
    //TODO: Descobrir uma forma de remover essa chamada daqui
    const session = await getServerSession(nextAuthOptions);
    const resolvedSearchParams = await searchParams;
    const initialTabId = resolvedSearchParams.tabID || "charts";
    const initialSubTabId = resolvedSearchParams.subTabID || "ChartSubTabID1";
    const acfDashboardType: AcfDashboardType = (resolvedSearchParams.list ||
        "DIABETES") as AcfDashboardType;

    const errorText = (
        <p style={{ padding: "80px", textAlign: "center" }}>
            Usuário sem permissão
        </p>
    );

    return (
        <SessionGuard error={<ErrorPage />}>
            <AllowProfile profileID={PROFILE_ID.impulser} error={errorText}>
                <PanelSelectorContainer
                    initialTabId={initialTabId}
                    initialSubTabId={initialSubTabId}
                    acfDashboardType={acfDashboardType}
                    //@ts-expect-error o componente SessionGuard usado acima garante que não chega undefined aqui. Precisamos refatorar pra não gerar este erro.
                    municipalitySusId={session?.user.municipio_id_sus}
                    //@ts-expect-error o componente SessionGuard usado acima garante que não chega undefined aqui. Precisamos refatorar pra não gerar este erro.
                    teamIne={session?.user.equipe}
                    userProfiles={session?.user.perfis as Array<ProfileIdValue>}
                />
            </AllowProfile>
        </SessionGuard>
    );
};
