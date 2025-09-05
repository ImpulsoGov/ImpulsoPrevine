//TODO: Arrumar este import
//TODO: Será que tem alguma maneira de evitar este import?

import type { NextRequest } from "next/server";
import type {
    AppRouteHandlerRoutes,
    ParamMap,
} from "../../../../../../.next/types/routes";

// export type HandlerWithContext<TContext> = (
//     request: NextRequest,
//     context: TContext
// ) => Promise<Response>;

// export type HandlerWithoutContext = (request: NextRequest) => Promise<Response>;

// export type Handler<TContext> =
//     | HandlerWithContext<TContext>
//     | HandlerWithoutContext;

// type NextContext = { params: Promise<ParamMap[AppRouteHandlerRoutes]> };

// export type NextHandler = (
//     request: NextRequest,
//     context: NextContext
// ) => Promise<Response>;

// export type DecoratedHandler<TContext> = (
//     request: NextRequest,
//     nextContext: NextContext,
//     context: TContext
// ) => Promise<Response>;

// export type Intercetor<TContext> = (
//     h: DecoratedHandler<TContext>
// ) => NextHandler;

// const bind = <TContext1, TContext2>(
//     i1: Intercetor<TContext1>,
//     i2: Intercetor<TContext2>
// ): Intercetor<TContext1 & TContext2> => {
//     const context1 = i1.arguments[2] as TContext1;
//     const context2 = i2.arguments[2] as TContext2;
//     return (handler: DecoratedHandler<TContext1 & TContext2>) => {
//         return (request: NextRequest, nextContext: NextContext) => {
//             return handler(request, nextContext, { ...context1, ...context2 });
//         };
//     };
// };

// const handler = async (
//     _req: NextRequest,
//     nextContext: NextContext,
//     locals: {}
// ): Promise<Response> => {
//     // console.log(locals.user);
//     return Promise.reject("");
// };

// const withUser = <TContext extends object>(
//     handler: DecoratedHandler<TContext & {user: string}>
// ): DecoratedHandler<TContext> => {
//     return async (
//         request: NextRequest,
//         nextContext: NextContext,
//         context: TContext
//     ): Promise<Response> => {
//         const user = { user: "user" };
//         return handler(request, nextContext, { ...context, ...user });
//     };
// };

// const withCatch = <TContext extends object>(
//     handler: DecoratedHandler<TContext>
// ): DecoratedHandler<TContext> => {
//     return (
//         request: NextRequest,
//         nextContext: NextContext,
//         locals: TContext
//     ) => {
//         try {
//             return handler(request, nextContext, locals);
//         } catch {
//             console.log("deu_ruim");
//             return Promise.reject("");
//         }
//     };
// };

// const withBatata = <TContext extends object>(
//     handler: DecoratedHandler<TContext & { batata: string; }>
// ): DecoratedHandler<TContext> => {
//     return async (
//         request: NextRequest,
//         nextContext: NextContext,
//         locals: TContext
//     ): Promise<Response> => {
//         return handler(request, nextContext, { ...locals, batata: "batata" });
//     };
// };

// function collapse<TContext>(i1: DecoratedHandler<TContext>): NextHandler {
//     const locals = i1.arguments[2] as TContext;
//     return (req: NextRequest, context: NextContext) => {
//         return i1(req, context, locals);
//     }
// }

// type RouteHandlerConfig<
//     Route extends AppRouteHandlerRoutes = AppRouteHandlerRoutes,
// > = {
//     GET?: (
//         request: NextRequest,
//         context: { params: Promise<ParamMap[Route]> }
//     ) => Promise<Response | void> | Response | void;
//     POST?: (
//         request: NextRequest,
//         context: { params: Promise<ParamMap[Route]> }
//     ) => Promise<Response | void> | Response | void;
//     PUT?: (
//         request: NextRequest,
//         context: { params: Promise<ParamMap[Route]> }
//     ) => Promise<Response | void> | Response | void;
//     PATCH?: (
//         request: NextRequest,
//         context: { params: Promise<ParamMap[Route]> }
//     ) => Promise<Response | void> | Response | void;
//     DELETE?: (
//         request: NextRequest,
//         context: { params: Promise<ParamMap[Route]> }
//     ) => Promise<Response | void> | Response | void;
//     HEAD?: (
//         request: NextRequest,
//         context: { params: Promise<ParamMap[Route]> }
//     ) => Promise<Response | void> | Response | void;
//     OPTIONS?: (
//         request: NextRequest,
//         context: { params: Promise<ParamMap[Route]> }
//     ) => Promise<Response | void> | Response | void;
// };

