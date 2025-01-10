import { CardType, getDataByType, validateCardType } from "@/app/api/card/utils/cardType";
import { InvalidCardTypeError } from '@/app/api/card/utils/errors';
import { NextRequest } from "next/server";

export type RequestParams = {
  type: CardType;
  list: string;
  municipio_id_sus: string;
  ine: string;
}

/**
 * Retrieves and filters card data based on specific parameters.
 *
 * @remarks
 * This asynchronous function handles GET requests for card data, validating the card type
 * and filtering results based on municipality, list, and INE (National Health Establishment Identifier).
 *
 * @param _req - The incoming Next.js request object (unused in current implementation)
 * @param params - An object containing request parameters
 * @param params.type - The type of card to retrieve
 * @param params.list - The specific list to filter
 * @param params.municipio_id_sus - The municipality SUS ID for filtering
 * @param params.ine - The INE (team identifier) for filtering
 *
 * @returns A JSON response containing filtered card data
 *
 * @throws {InvalidCardTypeError} If the provided card type is invalid
 * @throws {Error} For any other unexpected errors during data retrieval
 *
 * @beta
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: RequestParams }
) {
  try {
    const { type, list, municipio_id_sus, ine } = params;

    validateCardType(type);

    const data = getDataByType(type);

    // Será substituído por consulta no banco de dados.
    const filteredData = data.filter(card =>
      card.municipio_id_sus === municipio_id_sus
      && card.lista === list
      && card.equipe_ine === ine
    );

    return Response.json(filteredData, { status: 200 });
  } catch (error) {
    if (error instanceof InvalidCardTypeError) {
      return Response.json({ message: error.message }, { status: 400 });
    }

    return Response.json({ message: 'Erro ao consultar dados' },{ status: 500 });
  }
}
