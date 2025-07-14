import type { CoeqPageRequestBody } from "@/features/acf/shared/diabetes/schema";
import { coeqPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import { AuthenticationError } from "@/utils/token";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import type { NextRequest } from "next/server";
import { z } from "zod/v4";

type Context = {
    params: Promise<{ page: string }>;
    user: interceptors.User;
};

async function handler(
    req: NextRequest,
    { params, user }: Context
): Promise<Response> {
    const municipalitySusId = user.municipalitySusId;
    const teamIne = user.teamIne;
    const perfis = user.profiles;
    if (!perfis.includes(PROFILE_ID.COEQ)) {
        throw new AuthenticationError(
            "Usuário não autorizado a acessar esta rota"
        );
    }

    const rawPage = (await params).page;
    const pageIndex = z.coerce.number().parse(rawPage);

    const body: unknown = await req.json();
    const queryParams: CoeqPageRequestBody = queryParamsSchema.parse(body);

    const page = await diabetesBackend.getPageCoeq({
        municipalitySusId,
        teamIne,
        pageIndex,
        sorting: queryParams.sorting,
        searchString: queryParams.search,
        filters: queryParams.filters,
    });

    const totalRows = await diabetesBackend.getRowCountCoeq({
        municipalitySusId,
        teamIne,
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
}

const composed = interceptors.compose(
    interceptors.parseBody(queryParamsSchema),
    interceptors.withUser,
    interceptors.catchErrors
);

//TODO: Criar um teste de integração para esta rota
export const POST = composed(handler);
