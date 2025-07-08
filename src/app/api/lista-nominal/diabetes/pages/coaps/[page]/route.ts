import type { CoapsPageRequestBody } from "@/features/acf/shared/diabetes/schema";
import { coapsPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import { PROFILE_ID } from "@/types/profile";
import { AuthenticationError, type JWTToken } from "@/utils/token";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import type { NextRequest } from "next/server";
import { z, ZodError } from "zod/v4";
import * as interceptors from "@/features/interceptors/backend";

const handler = async (
    req: NextRequest,
    { params }: { params: Promise<{ page: string }> },
    payload: JWTToken["payload"]
): Promise<Response> => {
    try {
        const municipalitySusId = payload.municipio;
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
    } catch (error) {
        //TODO: Fazer essa lógica em algum middleware, não tem pq ficar repetindo isso em todas as rotas.
        console.error(error);
        if (error instanceof ZodError) {
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
};

//TODO: Criar um endpoint equivalente para APS
//TODO: Criar um teste de integração para esta rota
export const POST = interceptors.accessPayload(
    handler as interceptors.HandlerWithPayload
);
