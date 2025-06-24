import type { CoapsPageRequestBody } from "@/features/acf/shared/diabetes/schema";
import { coapsPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import {
    decodeToken,
    getEncodedSecret,
    getToken,
    type JWTToken,
} from "@/utils/token";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import type { NextRequest } from "next/server";
import { z } from "zod/v4";
import { PROFILE_ID } from "@/types/profile";
import { errorHandler } from "@/app/api/shared/errorHandler";
import { AuthenticationError } from "@/app/api/shared/errors";

//TODO: Criar um endpoint equivalente para APS
//TODO: Criar um teste de integração para esta rota
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ page: string }> }
): Promise<Response> {
    try {
        //TODO: Extrair essa lógica para um middleware / interceptor
        const token = getToken(req.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;
        const municipalitySusID = payload.municipio;
        //TODO: Quando tivermos o caso de APS, vamos ter que rever como fazemos esse filtro de teamIne
        const perfis = payload.perfis;
        if (!perfis.includes(PROFILE_ID.COAPS)) {
            throw new AuthenticationError(
                "Usuário não autorizado a acessar esta rota"
            );
        }
        const rawPage = (await params).page;
        const pageIndex = z.coerce.number().parse(rawPage);

        const body: unknown = await req.json();
        const queryParams: CoapsPageRequestBody = queryParamsSchema.parse(body);

        const page = await diabetesBackend.getPageCoaps({
            municipalitySusID,
            pageIndex,
            sorting: queryParams.sorting,
            searchString: queryParams.search,
            filters: queryParams.filters,
        });

        const totalRows = await diabetesBackend.getRowCountCoaps({
            municipalitySusID,
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
    } catch (error) {
        return errorHandler(error);
    }
}
