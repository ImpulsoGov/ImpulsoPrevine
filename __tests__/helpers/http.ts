/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

//TODO: Suportar SearchParams
//TODO: Suportar Body
//TODO: Suportar Headers
export const request = (url: string, method: string): NextRequest => {
    //   const { body, searchParams } = options;

    //   const url = new URL('http://localhost:3000/api/users');
    //   if (searchParams) {
    //     Object.entries(searchParams).forEach(([key, value]) => {
    //       url.searchParams.set(key, value);
    //     });
    //   }

    return new NextRequest(url, {
        method,
        // body: body ? JSON.stringify(body) : undefined,
        headers: {
            authorization: "Bearer some-token",
            "Content-Type": "application/json",
        },
    });
};
