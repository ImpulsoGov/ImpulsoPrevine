import type { NextRequest } from "next/server";
import type { RequestBody } from "@/features/acf/diabetes/common/schema";
import { requestBody as queryParamsSchema } from '@/features/acf/diabetes/common/schema';
import { AuthenticationError, decodeToken, getEncodedSecret, getToken, type JWTToken } from "@/utils/token";
import * as diabetesController from "@/features/acf/diabetes/backend/controller";
import { BadRequestError } from "../../../utils/errors";
import { z, ZodError } from "zod";

//TODO: Criar um teste de integração para esta rota
export async function POST(
    req: NextRequest,
    { params } : { params: Promise<{ page: string }> } 
) {
    try {
        //TODO: Extrair essa lógica para um middleware / interceptor
        const token = getToken(req.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;
        const municipalitySusID = payload?.municipio as string;
        //TODO: Quando tivermos o caso de APS, vamos ter que rever como fazemos esse filtro de teamIne
        const teamIne = payload?.equipe as string;

        const rawPage = (await params).page;
        console.log(rawPage);
        const pageIndex = z.coerce.number().parse(rawPage);

        const body = await req.json();
        const queryParams = queryParamsSchema.parse(body) as RequestBody;

        const page = await diabetesController.page(municipalitySusID, teamIne, pageIndex, queryParams.filters || {});
        const totalRows = await diabetesController.rowCount(municipalitySusID, teamIne, queryParams.filters || {});

        return Response.json(
            {
                page,
                totalRows: totalRows,
            },
            { status: 200 },
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
            { status: 500 },
        );
    }
}