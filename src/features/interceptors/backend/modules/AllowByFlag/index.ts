import type { NextRequest } from "next/server";
import type { Handler, HandlerWithContext } from "../common/Handler";

type FeatureFlag = () => Promise<boolean>;

export const allowByFlag = (featureFlag: FeatureFlag) => {
    return <TContext>(
        handler: Handler<TContext>
    ): HandlerWithContext<TContext> => {
        return async (
            request: NextRequest,
            context: TContext
        ): Promise<Response> => {
            if (!(await featureFlag()))
                return Response.json({}, { status: 404 });

            return handler(request, context);
        };
    };
};
