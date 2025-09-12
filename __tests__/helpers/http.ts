/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

//TODO: Suportar SearchParams
//TODO: Suportar Body
//TODO: Suportar Headers
export const request = (url: string, method: string): NextRequest => {
    return new NextRequest(url, {
        method,
        headers: {
            authorization: "Bearer some-token",
            "Content-Type": "application/json",
        },
    });
};
