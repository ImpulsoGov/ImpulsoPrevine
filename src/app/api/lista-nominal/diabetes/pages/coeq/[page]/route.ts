import type { CoeqPageRequestBody } from "@/features/acf/shared/diabetes/schema";
import { coeqPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import type { NextRequest } from "next/server";
import { z } from "zod/v4";

type Context = {
    params: Promise<{ page: string }>;
    user: interceptors.User;
    parsedBody: CoeqPageRequestBody;
};

async function handler(
    _req: NextRequest,
    { params, user, parsedBody }: Context
): Promise<Response> {
    const municipalitySusId = user.municipalitySusId;

    const teamIne = user.teamIne;
    const rawPage = (await params).page;
    const pageIndex = z.coerce.number().parse(rawPage);

    const page = await diabetesBackend.getPageCoeq({
        municipalitySusId,
        teamIne,
        pageIndex,
        sorting: parsedBody.sorting,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
    });

    const totalRows = await diabetesBackend.getRowCountCoeq({
        municipalitySusId,
        teamIne,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
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
    interceptors.withBodyParsing(queryParamsSchema),
    interceptors.allowByFlag(flags.diabetesNewProgram),
    interceptors.allowProfiles([PROFILE_ID.COEQ]),
    interceptors.withUser,
    interceptors.catchErrors
);

//TODO: Criar um teste de integração para esta rota
export const POST = composed(handler);
