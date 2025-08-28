// TODO atualizar textos
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { SessionGuard } from "@/features/common/frontend/SessionGuard";
import type { ProfileIdValue } from "@/types/profile";
import { PROFILE_ID } from "@/types/profile";
import { getServerSession } from "next-auth";
import type { AcfDashboardType } from "../../../common/DashboardType";
import { ErrorPage } from "../../../common/ErrorPage";
import { PanelSelector } from "../../../common/PanelSelector";
import { hypertensionNewProgram } from "@/features/common/shared/flags";
import { notFound } from "next/navigation";
import { ContentCoeq, ContentCoaps } from "./modules/List";
import { getMunicipalityName } from "../../../common/MunicipalityName";
import { sharedHeader, breadcrumb, textCoaps, textCoeq } from "./consts";

export type {
    CoapsAppliedFilters,
    CoeqAppliedFilters,
} from "./modules/List/index";

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
        "hypertension") as AcfDashboardType;
    const municipalityName = getMunicipalityName(
        session?.user.municipio_id_sus ?? ""
    );
    const isCoeq = session?.user.perfis.includes(PROFILE_ID.COEQ);
    const content = isCoeq ? (
        <ContentCoeq list={acfDashboardType} />
    ) : (
        <ContentCoaps list={acfDashboardType} />
    );
    const header = {
        ...sharedHeader,
        text: isCoeq ? textCoeq : textCoaps,
    };
    const isHypertensionNewProgramEnabled = await hypertensionNewProgram();

    if (!isHypertensionNewProgramEnabled) notFound();

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
                contentWithoutTabs={content}
            />
        </SessionGuard>
    );
};
