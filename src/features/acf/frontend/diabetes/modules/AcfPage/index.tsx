import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { AllowProfile } from "@/features/common/frontend/AllowProfile";
import { SessionGuard } from "@/features/common/frontend/SessionGuard";
import type { ProfileIdValue } from "@/types/profile";
import { PROFILE_ID } from "@/types/profile";
import { getServerSession } from "next-auth";
import type { AcfDashboardType } from "@features/acf/shared/diabetes/model";
import { ErrorPage } from "./modules/ErrorPage";
import { PanelSelector } from "./modules/PanelSelector";
import { diabetesNewProgram } from "@/features/common/shared/flags";
import { notFound } from "next/navigation";

export type {
    CoapsAppliedFilters,
    CoeqAppliedFilters,
} from "./modules/PanelSelector";

type Props = {
    searchParams: Promise<{
        [key: string]: string | undefined;
    }>;
};

export const AcfPage: React.FC<Props> = async ({ searchParams }) => {
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

    const isDiabetesNewProgramEnabled = await diabetesNewProgram();
    if (!isDiabetesNewProgramEnabled) notFound();
    return (
        <SessionGuard error={<ErrorPage />}>
            <AllowProfile profileID={PROFILE_ID.impulser} error={errorText}>
                <PanelSelector
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
