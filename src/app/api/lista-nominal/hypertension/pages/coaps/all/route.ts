import type { CoapsPageRequestBody } from "@/features/acf/shared/hypertension/schema";
import { coapsPageRequestBody as queryParamsSchema } from "@/features/acf/shared/hypertension/schema";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import * as hypertensionBackend from "@features/acf/backend/hypertension";
import type { NextRequest } from "next/server";

type Context = {
    params: Promise<{ page: string }>;
    user: interceptors.User;
    parsedBody: CoapsPageRequestBody;
};

const handler = async (
    _req: NextRequest,
    { user, parsedBody }: Context
): Promise<Response> => {
    const municipalitySusId = user.municipalitySusId;

    const data = await hypertensionBackend.getAllDataCoaps({
        municipalitySusId,
        sorting: parsedBody.sorting,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
    });

    //TODO adicionar schema de saida
    return Response.json(
        {
            data,
        },
        { status: 200 }
    );
};

const composed = interceptors.compose(
    interceptors.withBodyParsing(queryParamsSchema),
    interceptors.allowByFlag(flags.hypertensionNewProgram),
    interceptors.allowProfiles([PROFILE_ID.COAPS]),
    interceptors.withUser,
    interceptors.catchErrors
);

//TODO: Criar um teste de integração para esta rota
export const POST = composed(handler);
