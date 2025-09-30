import { coeqPageRequestBody as queryParamsSchema } from "@/features/acf/shared/diabetes/schema";
import { parseBody } from "@/features/common/backend/Schema";
import { getUser } from "@/features/common/backend/User";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import * as diabetesBackend from "@features/acf/backend/diabetes";
import type { NextRequest } from "next/server";

const handler = async (req: NextRequest): Promise<Response> => {
    const user = await getUser(req);
    const parsedBody = await parseBody(req, queryParamsSchema);

    const data = await diabetesBackend.getAllDataCoeq({
        municipalitySusId: user.municipalitySusId,
        teamIne: user.teamIne,
        sorting: parsedBody.sorting,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
    });

    //TODO adicionar schema de saida
    return Response.json(data, { status: 200 });
};

const composed = interceptors.compose(
    interceptors.allowByFlag(flags.diabetesNewProgram),
    interceptors.allowProfiles([PROFILE_ID.COEQ]),
    interceptors.catchErrors
);

export const POST = composed(handler);
