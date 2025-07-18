import type { CoapsPageRequestBody } from "@/features/acf/shared/diabetes/schema";
import { coapsPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import { PROFILE_ID } from "@/types/profile";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import { z } from "zod/v4";
import * as interceptors from "@/features/interceptors/backend";
import type { NextRequest } from "next/server";

type Context = {
    params: Promise<{ page: string }>;
    user: interceptors.User;
    parsedBody: CoapsPageRequestBody;
};

const handler = async (
    _req: NextRequest,
    { params, user, parsedBody }: Context
): Promise<Response> => {
    const municipalitySusId = user.municipalitySusId;
    const rawPage = (await params).page;
    const pageIndex = z.coerce.number().parse(rawPage);

    const page = await diabetesBackend.getPageCoaps({
        municipalitySusId,
        pageIndex,
        sorting: parsedBody.sorting,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
    });

    const totalRows = await diabetesBackend.getRowCountCoaps({
        municipalitySusId,
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
};

const composed = interceptors.compose(
    interceptors.withBodyParsing(queryParamsSchema),
    interceptors.allowProfiles([PROFILE_ID.COAPS]),
    interceptors.withUser,
    interceptors.catchErrors
);

//TODO: Criar um teste de integração para esta rota
export const POST = composed(handler);
