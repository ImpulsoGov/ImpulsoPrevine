import type { NextRequest } from "next/server";
import {
    AuthenticationError,
    decodeToken,
    getEncodedSecret,
    getToken,
    type JWTToken,
} from "@/utils/token";
import * as diabetesFiltersController from "@/features/acf/diabetes/backend/filters/controller";
import { BadRequestError } from "../../../utils/errors";
import { ZodError } from "zod";

//TODO: Criar um teste de integração para esta rota
export async function GET(req: NextRequest): Promise<Response> {
    try {
        //TODO: Extrair essa lógica para um middleware / interceptor
        const token = getToken(req.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;
        const municipalitySusID = payload.municipio as string;
        //TODO: Quando tivermos o caso de APS, vamos ter que rever como fazemos esse filtro de teamIne
        const teamIne = payload.equipe as string;

        const filters = await diabetesFiltersController.filterOptionsCoeq(
            municipalitySusID,
            teamIne
        );
        //TODO adicionar schema de saida
        return Response.json(
            {
                filters,
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
