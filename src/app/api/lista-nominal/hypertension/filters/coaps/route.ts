import * as hypertensionBackend from "@/features/acf/backend/hypertension";
import { getUser } from "@/features/common/backend/User";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import type { NextRequest } from "next/server";

const handler = async (req: NextRequest): Promise<Response> => {
    const user = await getUser(req);

    const filters = await hypertensionBackend.filterOptionsCoaps(
        user.municipalitySusId
    );
    //TODO adicionar schema de saida
    return Response.json(
        {
            filters,
        },
        { status: 200 }
    );
};

const composed = interceptors.compose(
    interceptors.allowByFlag(flags.hypertensionNewProgram),
    interceptors.allowProfiles([PROFILE_ID.COAPS]),
    interceptors.catchErrors
);
//TODO: Criar um teste de integração para esta rota
export const GET = composed(handler);
