import type { CoeqPageRequestBody } from "@/features/acf/shared/diabetes/schema";
import { coeqPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import {
    AuthenticationError,
    decodeToken,
    getEncodedSecret,
    getToken,
    type JWTToken,
} from "@/utils/token";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import type { NextRequest } from "next/server";
import { z, ZodError } from "zod/v4";
import { BadRequestError } from "../../../../utils/errors";
import { PROFILE_ID } from "@/types/profile";

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
        const teamIne = payload.equipe;
        const perfis = payload.perfis;
        if (!perfis.includes(PROFILE_ID.COAPS)) {
            throw new AuthenticationError(
                "Usuário não autorizado a acessar esta rota"
            );
        }

        const rawPage = (await params).page;
        const pageIndex = z.coerce.number().parse(rawPage);

        const body: unknown = await req.json();
        const queryParams: CoeqPageRequestBody = queryParamsSchema.parse(body);

        const page = await diabetesBackend.getPageCoeq({
            municipalitySusID,
            teamIne,
            pageIndex,
            sorting: queryParams.sorting,
            searchString: queryParams.search,
            filters: queryParams.filters,
        });

        const totalRows = await diabetesBackend.getRowCountCoeq({
            municipalitySusID,
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
    } catch (error) {
        //TODO: Fazer essa lógica em algum middleware, não tem pq ficar repetindo isso em todas as rotas.
        console.error(error);
        if (error instanceof ZodError) {
            return Response.json({ message: error.message }, { status: 400 });
        }
        if (error instanceof BadRequestError) {
            return Response.json({ message: error.message }, { status: 400 });
        }

        if (error instanceof AuthenticationError) {
            return Response.json({ message: error.message }, { status: 401 });
        }

        return Response.json(
            {
                message: "Erro ao consultar dados",
                detail: (error as Error).message,
            },
            { status: 500 }
        );
    }
}
