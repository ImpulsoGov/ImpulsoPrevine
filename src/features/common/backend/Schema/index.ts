import type { NextRequest } from "next/server";
import type z from "zod/v4";

export const parseBody = async <TSchema extends z.ZodType>(
    req: NextRequest,
    schema: TSchema
): Promise<z.infer<TSchema>> => {
    const body: unknown = await req.json();
    const parsedBody = schema.parse(body);
    return parsedBody;
};
