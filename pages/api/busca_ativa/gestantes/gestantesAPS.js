import { prisma } from '../../../../prisma/prismaClient';
import { validarTokenMiddleware } from '../../../../middlewares/validarToken';

export default async function handler(req, res) {
    try {
        if (req.method !== 'GET') return res.status(405).json({ message: 'Método não permitido' });
        // if (!origemPermitida(req)) return res.status(403).json({ message: 'Origem não permitida' });
        const { municipio_id_sus } = req.query;
        if (!municipio_id_sus) return res.status(400).json({ message: 'Parâmetro municipio_id_sus é obrigatório' });
        const tokenValido = await validarTokenMiddleware(req,res);
        if (!tokenValido?.tokenValido) return tokenValido;
        const getData = await prisma.teste_painel_gestantes_lista_nominal.findMany({
            where: {
                municipio_id_sus: municipio_id_sus,
            },
        })
        res.status(200).json(getData)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao consultar dados' , detail : error.message});
    }
}
