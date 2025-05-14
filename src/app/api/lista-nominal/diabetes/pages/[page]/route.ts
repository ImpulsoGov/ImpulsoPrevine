import type { NextRequest } from "next/server";
import type { RequestBody } from "@/features/acf/diabetes/common/schema";
import { requestBody as queryParamsSchema } from '@/features/acf/diabetes/common/schema';
import { AuthenticationError, decodeToken, getEncodedSecret, getToken, type JWTToken } from "@/utils/token";
import { diabetesData, diabetesDataCount } from "@/features/acf/diabetes/backend/controller";
import { BadRequestError } from "../../../utils/errors";
import { z, ZodError } from "zod";

export async function POST(
    req: NextRequest,
    { params } : { params: Promise<{ page: string }> } 
) {
    try {
        const token = getToken(req.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;
        //TODO: Se alguém estiver logado com um municipalitySusID e passar outro no body, o que acontece?
        const municipalitySusID = payload?.municipio as string;
        //TODO: Se alguém estiver logado com um teamIne e passar outro no body, o que acontece?
        const teamIne = payload?.equipe as string;

        const rawPage = (await params).page;
        console.log(rawPage);
        const page = z.coerce.number().parse(rawPage);

        const body = await req.json();
        const queryParams = queryParamsSchema.parse(body) as RequestBody;

        //TODO: Tirar esse filtro vazio || {}
        const data = await diabetesData(municipalitySusID, teamIne, page, queryParams.filters || {});
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