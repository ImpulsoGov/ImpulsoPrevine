import { coeqPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import { parseBody } from "@/features/common/backend/Schema";
import { getUser } from "@/features/common/backend/User";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import type { NextRequest } from "next/server";
import { z } from "zod/v4";

type Context = {
    params: Promise<{ page: string }>;
};

async function handler(
    req: NextRequest,
    { params }: Context
): Promise<Response> {
    const user = await getUser(req);

    const rawPage = (await params).page;
    const pageIndex = z.coerce.number().parse(rawPage);

    const parsedBody = await parseBody(req, queryParamsSchema);

    const page = await diabetesBackend.getPageCoeq({
        municipalitySusId: user.municipalitySusId,
        teamIne: user.teamIne,
        pageIndex,
        sorting: parsedBody.sorting,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
    });

    const totalRows = await diabetesBackend.getRowCountCoeq({
        municipalitySusId: user.municipalitySusId,
        teamIne: user.teamIne,
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
    interceptors.allowByFlag(flags.diabetesNewProgram),
    interceptors.allowProfiles([PROFILE_ID.COEQ]),
    interceptors.catchErrors
);

//TODO: Criar um teste de integração para esta rota
export const POST = composed(handler);
