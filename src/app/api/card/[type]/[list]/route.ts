import type { NextRequest } from "next/server";

import { getDataByType, validateCardType } from "@/app/api/card/utils/cardType";
import { InvalidCardTypeError } from "@/app/api/card/utils/errors";
import {
    AuthenticationError,
    decodeToken,
    getEncodedSecret,
    getToken,
} from "@/utils/token";
import type { JWTToken } from "@/utils/token";
import { captureException } from "@sentry/nextjs";

const adapterList = {
    HIPERTENSÃO: "hipertensao",
    DIABETES: "diabetes",
};

// TODO rever nomenclatura do endpoint para que a API seja orientada à informação e não à interface
// vide: https://github.com/ImpulsoGov/ImpulsoPrevine/pull/289#issuecomment-2593257565
export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params: Promise<{
            list: string;
            type: string;
        }>;
    }
) {
    try {
        const { type, list } = (await params) as {
            type: string;
            list: "HIPERTENSÃO" | "DIABETES";
        };
        const token = getToken(req.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;
        const municipioIdSus = payload?.municipio as string;
        validateCardType(type);
        const data = getDataByType(type);
        // Será substituído por consulta no banco de dados.
        // Quando conectar com o banco de dados, agrupar os dados por descrição
        // para somar os valores de todas equipe do município por descrição (card).
        let filteredData = data.filter(
            (card) =>
                card.municipio_id_sus === municipioIdSus &&
                card.lista === adapterList[list]
        );
        if (payload?.perfis?.includes(9) && payload?.equipe) {
            // será substituido por consulta no banco de dados
            filteredData = filteredData.filter(
                (card) => card.ine === payload.equipe
            );
        }
        return Response.json(filteredData, { status: 200 });
    } catch (error) {
        if (error instanceof InvalidCardTypeError) {
            return Response.json({ message: error.message }, { status: 400 });
        }

        if (error instanceof AuthenticationError) {
            return Response.json({ message: error.message }, { status: 401 });
        }

        captureException(error);
        return Response.json(
            { message: "Erro ao consultar dados" },
            { status: 500 }
        );
    }
}
