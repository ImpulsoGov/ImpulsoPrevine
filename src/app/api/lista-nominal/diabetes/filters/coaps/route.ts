import * as diabetesBackend from "@/features/acf/backend/diabetes/";
import * as interceptors from "@/features/interceptors/backend";
import type { NextRequest } from "next/server";

type Context = { user: interceptors.User };

const handler = async (
    _req: NextRequest,
    { user }: Context
): Promise<Response> => {
    const municipalitySusId = user.municipalitySusId;

    const filters = await diabetesBackend.filterOptionsCoaps(municipalitySusId);
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
    interceptors.catchErrors
);
//TODO: Criar um teste de integração para esta rota
export const GET = composed(handler);
