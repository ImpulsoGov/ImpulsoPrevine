import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { SessionGuard } from "@/features/common/frontend/SessionGuard";
import type { ProfileIdValue } from "@/types/profile";
import { PROFILE_ID } from "@/types/profile";
import { getServerSession } from "next-auth";
import type { AcfDashboardType } from "../../../common/DashboardType";
import { ErrorPage } from "../../../common/ErrorPage";
import { PanelSelector } from "./modules/PanelSelector";
import { diabetesNewProgram } from "@/features/common/shared/flags";
import { notFound } from "next/navigation";
import { List } from "./modules/PanelSelector/modules/List";

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

    const isDiabetesNewProgramEnabled = await diabetesNewProgram();
    if (!isDiabetesNewProgramEnabled) notFound();
    return (
        <SessionGuard error={<ErrorPage />}>
            <PanelSelector
                initialTabId={initialTabId}
                initialSubTabId={initialSubTabId}
                acfDashboardType={acfDashboardType}
                //@ts-expect-error o componente SessionGuard usado acima garante que não chega undefined aqui. Precisamos refatorar pra não gerar este erro.
                municipalitySusId={session?.user.municipio_id_sus}
                userProfiles={session?.user.perfis as Array<ProfileIdValue>}
                contentWithoutTabs={
                    <List
                        list={acfDashboardType}
                        municipalitySusId={session?.user.municipio_id_sus ?? ""}
                        teamIne={session?.user.equipe ?? ""}
                        userProfile={
                            session?.user.perfis.includes(PROFILE_ID.COAPS)
                                ? PROFILE_ID.COAPS
                                : PROFILE_ID.COEQ
                        }
                    />
                }
            />
        </SessionGuard>
    );
};
