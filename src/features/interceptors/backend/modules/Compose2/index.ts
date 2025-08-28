import type { Handler } from "../common/Handler";

export type Interceptor<TContextIn, TContextOut> = (
    handler: Handler<TContextIn>
) => Handler<TContextOut>;

type First<TArray extends ReadonlyArray<unknown>> = TArray extends readonly [
    infer F,
    ...Array<unknown>,
]
    ? F
    : never;

type Last<TArray extends ReadonlyArray<unknown>> = TArray extends readonly [
    ...Array<unknown>,
    infer L,
]
    ? L
    : never;

type InputType<TInterceptor> =
    TInterceptor extends Interceptor<infer In, unknown> ? In : never;

type OutputType<TInterceptor> =
    TInterceptor extends Interceptor<unknown, infer Out> ? Out : never;

type CombinedInterceptor<
    TInterceptors extends ReadonlyArray<Interceptor<unknown, unknown>>,
> = Interceptor<
    InputType<First<TInterceptors>>,
    OutputType<Last<TInterceptors>>
>;

function compose2<TI1, TI2, TIF>(
    i1: Interceptor<TI1, TI2>,
    i2: Interceptor<TI2, TIF>
): Interceptor<TI1, TIF> {
    return (handler: Handler<TI1>): Handler<TIF> => {
        return i2(i1(handler));
    };
}

export function compose<
    TInterceptors extends ReadonlyArray<Interceptor<unknown, unknown>>,
>(...interceptors: TInterceptors): CombinedInterceptor<TInterceptors> {
    const iCombined = interceptors.reduce((acc, next) => {
        return compose2(acc, next);
    });
    //TODO: Tentei ao máximo evitar esse `as` aqui, mas no final do dia só não valia o esforço.
    //      O grande problema é que quando declaramos o TInterceptors, não temos como saber quais os tipos de entrada do primeiro e saída do último,
    //      e portanto o compose não consegue garantir essa tipagem.
    //      No entanto, quando chegamos nesse momento, sabemos que o tipo do Interceptor combinado é esse e podemos fazer o cast de maneira segura.
    return iCombined as CombinedInterceptor<TInterceptors>;
}
