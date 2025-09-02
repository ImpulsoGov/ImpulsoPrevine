import type { CoeqPageRequestBody } from "@/features/acf/shared/hypertension/schema";
import { coeqPageRequestBody as queryParamsSchema } from "@/features/acf/shared/hypertension/schema";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import * as hypertensionBackend from "@features/acf/backend/hypertension";
import type { NextRequest } from "next/server";

type Context = {
    params: Promise<{ page: string }>;
    user: interceptors.User;
    parsedBody: CoeqPageRequestBody;
};

const handler = async (
    _req: NextRequest,
    { user, parsedBody }: Context
): Promise<Response> => {
    const municipalitySusId = user.municipalitySusId;
    const teamIne = user.teamIne;

    const data = await hypertensionBackend.getAllDataCoeq({
        municipalitySusId,
        sorting: parsedBody.sorting,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
        teamIne,
    });

    //TODO adicionar schema de saida
    return Response.json(data, { status: 200 });
};

const composed = interceptors.compose(
    interceptors.withBodyParsing(queryParamsSchema),
    interceptors.allowByFlag(flags.hypertensionNewProgram),
    interceptors.allowProfiles([PROFILE_ID.COEQ]),
    interceptors.withUser,
    interceptors.catchErrors
);

//TODO: Criar um teste de integração para esta rota
export const POST = composed(handler);
