import type { TokenPayload } from "@/utils/token";
import type { NextRequest } from "next/server";

export { catchErrors } from "./modules/CatchErrors";
export { accessPayload } from "./modules/AccessPayload";

export type Context = {
    params: Promise<unknown>;
};

// TODO: definir esste tipo como um union type de uma função com context e outra sem
export type Handler = (
    request: NextRequest,
    context?: Context
) => Promise<Response>;

export type NextRequestWithPayload = NextRequest & {
    payload: TokenPayload;
};

// TODO: remover esse tipo e usar o NextRequestWithPayload no Handler se quisermos manter essa abordagem
export type HandlerWithPayload = (
    request: NextRequestWithPayload,
    context?: Context
) => Promise<Response>;
