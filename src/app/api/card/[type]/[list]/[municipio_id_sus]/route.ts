import { NextRequest } from 'next/server';
import { CardType, getDataByType, validateCardType } from '@/app/api/card/utils/cardType';
import { InvalidCardTypeError } from '@/app/api/card/utils/errors';

export type RequestParams = {
  type: CardType;
  list: string;
  municipio_id_sus: string;
}

/**
 * Handles GET requests for retrieving card data based on specific parameters.
 *
 * @remarks
 * This route function filters card data by card type, municipality ID, and list.
 * Currently uses in-memory data filtering, with plans to replace with database query.
 *
 * @param _req - The incoming Next.js request (unused in current implementation)
 * @param params - Request parameters containing card type, list, and municipality ID
 * @returns A JSON response with filtered card data or an error message
 *
 * @throws {InvalidCardTypeError} If the provided card type is invalid
 * @throws {Error} For any other data query errors
 *
 * @beta
 */
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

    return Response.json({ message: 'Erro ao consultar dados' },{ status: 500 });
  }
}
