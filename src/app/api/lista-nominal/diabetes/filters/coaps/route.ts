import * as diabetesBackend from "@/features/acf/backend/diabetes/";
import * as flags from "@/features/common/shared/flags";
import * as interceptors from "@/features/interceptors/backend";
import { PROFILE_ID } from "@/types/profile";
import type { NextRequest } from "next/server";
import type {
    AppRouteHandlerRoutes,
    ParamMap,
} from "../../../../../../../.next/types/routes";

type ContextBatata = {
    user: interceptors.User;
    params: { x: string };
};

const handler = async (
    _req: NextRequest,
    { user }: ContextBatata
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

// export const GET = composed(handler);

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
// export const GET: RouteHandlerConfig = { GET: composed(handler) };

const i1 = interceptors.withUser(handler);
// const i2 = interceptors.allowByFlag(flags.diabetesNewProgram)(i1);
// const i3 = interceptors.allowProfiles([PROFILE_ID.COAPS])(i2);
// const i4 = interceptors.catchErrors(i3);

// export const GET: RouteHandlerConfig = {
//     GET: interceptors.catchErrors(
//         interceptors.allowProfiles([PROFILE_ID.COAPS])(
//             interceptors.allowByFlag(flags.diabetesNewProgram)(
//                 interceptors.withUser(handler)
//             )
//         )
//     ),
// };

// export const GET: RouteHandlerConfig = {GET: interceptors.withUser(handler)}
export const GET: RouteHandlerConfig = {
    GET: (
        req: NextRequest,
        context?: { params: Promise<ParamMap[AppRouteHandlerRoutes]> },
        nossoContext?: { a: string }
    ) => {},
};

// const a: {user: {id: string}, params: Promise<unknown>} = {user: {id: "some id"}, params: Promise.reject("") }
// const b: {}

// let a: unknown = 1;

// a = b;
// b = "2";
// console.log(a);
