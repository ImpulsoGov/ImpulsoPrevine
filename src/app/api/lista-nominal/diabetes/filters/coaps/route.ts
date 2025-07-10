import * as diabetesBackend from "@/features/acf/backend/diabetes/";
import * as interceptors from "@/features/interceptors/backend";

const handler = async (
    req: interceptors.NextRequestWithUser
): Promise<Response> => {
    const municipalitySusId = req.user.municipalitySusId;
    //TODO: Quando tivermos o caso de APS, vamos ter que rever como fazemos esse filtro de teamIne

    const filters = await diabetesBackend.filterOptionsCoaps(municipalitySusId);
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
