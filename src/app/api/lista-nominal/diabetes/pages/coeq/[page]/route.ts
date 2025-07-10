import type { CoeqPageRequestBody } from "@/features/acf/shared/diabetes/schema";
import { coeqPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import {
    AuthenticationError,
    decodeToken,
    getEncodedSecret,
    getToken,
    type JWTToken,
} from "@/utils/token";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import type { NextRequest } from "next/server";
import { z } from "zod/v4";

async function handler(
    req: NextRequest,
    { params }: { params: Promise<{ page: string }> }
): Promise<Response> {
    //TODO: Extrair essa lógica para um middleware / interceptor
    const token = getToken(req.headers);
    const secret = getEncodedSecret();
    const { payload } = (await decodeToken(token, secret)) as JWTToken;
    const municipalitySusId = payload.municipio;
    //TODO: Quando tivermos o caso de APS, vamos ter que rever como fazemos esse filtro de teamIne
    const teamIne = payload.equipe;
    const perfis = payload.perfis;
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

//TODO: Criar um endpoint equivalente para APS
//TODO: Criar um teste de integração para esta rota
// ? deveria dar erro porque onde espero um NextRequestWithPayload, recebo um NextRequest?
export const POST = interceptors.catchErrors(handler);
