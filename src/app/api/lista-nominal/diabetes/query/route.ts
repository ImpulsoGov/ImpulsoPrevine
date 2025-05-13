import type { NextRequest } from "next/server";
import type { QueryParams } from "./schema";
import { queryParams as queryParamsSchema } from './schema';
import { AuthenticationError, decodeToken, getEncodedSecret, getToken, type JWTToken } from "@/utils/token";
import { diabetesData, diabetesDataCount } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/PaginatedTable/modules/DataTable/modules/diabetes/diabetes.controller";
import { BadRequestError } from "../../utils/errors";
import { ZodError } from "zod";

//TODO: Controllers não deveriam morar dentro de módulos privados, deveriamos passar eles pra fora
export async function POST(
    req: NextRequest
) {
    try {
        const token = getToken(req.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;
        //TODO: Se alguém estiver logado com um municipalitySusID e passar outro no body, o que acontece?
        const municipalitySusID = payload?.municipio as string;
        //TODO: Se alguém estiver logado com um teamIne e passar outro no body, o que acontece?
        const teamIne = payload?.equipe as string;

        const body = await req.json();
        const queryParams = queryParamsSchema.parse(body) as QueryParams;

        //TODO: Tirar esse filtro vazio || {}
        const data = await diabetesData(municipalitySusID, teamIne, queryParams.pagination, queryParams.filters || {});
        //TODO: Tirar esse filtro vazio || {}
        const totalRows = await diabetesDataCount(municipalitySusID, teamIne, queryParams.filters || {});

        return Response.json(
            {
                data,
                totalRows: totalRows,
            },
            { status: 200 },
        );
    } catch (error) {
        //TODO: Fazer essa lógica em algum middleware
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