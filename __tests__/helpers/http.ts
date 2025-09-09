/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

type RequestOptions = {
    body?: Record<string, unknown>;
};

//TODO: Suportar SearchParams
//TODO: Suportar Headers
export const request = (
    url: string,
    method: string,
    options?: RequestOptions
): NextRequest => {
    return new NextRequest(url, {
        method,
        body: options?.body ? JSON.stringify(options.body) : null,
        headers: {
            authorization: "Bearer some-token",
            "Content-Type": "application/json",
        },
    });
};
