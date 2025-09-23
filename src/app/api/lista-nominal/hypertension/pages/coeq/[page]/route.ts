import { coeqPageRequestBody as queryParamsSchema } from "@/features/acf/shared/hypertension/schema";
import { parseBody } from "@/features/common/backend/Schema";
import { getUser } from "@/features/common/backend/User";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import * as hypertensionBackend from "@features/acf/backend/hypertension";
import type { NextRequest } from "next/server";
import { z } from "zod/v4";

const handler = async (
    req: NextRequest,
    {
        params,
    }: {
        params: Promise<{ page: string }>;
    }
): Promise<Response> => {
    const user = await getUser(req);

    const rawPage = (await params).page;
    const pageIndex = z.coerce.number().parse(rawPage);

    const parsedBody = await parseBody(req, queryParamsSchema);

    const page = await hypertensionBackend.getPageCoeq({
        municipalitySusId: user.municipalitySusId,
        teamIne: user.teamIne,
        pageIndex,
        sorting: parsedBody.sorting,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
    });

    const totalRows = await hypertensionBackend.getRowCountCoeq({
        municipalitySusId: user.municipalitySusId,
        teamIne: user.teamIne,
        searchString: parsedBody.search,
        filters: parsedBody.filters,
    });

    //TODO adicionar schema de saida
    return Response.json(
        {
            page,
            totalRows: totalRows,
        },
        { status: 200 }
    );
};

const composed = interceptors.compose(
    interceptors.allowByFlag(flags.hypertensionNewProgram),
    interceptors.allowProfiles([PROFILE_ID.COEQ]),
    interceptors.catchErrors
);

export const POST = composed(handler);
