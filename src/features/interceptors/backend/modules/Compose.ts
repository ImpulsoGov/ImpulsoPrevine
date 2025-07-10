import type { Handler, Params } from "..";

type Interceptor<TParams extends Params> = (
    handler: Handler<TParams>
) => Handler<TParams>;

export const compose = <TParams extends Params>(
    ...interceptors: Array<Interceptor<TParams>>
): Interceptor<TParams> => {
    return (handler: Handler<TParams>): Handler<TParams> => {
        return interceptors.reduce((acc, interceptor) => {
            return interceptor(acc);
        }, handler);
    };
};
