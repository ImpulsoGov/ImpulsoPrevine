import type { CoapsPageRequestBody } from "@/features/acf/shared/diabetes/schema";
import { coapsPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import { PROFILE_ID } from "@/types/profile";
import { AuthenticationError } from "@/utils/token";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import { z } from "zod/v4";
import * as interceptors from "@/features/interceptors/backend";

const handler = async (
    req: interceptors.NextRequestWithUser,
    { params }: { params: Promise<{ page: string }> }
): Promise<Response> => {
    const municipalitySusId = req.user.municipalitySusId;
    //TODO: Quando tivermos o caso de APS, vamos ter que rever como fazemos esse filtro de teamIne
    const userProfiles = req.user.profiles;
    if (!userProfiles.includes(PROFILE_ID.COAPS)) {
        throw new AuthenticationError(
            "Usuário não autorizado a acessar esta rota"
        );
    }
    const rawPage = (await params).page;
    const pageIndex = z.coerce.number().parse(rawPage);

    const body: unknown = await req.json();
    const queryParams: CoapsPageRequestBody = queryParamsSchema.parse(body);

    const page = await diabetesBackend.getPageCoaps({
        municipalitySusId,
        pageIndex,
        sorting: queryParams.sorting,
        searchString: queryParams.search,
        filters: queryParams.filters,
    });

    const totalRows = await diabetesBackend.getRowCountCoaps({
        municipalitySusId,
        searchString: queryParams.search,
        filters: queryParams.filters,
    });

    //TODO adicionar schema de saida
    return Response.json(
        {
            page,
            totalRows: totalRows,
        },
        { status: 200 }
    );
};

//TODO: Criar um endpoint equivalente para APS
//TODO: Criar um teste de integração para esta rota
export const POST = interceptors.compose(
    interceptors.withUser,
    interceptors.catchErrors
)(handler);
