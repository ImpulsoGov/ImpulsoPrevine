import * as diabetesController from "@/features/acf/diabetes/backend/table/controller";
import type { CoeqPageRequestBody } from "@/features/acf/diabetes/common/schema";
import { pageRequestBody as queryParamsSchema } from "@/features/acf/diabetes/common/schema";
import {
    AuthenticationError,
    decodeToken,
    getEncodedSecret,
    getToken,
    type JWTToken,
} from "@/utils/token";
import type { NextRequest } from "next/server";
import { z, ZodError } from "zod";
import { BadRequestError } from "../../../utils/errors";

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
        const municipalitySusID = payload.municipio as string;
        //TODO: Quando tivermos o caso de APS, vamos ter que rever como fazemos esse filtro de teamIne
        const teamIne = payload.equipe as string;

        const rawPage = (await params).page;
        const pageIndex = z.coerce.number().parse(rawPage);

        const body: unknown = await req.json();
        const queryParams: CoeqPageRequestBody = queryParamsSchema.parse(body);

        const page = await diabetesController.page(
            municipalitySusID,
            teamIne,
            pageIndex,
            queryParams.filters || {},
            queryParams.sorting,
            queryParams.search
        );
        const totalRows = await diabetesController.rowCount(
            municipalitySusID,
            teamIne,
            queryParams.filters || {},
            queryParams.search
        );
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
