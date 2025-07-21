import * as diabetesBackend from "@/features/acf/backend/diabetes/";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import type { NextRequest } from "next/server";
import { diabetesNewProgram } from "@/features/common/shared/flags";

type Context = { user: interceptors.User };

const handler = async (
    _req: NextRequest,
    { user }: Context
): Promise<Response> => {
    const municipalitySusId = user.municipalitySusId;
    const teamIne = user.teamIne;
    const isDiabetesNewProgramEnabled = await diabetesNewProgram();
    if (!isDiabetesNewProgramEnabled) return Response.json({}, { status: 404 });
    const filters = await diabetesBackend.filterOptionsCoeq(
        municipalitySusId,
        teamIne
    );
    //TODO adicionar schema de saida
    return Response.json(
        {
            filters,
        },
        { status: 200 }
    );
};

const composed = interceptors.compose(
    interceptors.withUser,
    interceptors.allowProfiles([PROFILE_ID.COEQ]),
    interceptors.catchErrors
);
//TODO: Criar um teste de integração para esta rota
export const GET = composed(handler);
