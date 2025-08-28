import * as diabetesBackend from "@/features/acf/backend/diabetes/";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import type { NextRequest } from "next/server";
import type {
    AppRouteHandlerRoutes,
    ParamMap,
} from "../../../../../../../.next/types/routes";

type Context = { user: interceptors.User };

const handler = async (
    _req: NextRequest,
    { user }: Context
): Promise<Response> => {
    const municipalitySusId = user.municipalitySusId;

    const filters = await diabetesBackend.filterOptionsCoaps(municipalitySusId);
    //TODO adicionar schema de saida
    return Response.json(
        {
            filters,
        },
        { status: 200 }
    );
};

const composed = interceptors.compose4(
    interceptors.withUser,
    interceptors.allowByFlag(flags.diabetesNewProgram),
    interceptors.allowProfiles([PROFILE_ID.COAPS]),
    interceptors.catchErrors
);

type RouteHandlerConfig<
    Route extends AppRouteHandlerRoutes = AppRouteHandlerRoutes,
> = {
    GET?: (
        request: NextRequest,
        context: { params: Promise<ParamMap[Route]> }
    ) => Promise<Response | void> | Response | void;
    POST?: (
        request: NextRequest,
        context: { params: Promise<ParamMap[Route]> }
    ) => Promise<Response | void> | Response | void;
    PUT?: (
        request: NextRequest,
        context: { params: Promise<ParamMap[Route]> }
    ) => Promise<Response | void> | Response | void;
    PATCH?: (
        request: NextRequest,
        context: { params: Promise<ParamMap[Route]> }
    ) => Promise<Response | void> | Response | void;
    DELETE?: (
        request: NextRequest,
        context: { params: Promise<ParamMap[Route]> }
    ) => Promise<Response | void> | Response | void;
    HEAD?: (
        request: NextRequest,
        context: { params: Promise<ParamMap[Route]> }
    ) => Promise<Response | void> | Response | void;
    OPTIONS?: (
        request: NextRequest,
        context: { params: Promise<ParamMap[Route]> }
    ) => Promise<Response | void> | Response | void;
};

// TODO: Criar um teste de integração para esta rota
export const GET: RouteHandlerConfig = { GET: composed(handler) };

// export const GET: RouteHandlerConfig = {
//     GET: interceptors.catchErrors(
//         interceptors.allowProfiles([PROFILE_ID.COAPS])(
//             interceptors.allowByFlag(flags.diabetesNewProgram)(
//                 interceptors.withUser(handler)
//             )
//         )
//     ),
// };
