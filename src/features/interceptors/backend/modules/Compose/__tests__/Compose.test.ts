import { compose } from "..";
import type { Handler } from "../../common/Handler";
import type { Interceptor } from "..";
import type { NextRequest } from "next/server";

describe("compose", () => {
    const baseHandler: Handler<{ called: Array<string> }> = async (
        _req: NextRequest,
        ctx: { called: Array<string> }
    ) => {
        ctx.called.push("base");
        return new Promise((resolve) => {
            resolve({ message: "base" } as unknown as Response);
        });
    };

    const createInterceptor = (
        label: string
    ): Interceptor<{ called: Array<string> }> => {
        return (next: Handler<{ called: Array<string> }>) => {
            return async (req: NextRequest, ctx: { called: Array<string> }) => {
                ctx.called.push(label);
                return next(req, ctx);
            };
        };
    };

    it("retorna o handler original se nenhum interceptor for passado", async () => {
        const req = {} as NextRequest;
        const composed = compose<{ called: Array<string> }>()(baseHandler);
        const ctx = { called: [] };
        const res = await composed(req, ctx);

        expect(ctx.called).toEqual(["base"]);
        expect(res).toEqual({ message: "base" });
    });

    it("aplica um único interceptor corretamente", async () => {
        const req = {} as NextRequest;
        const interceptor = createInterceptor("auth");
        const composed = compose(interceptor)(baseHandler);

        const ctx = { called: [] };
        const res = await composed(req, ctx);

        expect(ctx.called).toEqual(["auth", "base"]);
        expect(res).toEqual({ message: "base" });
    });

    it("aplica múltiplos interceptors na ordem correta", async () => {
        const req = {} as NextRequest;
        const composed = compose(
            createInterceptor("first"),
            createInterceptor("second"),
            createInterceptor("third")
        )(baseHandler);

        const ctx = { called: [] };
        const res = await composed(req, ctx);

        expect(ctx.called).toEqual(["third", "second", "first", "base"]);
        expect(res).toEqual({ message: "base" });
    });

    it("mantém o retorno final do handler", async () => {
        const req = {} as NextRequest;
        const customHandler: Handler<{ called: Array<string> }> = async (
            _req: NextRequest,
            _ctx
        ) => {
            return new Promise((resolve) => {
                resolve({
                    message: "final output",
                    status: 201,
                } as unknown as Response);
            });
        };

        const composed = compose(
            createInterceptor("a"),
            createInterceptor("b")
        )(customHandler);

        const result = await composed(req, { called: [] });

        expect(result).toEqual({ message: "final output", status: 201 });
    });
});
