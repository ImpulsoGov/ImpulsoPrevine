import type { Handler } from "../common/Handler";

export type Interceptor<TContextIn, TContextOut> = (
    handler: Handler<TContextIn>
) => Handler<TContextOut>;

// type First<TArray extends ReadonlyArray<unknown>> = TArray extends readonly [
//     infer F,
//     ...Array<unknown>,
// ]
//     ? F
//     : never;

// type Last<TArray extends ReadonlyArray<unknown>> = TArray extends readonly [
//     ...Array<unknown>,
//     infer L,
// ]
//     ? L
//     : never;

// type InputType<TInterceptor> =
//     TInterceptor extends Interceptor<infer In, unknown> ? In : never;

// type OutputType<TInterceptor> =
//     TInterceptor extends Interceptor<unknown, infer Out> ? Out : never;

// type CombinedInterceptor<
//     TInterceptors extends ReadonlyArray<Interceptor<unknown, unknown>>,
// > = Interceptor<
//     InputType<First<TInterceptors>>,
//     OutputType<Last<TInterceptors>>
// >;

function compose2<TI1, TI2, TIF>(
    i1: Interceptor<TI1, TI2>,
    i2: Interceptor<TI2, TIF>
): Interceptor<TI1, TIF> {
    return (handler: Handler<TI1>): Handler<TIF> => {
        return i2(i1(handler));
    };
}

export function compose3<TI1, TI2, TI3, TIF>(
    i1: Interceptor<TI1, TI2>,
    i2: Interceptor<TI2, TI3>,
    i3: Interceptor<TI3, TIF>
): Interceptor<TI1, TIF> {
    return (handler: Handler<TI1>): Handler<TIF> => {
        return i3(i2(i1(handler)));
    };
}

export function compose4<TI1, TI2, TI3, TI4, TIF>(
    i1: Interceptor<TI1, TI2>,
    i2: Interceptor<TI2, TI3>,
    i3: Interceptor<TI3, TI4>,
    i4: Interceptor<TI4, TIF>
): Interceptor<TI1, TIF> {
    return (handler: Handler<TI1>): Handler<TIF> => {
        return i4(i3(i2(i1(handler))));
    };
}

type FirstContextIn<
    TArray extends ReadonlyArray<Interceptor<unknown, unknown>>,
> = TArray extends readonly [
    Interceptor<infer ContextIn, unknown>,
    ...ReadonlyArray<unknown>,
]
    ? ContextIn
    : never;

/// Encontra o context do último interceptor, garantindo que todos os contextos de todos os interceptors no caminho encaixam.
type LastContextOut<
    TContextIn,
    TArray extends ReadonlyArray<Interceptor<unknown, unknown>>,
> = TArray extends readonly [Interceptor<TContextIn, infer ContextOut>] //Caso base: Estamos no último Interceptor
    ? ContextOut //Retorna o ContextOut do último interceptor
    : // Recursão: Se ainda resta mais de um interceptor
      TArray extends readonly [
            // A entrada do primeiro Interceptor restante é o TContextIn que veio como parametro.
            // A saída deste interceptor é TNextContext.
            Interceptor<TContextIn, infer TNextContext>,
            //O array que sobra tem que ser um array de Interceptors
            ...infer U extends ReadonlyArray<Interceptor<unknown, unknown>>,
        ]
      ? //Faz a recursão no resto do array, considerando TNextContext como a entrada do próximo Interceptor.
        LastContextOut<TNextContext, U>
      : //Se caímos aqui, algo não encaixou
        never;

type CombinedInterceptor<
    TArray extends ReadonlyArray<Interceptor<unknown, unknown>>,
> =
    // Se o primeiro contexto é never
    FirstContextIn<TArray> extends never
        ? never //algo não encaixou, não pode compilar
        : //Se o último contexto deu never
          LastContextOut<FirstContextIn<TArray>, TArray> extends never
          ? never //algo não encaixou, não pode compilar
          : Interceptor<
                FirstContextIn<TArray>,
                LastContextOut<FirstContextIn<TArray>, TArray>
            >;

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
