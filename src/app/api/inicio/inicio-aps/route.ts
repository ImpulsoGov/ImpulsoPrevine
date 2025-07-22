import { prisma } from "@prisma/production/prismaClient";
import type { NextRequest } from "next/server";
import * as interceptors from "@/features/interceptors/backend";

const handler = async (req: NextRequest): Promise<Response> => {
    const searchParams = req.nextUrl.searchParams;
    const municipioIdSus = searchParams.get("municipio_id_sus");
    if (!municipioIdSus)
        return Response.json(
            { message: "Parâmetro municipio_id_sus é obrigatório" },
            { status: 400 }
        );
    const getData = await prisma.dados_agregados_area_logada.groupBy({
        by: ["municipio_id_sus", "indicador", "parametro_descricao"],
        where: {
            municipio_id_sus: municipioIdSus,
            OR: [
                { parametro_descricao: "TOTAL" },
                { parametro_descricao: "FORA_DO_INDICADOR" },
            ],
        },
        _sum: {
            parametro_valor: true,
        },
    });
    const resultadoFormatado = getData.map((item) => ({
        municipio_id_sus: item.municipio_id_sus,
        indicador: item.indicador,
        parametro_descricao: item.parametro_descricao,
        parametro_valor_indicador: item._sum.parametro_valor,
    }));
    return Response.json(resultadoFormatado, { status: 200 });
};

export const GET = interceptors.catchErrors(handler);
