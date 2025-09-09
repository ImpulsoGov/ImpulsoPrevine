/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

type RequestOptions = {
    body?: Record<string, unknown>;
};

//TODO: Suportar SearchParams
//TODO: Suportar Body
//TODO: Suportar Headers
export const request = (
    url: string,
    method: string,
    options?: RequestOptions
): NextRequest => {
    //   const { body, searchParams } = options;

    //   const url = new URL('http://localhost:3000/api/users');
    //   if (searchParams) {
    //     Object.entries(searchParams).forEach(([key, value]) => {
    //       url.searchParams.set(key, value);
    //     });
    //   }

    return new NextRequest(url, {
        method,
        body: options?.body ? JSON.stringify(options.body) : null,
        headers: {
            authorization: "Bearer some-token",
            "Content-Type": "application/json",
        },
    });
};
