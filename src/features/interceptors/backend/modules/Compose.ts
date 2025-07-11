import type { Handler } from "./common/Handler";

type Interceptor<TContext> = (handler: Handler<TContext>) => Handler<TContext>;

export const compose = <TContext>(
    ...interceptors: Array<Interceptor<TContext>>
): Interceptor<TContext> => {
    return (handler: Handler<TContext>): Handler<TContext> => {
        return interceptors.reduce((acc, interceptor) => {
            return interceptor(acc);
        }, handler);
    };
};
