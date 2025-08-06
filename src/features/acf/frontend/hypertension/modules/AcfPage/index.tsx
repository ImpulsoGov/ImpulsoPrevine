import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { AllowProfile } from "@/features/common/frontend/AllowProfile";
import { SessionGuard } from "@/features/common/frontend/SessionGuard";
import type { ProfileIdValue } from "@/types/profile";
import { PROFILE_ID } from "@/types/profile";
import { getServerSession } from "next-auth";
import type { AcfDashboardType } from "../../../common/DashboardType";
import { ErrorPage } from "../../../common/ErrorPage";
import { PanelSelector } from "../../../common/PanelSelector";
import { hypertensionNewProgram } from "@/features/common/shared/flags";
import { notFound } from "next/navigation";
import { ContentCoeq, ContentCoaps } from "./modules/List/container";
import { municipalityName } from "../../../common/MunicipalityName";

export type {
    CoapsAppliedFilters,
    CoeqAppliedFilters,
} from "./modules/List/index";

type Props = {
    searchParams: Promise<{
        [key: string]: string | undefined;
    }>;
};
export const breadcrumb = {
    breadcrumb: [
        {
            label: "Inicio",
            link: "/inicio",
        },
        {
            label: "Diabetes",
            link: "/lista=diabetes",
        },
    ],
};

export const header = {
    title: "Diabetes",
    tooltip: (
        <div>
            <p>Legenda</p>
            <p>Tipo de diagnóstico:</p>
            <p>
                <b>Autorreferido</b> - a condição foi identificada como
                "autorreferida" quando é relatada pelo usuário na realização do
                Cadastro Individual.
            </p>
            <p>
                <b>Diagnóstico Clínico</b> - a condição foi identificada como
                "diagnóstico clínico" por haver atendimento individual
                confirmando o diagnóstico.
            </p>
        </div>
    ),
    text: "A lista nominal de diabetes reúne os cidadãos que possuem a condição, seja por diagnóstico clínico ou autorreferido, e traz a situação da consulta e da solicitação de hemoblogina, que devem ser realizadas a cada seis meses para acompanhamento. Além disso, você encontrará também o nome profissional responsável pelo cidadão, para facilitar a organização da busca ativa. Utilize os filtros para segmentar a lista como preferir.",
};
export const AcfPage: React.FC<Props> = async ({ searchParams }) => {
    //TODO: Descobrir uma forma de remover essa chamada daqui
    const session = await getServerSession(nextAuthOptions);
    const resolvedSearchParams = await searchParams;
    const initialTabId = resolvedSearchParams.tabID || "charts";
    const initialSubTabId = resolvedSearchParams.subTabID || "ChartSubTabID1";
    const acfDashboardType: AcfDashboardType = (resolvedSearchParams.list ||
        "hypertension") as AcfDashboardType;
    const errorText = (
        <p style={{ padding: "80px", textAlign: "center" }}>
            Usuário sem permissão
        </p>
    );
    const municipalitySusId = municipalityName(
        session?.user.municipio_id_sus ?? ""
    );

    const isHypertensionNewProgramEnabled = await hypertensionNewProgram();
    if (!isHypertensionNewProgramEnabled) notFound();
    return (
        <SessionGuard error={<ErrorPage />}>
            <AllowProfile profileID={PROFILE_ID.impulser} error={errorText}>
                <PanelSelector
                    tabID={initialTabId}
                    subTabID={initialSubTabId}
                    acfDashboardType={acfDashboardType}
                    municipalityName={municipalitySusId}
                    userProfiles={session?.user.perfis as Array<ProfileIdValue>}
                    externalCardsProps={[]}
                    header={header}
                    breadcrumb={breadcrumb.breadcrumb}
                    contentWithoutTabs={
                        session?.user.perfis.includes(PROFILE_ID.COEQ) ? (
                            <ContentCoeq list={acfDashboardType} />
                        ) : (
                            <ContentCoaps list={acfDashboardType} />
                        )
                    }
                />
            </AllowProfile>
        </SessionGuard>
    );
};
