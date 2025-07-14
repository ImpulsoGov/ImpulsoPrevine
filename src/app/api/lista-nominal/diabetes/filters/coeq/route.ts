import * as diabetesBackend from "@/features/acf/backend/diabetes/";
import * as interceptors from "@/features/interceptors/backend";
import type { NextRequest } from "next/server";

type Context = {
    user: interceptors.User;
};

const handler = async (
    _req: NextRequest,
    { user }: Context
): Promise<Response> => {
    const municipalitySusId = user.municipalitySusId;
    const teamIne = user.teamIne;

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

//TODO: Criar um teste de integração para esta rota
export const GET = interceptors.compose(
    interceptors.withUser,
    interceptors.catchErrors
)(handler);