// const x = withUser(withBatata(handler));
// const g: (x: {a: number, b: number}) => number = (x: {a: number}) => 2;
// const GET: RouteHandlerConfig = { GET: collapse(withCatch(withUser(handler))) };
// const f: DecoratedHandler<{ user: string; }> = handler;
// const f2: (request: NextRequest, nextContext: NextContext, locals: {user: string}) => Promise<Response> = handler;
// type B = BatataContext | ({ user: string; batata: string } & BatataContext);
// const c: B = { user: "a", batata: "b" };

// const u: UserContext = { user: "s" };
// const invalid: UserContext & BatataContext = { user: "s" };
// const v1: UserContext & BatataContext = { user: "s", batata: "b" };
// const v2: UserContext | (BatataContext & UserContext) = u;

//TODO: Remover
// const h = (req: NextRequest, context: {user: string, params: string}) => Promise.reject("") as Promise<Response>;
// const h2: NewHandler<{user: string, params: string}> = h;
// const hSemContext: NewHandler = (req: NextRequest) => Promise.reject("") as Promise<Response>;

// const u: {user: string, params: string} = {user: "user", params: "params"};
// const u2: {user: string } = u;

// type F = (a: string, b: string) => string;
// const f: F = (a: string, b: string) => a;
// const f2: F = (a: string) => a;
// // // const f3: F = (a: string, b: number) => a;
// const f4: F = (a: string, b: string, c?: string) => a;

// type G = {GET: F};
// const g: G = {GET: f};
// const g2: G = {GET: f2};
// const g4: G = {GET: f4};

//O que queremos?
//- Ser capazes de definir interceptors que injetam dados para o handler usar.
//- Ser capazes de definir interceptors que não injetam nada no handler
//- Se o handler ignorar os parametros injetados, tudo bem
//- Se o handler definir parametros que não foram injetados, erro de compilação
//- Se o handler definir parametros injetados com tipos que não encaixam, erro de compilação
//- Eventualmente, traduzir a fn gerada para um handler do next (sem os parametros extras)

type NextContext = { params: Promise<ParamMap[AppRouteHandlerRoutes]> };
type Handler<TLocals extends object> = (
    req: NextRequest,
    context: NextContext,
    locals: TLocals
) => Promise<Response>;

const handler = (
    req: NextRequest,
    context: NextContext,
    locals: { a: number; b: number }
): Promise<Response> => Promise.reject("");

//Esse é o comportamento que queremos:
// Um handler que recebe locals a mais do que o definido dá erro de compilação.

// const hOk1: Handler<{a: number, b: number}> = handler;
// const hOk2: Handler<{a: number, b: number, c: number }> = handler;
// const hError1: Handler<{a: number}> = handler;

const withA = <TLocals extends object>(
    h: Handler<TLocals & { a: number }>
): Handler<TLocals> => {
    return (
        req: NextRequest,
        c: NextContext,
        locals: TLocals
    ): Promise<Response> => {
        return h(req, c, { ...locals, ...{ a: 2 } });
    };
};

//hError2 não deveria ser válido, pq handler espera locals = {a: number, b: number}, mas só injetamos {a: number}.
//Forçando os tipos:
//const hError2: Handler<{a: number}> = withA(handler)

//Mas se deixarmos o typescript inferir o tipo do handler, a coisa desmorona:
const hShouldBeError = withA(handler);
//Ele infere TLocals a partir do handler, então a expressão ficou válida,
//mesmo que nada tenha injetado {b: number} nos locals.
