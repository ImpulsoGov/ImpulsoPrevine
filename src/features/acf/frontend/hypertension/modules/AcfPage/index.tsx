// TODO atualizar textos
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { SessionGuard } from "@/features/common/frontend/SessionGuard";
import { PROFILE_ID } from "@/types/profile";
import { getServerSession } from "next-auth";
import { ErrorPage } from "../../../common/ErrorPage";
import { PanelSelector } from "../../../common/PanelSelector";
import { print } from "@/features/common/shared/flags";
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
export const AcfPage: React.FC<Props> = async () => {
    //TODO: Descobrir uma forma de remover essa chamada daqui
    const session = await getServerSession(nextAuthOptions);
    const municipalityName = getMunicipalityName(
        session?.user.municipio_id_sus ?? ""
    );
    const isCoeq = session?.user.perfis.includes(PROFILE_ID.COEQ);
    const isPrintEnabled = await print();

    const content = isCoeq ? (
        <ContentCoeq isPrintEnabled={isPrintEnabled} />
    ) : (
        <ContentCoaps isPrintEnabled={isPrintEnabled} />
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
                municipalityName={municipalityName}
                header={header}
                breadcrumb={breadcrumb.breadcrumb}
                contentWithoutTabs={content}
            />
        </SessionGuard>
    );
};
