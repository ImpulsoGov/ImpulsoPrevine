import * as diabetesBackend from "@/features/acf/backend/diabetes/";
import {
    decodeToken,
    getEncodedSecret,
    getToken,
    type JWTToken,
} from "@/utils/token";
import type { NextRequest } from "next/server";
import { errorHandler } from "@/app/api/shared/errorHandler";

//TODO: Criar um teste de integração para esta rota
export async function GET(req: NextRequest): Promise<Response> {
    try {
        //TODO: Extrair essa lógica para um middleware / interceptor
        const token = getToken(req.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;
        const municipalitySusID = payload.municipio;
        //TODO: Quando tivermos o caso de APS, vamos ter que rever como fazemos esse filtro de teamIne
        const teamIne = payload.equipe;

        const filters = await diabetesBackend.filterOptionsCoeq(
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
        return errorHandler(error);
    }
}
