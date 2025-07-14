import type { CoapsPageRequestBody } from "@/features/acf/shared/diabetes/schema";
import { coapsPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import { PROFILE_ID } from "@/types/profile";
import { AuthenticationError } from "@/utils/token";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import { z } from "zod/v4";
import * as interceptors from "@/features/interceptors/backend";
import type { NextRequest } from "next/server";

type Context = {
    params: Promise<{ page: string }>;
    user: interceptors.User;
};

const handler = async (
    req: NextRequest,
    { params, user }: Context
): Promise<Response> => {
    const municipalitySusId = user.municipalitySusId;
    const userProfiles = user.profiles;
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

const schemaValidator = interceptors.parseBody(queryParamsSchema);

// const composed = interceptors.compose(
//     interceptors.withUser,
//     schemaValidator,
//     interceptors.catchErrors
// );

//TODO: Criar um teste de integração para esta rota
// export const POST = composed(handler);
// const withUser = interceptors.withUser();
const parseBody = interceptors.parseBody(queryParamsSchema);
// const catchErrors = interceptos.catchErrors();

export const POST = interceptors.withUser(
    interceptors.parseBody(queryParamsSchema)(interceptors.catchErrors(handler))
);
