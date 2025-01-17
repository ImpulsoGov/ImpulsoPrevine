import { NextRequest } from 'next/server';
import { getDataByType, validateCardType } from '@/app/api/card/utils/cardType';
import { InvalidCardTypeError } from '@/app/api/card/utils/errors';
import { captureException } from '@sentry/nextjs';

// TODO rever nomenclatura do endpoint para que a API seja orientada à informação e não à interface
// vide: https://github.com/ImpulsoGov/ImpulsoPrevine/pull/289#issuecomment-2593257565

export type RequestParams = {
  type: string;
  list: string;
  municipio_id_sus: string;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: RequestParams }
) {
  try {
    const { type, list, municipio_id_sus } = params;

    validateCardType(type);

    const data = getDataByType(type);

    // Será substituído por consulta no banco de dados.
    // Quando conectar com o banco de dados, agrupar os dados por descrição
    // para somar os valores de todas equipe do município por descrição (card).
    const filteredData = data.filter(card =>
      card.municipio_id_sus === municipio_id_sus
      && card.lista === list
    );

    return Response.json(filteredData, { status: 200 });
  } catch (error) {
    if (error instanceof InvalidCardTypeError) {
      return Response.json({ message: error.message }, { status: 400 });
    }

    captureException(error);
    return Response.json({ message: 'Erro ao consultar dados' },{ status: 500 });
  }
}
