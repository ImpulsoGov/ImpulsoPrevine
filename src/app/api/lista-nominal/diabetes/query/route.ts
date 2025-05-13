import type { NextRequest } from "next/server";
import type { QueryParams } from "./schema";
import { AuthenticationError, decodeToken, getEncodedSecret, getToken, type JWTToken } from "@/utils/token";
import { validatePaginationParams } from "../../utils/validatePaginationParams";
import { diabetesData, diabetesDataCount } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/dashboards/modules/PaginatedTable/modules/DataTable/modules/diabetes/diabetes.controller";
import { BadRequestError } from "../../utils/errors";

//TODO: Arrumar esses imports para ficarem fora dos módulos

//TODO: Adicionar schema validation com zod: https://reacthustle.com/blog/next-js-add-typescript-types-to-api-request-body-using-zod

export async function POST(
    req: NextRequest
) {
    console.log("Request chegou");

    //TODO: Só fazer esse cast se a validação com zod funcionar
    const queryParams = await req.json() as QueryParams;

    console.log("query params");
    console.log(queryParams);
   
    try {
        // const { list } = await params; // quando for utilizar a conexao com o banco de dados
        const token = getToken(req.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;
        const municipalitySusID = payload?.municipio as string;
        const teamIne = payload?.equipe as string;

        const pagination =  queryParams.pagination
        const filters = queryParams.filters;

        //TODO: Checar se dá pra validar valores < 0 usando o zod
        if (pagination.page || pagination.pageSize) validatePaginationParams(pagination);

        //TODO: Tirar esse filtro vazio
        const data = await diabetesData(municipalitySusID, teamIne, pagination, filters || {});
        const totalRows = await diabetesDataCount(municipalitySusID, teamIne, filters || {});

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