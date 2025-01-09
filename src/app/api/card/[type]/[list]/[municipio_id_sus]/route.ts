import { NextRequest } from 'next/server';
import { CardType, getDataByType, validateCardType } from '@/app/api/card/utils/cardType';
import { handleError } from '@/app/api/errorHandler';

export type RequestParams = {
  type: CardType;
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
    handleError(error as Error);
  }
}
