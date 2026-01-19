import { InicioAPSRequest } from "@/services/inicio/inicioAPS";
import { InicioEquipeRequest } from "@/services/inicio/inicioEquipe";

import dynamic from "next/dynamic";
const Inicio = dynamic(() => import("./Inicio").then((mod) => mod.Inicio));

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { unificarSituacaoPorIndicadores } from "@/helpers/inicio/unificarSituacaoPorIndicadores";
import type { SituacaoPorIndicador, SituacaoIndicador } from "@/types/inicio";
import { getServerSession } from "next-auth";
import { AuthErrorPage } from "./AuthError";
import { SupportError } from "./SupportError";
import {
    diabetesNewProgram,
    hypertensionNewProgram,
    searchPlus,
    searchPlusAB,
} from "@/features/common/shared/flags";

const InicioPage: React.FC = async () => {
    const session = await getServerSession(nextAuthOptions);
    let situacaoIndicadores: Array<SituacaoIndicador> | null = null;
    const hasDiabetesNewProgramEnabled = await diabetesNewProgram();
    const hasHypertensionNewProgramEnabled = await hypertensionNewProgram();
    const hasSearchPlusEnabled = await searchPlus();
    const isSearchPlusABEnabled = await searchPlusAB();

    if (session?.user) {
        if (
            session.user.perfis.includes(5) ||
            session.user.perfis.includes(8)
        ) {
            const response = await InicioAPSRequest(
                session.user.municipio_id_sus,
                session.user.access_token
            );
            if (response) situacaoIndicadores = response;
        }

        if (session.user.perfis.includes(9)) {
            const response = await InicioEquipeRequest(
                session.user.municipio_id_sus,
                session.user.equipe,
                session.user.access_token
            );
            if (response) situacaoIndicadores = response;
        }
        const situacaoPorIndicador: SituacaoPorIndicador | null =
            unificarSituacaoPorIndicadores(situacaoIndicadores);
        if (!situacaoPorIndicador) return <SupportError />;
        if (Object.keys(situacaoPorIndicador).length === 0)
            return <SupportError />;
        return (
            <Inicio
                situacaoPorIndicador={situacaoPorIndicador}
                data-testid="inicio-component"
                hasDiabetesNewProgramEnabled={hasDiabetesNewProgramEnabled}
                hasHypertensionNewProgramEnabled={
                    hasHypertensionNewProgramEnabled
                }
                hasSearchPlusEnabled={hasSearchPlusEnabled}
                isSearchPlusABEnabled={isSearchPlusABEnabled}
            />
        );
    }
    return <AuthErrorPage />;
};

export default InicioPage;
