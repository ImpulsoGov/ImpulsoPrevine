import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { SessionGuard } from "@/features/common/frontend/SessionGuard";
import type { ProfileIdValue } from "@/types/profile";
import { PROFILE_ID } from "@/types/profile";
import { getServerSession } from "next-auth";
import type { AcfDashboardType } from "@features/acf/frontend/common/DashboardType";
import { ErrorPage } from "@features/acf/frontend/common/ErrorPage";
import { diabetesNewProgram } from "@/features/common/shared/flags";
import { notFound } from "next/navigation";
import { List } from "./modules/List";
import { PanelSelector } from "@/features/acf/frontend/common/PanelSelector";
import { getMunicipalityName } from "@/features/acf/frontend/common/MunicipalityName";
import { breadcrumb, header } from "./consts";

export type { CoapsAppliedFilters, CoeqAppliedFilters } from "./modules/List";

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

    const municipalityName = getMunicipalityName(
        session?.user.municipio_id_sus ?? ""
    );

    const isDiabetesNewProgramEnabled = await diabetesNewProgram();
    if (!isDiabetesNewProgramEnabled) notFound();
    return (
        <SessionGuard error={<ErrorPage />}>
            <PanelSelector
                tabID={initialTabId}
                subTabID={initialSubTabId}
                acfDashboardType={acfDashboardType}
                municipalityName={municipalityName}
                userProfiles={session?.user.perfis as Array<ProfileIdValue>}
                externalCardsProps={[]}
                header={header}
                breadcrumb={breadcrumb.breadcrumb}
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
                        isPrintEnabled={false}
                    />
                }
            />
        </SessionGuard>
    );
};
