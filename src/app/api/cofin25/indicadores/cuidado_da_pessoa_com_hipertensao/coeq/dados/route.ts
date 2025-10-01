import { coeqPageRequestBody as queryParamsSchema } from "@/features/acf/shared/hypertension/schema";
import { parseBody } from "@/features/common/backend/Schema";
import { getUser } from "@/features/common/backend/User";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import * as hypertensionBackend from "@features/acf/backend/hypertension";
import type { NextRequest } from "next/server";

const handler = async (req: NextRequest): Promise<Response> => {
    const user = await getUser(req);

    const parsedBody = await parseBody(req, queryParamsSchema);

    const data = await hypertensionBackend.getAllDataCoeq({
        municipalitySusId: user.municipalitySusId,
        sorting: parsedBody.sorting,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
        teamIne: user.teamIne,
    });

    //TODO adicionar schema de saida
    return Response.json(data, { status: 200 });
};

const composed = interceptors.compose(
    interceptors.allowByFlag(flags.hypertensionNewProgram),
    interceptors.allowProfiles([PROFILE_ID.COEQ]),
    interceptors.catchErrors
);

export const POST = composed(handler);
