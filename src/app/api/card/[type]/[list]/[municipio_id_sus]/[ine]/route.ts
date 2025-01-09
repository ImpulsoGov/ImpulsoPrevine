import { CardType, getDataByType, validateCardType } from "@/app/api/card/utils/cardType";
import { InvalidCardTypeError } from '@/app/api/card/utils/errors';
import { NextRequest } from "next/server";

export type RequestParams = {
  type: CardType;
  list: string;
  municipio_id_sus: string;
  ine: string;
}

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
