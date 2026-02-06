import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { SessionGuard } from "@/features/common/frontend/SessionGuard";
import { PROFILE_ID } from "@/types/profile";
import { getServerSession } from "next-auth";
import { ErrorPage } from "@features/acf/frontend/common/ErrorPage";
import { PanelSelector } from "@features/acf/frontend/common/PanelSelector";
import { diabetesNewProgram } from "@/features/common/shared/flags";
import { notFound } from "next/navigation";
import { ContentCoeq, ContentCoaps } from "./modules/List";
import { getMunicipalityName } from "@features/acf/frontend/common/MunicipalityName";
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
export const AcfPage: React.FC<Props> = async () => {
    const session = await getServerSession(nextAuthOptions);
    const municipalityName = getMunicipalityName(
        session?.user.municipio_id_sus ?? ""
    );
    const isCoeq = session?.user.perfis.includes(PROFILE_ID.COEQ);

    const content = isCoeq ? <ContentCoeq /> : <ContentCoaps />;
    const header = {
        ...sharedHeader,
        text: isCoeq ? textCoeq : textCoaps,
    };
    const isDiabetesNewProgramEnabled = await diabetesNewProgram();

    if (!isDiabetesNewProgramEnabled) notFound();

    return (
        <SessionGuard error={<ErrorPage />}>
            <PanelSelector
                municipalityName={municipalityName}
                header={header}
                breadcrumb={breadcrumb.breadcrumb}
                contentWithoutTabs={content}
            />
        </SessionGuard>
    );
};
