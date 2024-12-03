import { prisma } from '@prisma/prismaClient';
import { type NextRequest } from 'next/server'

export async function GET(req : NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const municipio_id_sus = searchParams.get('municipio_id_sus')
        const equipe_ine = searchParams.get('equipe')
        if (!municipio_id_sus) return Response.json({ message: 'Parâmetro municipio_id_sus é obrigatório' },{ status: 400 });
        if (!equipe_ine) return Response.json({ message: 'Parâmetro equipe é obrigatório' },{ status: 400 });
        const getData = await prisma.dados_agregados_area_logada.groupBy({
            by: ['municipio_id_sus', 'indicador', 'parametro_descricao','equipe_ine'],
            where: {
                municipio_id_sus: municipio_id_sus,
                equipe_ine: equipe_ine,
                OR: [
                    { parametro_descricao: 'TOTAL' },
                    { parametro_descricao: 'FORA_DO_INDICADOR' }
                ]
            },
            _sum: {
              parametro_valor: true
            }
          });
          const resultadoFormatado = getData.map((item) => ({
            municipio_id_sus: item.municipio_id_sus,
            equipe_ine: item.equipe_ine,
            indicador: item.indicador,
            parametro_descricao: item.parametro_descricao,
            parametro_valor_indicador: item._sum.parametro_valor,
          }));
        return Response.json(resultadoFormatado,{ status: 200 });      
    } catch (error) {
        return Response.json({ message: 'Erro ao consultar dados' , detail : (error as Error).message },{ status: 500 });
    }
}