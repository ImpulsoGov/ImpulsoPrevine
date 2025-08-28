import type { Handler } from "../common/Handler";

export type Interceptor<TContext> = (
    handler: Handler<TContext>
) => Handler<TContext>;

export const compose = <TContext>(
    ...interceptors: Array<Interceptor<TContext>>
): Interceptor<TContext> => {
    return (handler: Handler<TContext>): Handler<TContext> => {
        return interceptors.reduce((acc, interceptor) => {
            return interceptor(acc);
        }, handler);
    };
};

//TODO: Fazer uma fn que compõe 2 interceptors
// Retornar uma fn que recebe o handler e aplica um interceptor por vez
