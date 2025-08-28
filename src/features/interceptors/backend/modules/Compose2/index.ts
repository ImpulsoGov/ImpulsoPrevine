import type { Handler } from "../common/Handler";

//TODO: Interceptor tem que receber TIn e TOut
export type Interceptor<TContextIn, TContextOut> = (
    handler: Handler<TContextIn>
) => Handler<TContextOut>;

// export const compose = (
//     ...interceptors: Array<Interceptor<?>>
// ): Interceptor<?, ?> => {
//     return (handler: Handler<TContext>): Handler<TContext> => {
//         return interceptors.reduce((acc, interceptor) => {
//             return interceptor(acc);
//         }, handler);
//     };
// };

function compose<TI1, TI2, TIF>(
    i1: Interceptor<TI1, TI2>,
    i2: Interceptor<TI2, TIF>
): Interceptor<TI1, TIF> {
    return (handler: Handler<TI1>): Handler<TIF> => {
        return i2(i1(handler));
    };
}

function compose3<TI1, TI2, TI3, TIF>(
    i1: Interceptor<TI1, TI2>,
    i2: Interceptor<TI2, TI3>,
    i3: Interceptor<TI3, TIF>
): Interceptor<TI1, TIF> {
    return (handler: Handler<TI1>): Handler<TIF> => {
        return compose(compose(i1, i2), i3)(handler);
    };
}

export function compose4<TI1, TI2, TI3, TI4, TIF>(
    i1: Interceptor<TI1, TI2>,
    i2: Interceptor<TI2, TI3>,
    i3: Interceptor<TI3, TI4>,
    i4: Interceptor<TI4, TIF>
): Interceptor<TI1, TIF> {
    return (handler: Handler<TI1>): Handler<TIF> => {
        return compose(compose(compose(i1, i2), i3), i4)(handler);
    };
}

// Alternative approach using a simpler type that's easier to understand
type Head<T extends ReadonlyArray<any>> = T extends readonly [infer H, ...any[]]
    ? H
    : never;
type Last<T extends ReadonlyArray<any>> = T extends readonly [...any[], infer L]
    ? L
    : never;

type GetInputType<T> = T extends Interceptor<infer In, any> ? In : never;
type GetOutputType<T> = T extends Interceptor<any, infer Out> ? Out : never;

type SimpleCompose<T extends ReadonlyArray<Interceptor<any, any>>> =
    Interceptor<GetInputType<Head<T>>, GetOutputType<Last<T>>>;

export function composeN<
    TInterceptors extends ReadonlyArray<Interceptor<any, any>>,
>(...interceptors: TInterceptors): SimpleCompose<TInterceptors> {
    return (
        handler: Handler<GetInputType<Head<TInterceptors>>>
    ): Handler<GetOutputType<Last<TInterceptors>>> => {
        return interceptors.reduce((acc, interceptor) => {
            return interceptor(acc);
        }, handler);
    };
}
